const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://intelligentit.io';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-screenshots');

// Device profiles
const devices = {
  'Galaxy-S23': { width: 360, height: 780, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
  'iPhone-14': { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  'iPad-Air': { width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  'Desktop-1080p': { width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false, userAgent: '' },
};

// Pages to test
const pages = [
  { name: 'homepage', path: '/' },
  { name: 'helpdesk', path: '/pages/helpdesk.html' },
  { name: 'pricing', path: '/pages/pricing.html' },
  { name: 'guides', path: '/pages/guides.html' },
  { name: 'case-studies', path: '/pages/case-studies.html' },
  { name: 'leadership', path: '/pages/leadership.html' },
  { name: 'careers', path: '/pages/careers.html' },
  { name: 'locations', path: '/pages/locations.html' },
  { name: 'blog', path: '/pages/blog.html' },
];

const issues = [];

async function testPage(browser, pageName, pagePath, deviceName, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  if (viewport.userAgent) await page.setUserAgent(viewport.userAgent);

  const url = SITE_URL + pagePath;
  console.log(`  Testing ${pageName} on ${deviceName}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    // Screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, `${pageName}-${deviceName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Test 1: Check for horizontal overflow (content wider than viewport)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    if (hasHorizontalScroll) {
      issues.push({ page: pageName, device: deviceName, severity: 'HIGH', issue: 'Horizontal scroll detected — content overflows viewport' });
    }

    // Test 2: Check header is visible and not overlapping content
    const headerCheck = await page.evaluate(() => {
      const header = document.querySelector('.header, #site-header, #header');
      if (!header) return { exists: false };
      const rect = header.getBoundingClientRect();
      return { exists: true, height: rect.height, top: rect.top, visible: rect.height > 0 };
    });
    if (!headerCheck.exists || !headerCheck.visible) {
      issues.push({ page: pageName, device: deviceName, severity: 'HIGH', issue: 'Header not visible or missing' });
    }

    // Test 3: Check hamburger menu is visible on mobile
    if (viewport.isMobile) {
      const hamburgerVisible = await page.evaluate(() => {
        const hamburger = document.querySelector('.header__hamburger, #hamburger');
        if (!hamburger) return false;
        const style = window.getComputedStyle(hamburger);
        return style.display !== 'none';
      });
      if (!hamburgerVisible) {
        issues.push({ page: pageName, device: deviceName, severity: 'HIGH', issue: 'Hamburger menu not visible on mobile' });
      }
    }

    // Test 4: Check hero content is not hidden behind header
    const heroCheck = await page.evaluate(() => {
      const hero = document.querySelector('.page-hero, .hero');
      if (!hero) return null;
      const h1 = hero.querySelector('h1');
      if (!h1) return null;
      const rect = h1.getBoundingClientRect();
      return { top: rect.top, visible: rect.top >= 0 };
    });
    if (heroCheck && !heroCheck.visible) {
      issues.push({ page: pageName, device: deviceName, severity: 'HIGH', issue: `Hero H1 is off-screen or behind header (top: ${heroCheck.top}px)` });
    }

    // Test 5: Check content is centered / not cut off
    const contentCheck = await page.evaluate(() => {
      const container = document.querySelector('.container');
      if (!container) return null;
      const rect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      return {
        left: rect.left,
        right: rect.right,
        viewportWidth,
        leftCutoff: rect.left < 0,
        rightCutoff: rect.right > viewportWidth + 5
      };
    });
    if (contentCheck && (contentCheck.leftCutoff || contentCheck.rightCutoff)) {
      issues.push({ page: pageName, device: deviceName, severity: 'HIGH', issue: `Content not centered — left: ${contentCheck.left}px, right: ${contentCheck.right}px, viewport: ${contentCheck.viewportWidth}px` });
    }

    // Test 6: Check all buttons have minimum touch target size
    const smallButtons = await page.evaluate(() => {
      const btns = document.querySelectorAll('.btn, button, a.btn');
      const small = [];
      btns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.height > 0 && rect.height < 44) {
          small.push({ text: btn.textContent.trim().substring(0, 30), height: Math.round(rect.height) });
        }
      });
      return small;
    });
    if (smallButtons.length > 0) {
      issues.push({ page: pageName, device: deviceName, severity: 'MEDIUM', issue: `${smallButtons.length} button(s) below 44px touch target: ${smallButtons.map(b => `"${b.text}" (${b.height}px)`).join(', ')}` });
    }

    // Test 7: Check text is readable (not too small)
    const smallText = await page.evaluate(() => {
      const textEls = document.querySelectorAll('p, li, span, a');
      let tooSmall = 0;
      textEls.forEach(el => {
        const style = window.getComputedStyle(el);
        const size = parseFloat(style.fontSize);
        if (size > 0 && size < 12 && el.textContent.trim().length > 0) tooSmall++;
      });
      return tooSmall;
    });
    if (smallText > 0) {
      issues.push({ page: pageName, device: deviceName, severity: 'MEDIUM', issue: `${smallText} text element(s) below 12px font size` });
    }

    // Test 8: Check images aren't overflowing
    const overflowImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      let overflow = 0;
      imgs.forEach(img => {
        if (img.naturalWidth > 0 && img.getBoundingClientRect().width > window.innerWidth) overflow++;
      });
      return overflow;
    });
    if (overflowImages > 0) {
      issues.push({ page: pageName, device: deviceName, severity: 'HIGH', issue: `${overflowImages} image(s) overflowing viewport` });
    }

  } catch (err) {
    issues.push({ page: pageName, device: deviceName, severity: 'ERROR', issue: `Page load failed: ${err.message}` });
  }

  await page.close();
}

async function run() {
  // Create screenshot directory
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const [deviceName, viewport] of Object.entries(devices)) {
    console.log(`\n=== ${deviceName} (${viewport.width}x${viewport.height}) ===`);
    for (const pg of pages) {
      await testPage(browser, pg.name, pg.path, deviceName, viewport);
    }
  }

  await browser.close();

  // Report
  console.log('\n\n========================================');
  console.log('MOBILE UX TEST REPORT');
  console.log('========================================\n');

  if (issues.length === 0) {
    console.log('ALL TESTS PASSED! No issues found.');
  } else {
    const high = issues.filter(i => i.severity === 'HIGH');
    const medium = issues.filter(i => i.severity === 'MEDIUM');
    const errors = issues.filter(i => i.severity === 'ERROR');

    console.log(`Total issues: ${issues.length} (${high.length} HIGH, ${medium.length} MEDIUM, ${errors.length} ERROR)\n`);

    for (const issue of issues) {
      console.log(`[${issue.severity}] ${issue.device} / ${issue.page}: ${issue.issue}`);
    }
  }

  console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}`);

  // Save report
  const reportPath = path.join(SCREENSHOT_DIR, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), issues }, null, 2));
  console.log(`Report saved to: ${reportPath}`);
}

run().catch(console.error);
