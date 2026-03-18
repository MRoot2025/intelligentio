const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BOOKING_URL = 'https://outlook.office.com/book/MeetwithTom@intelligentitnyc.com/';
const CONTACT_PARAM = 'contact=true';

function load(filePath) {
  return cheerio.load(fs.readFileSync(filePath, 'utf8'));
}

// ─── Homepage Tests ───

describe('Homepage (index.html)', () => {
  let $;

  beforeAll(() => {
    $ = load(path.join(__dirname, '..', 'index.html'));
  });

  test('all "Book a Call" links point to Outlook booking URL', () => {
    const links = $('a').filter((_, el) => $(el).text().trim() === 'Book a Call');
    expect(links.length).toBeGreaterThan(0);
    links.each((_, el) => {
      expect($(el).attr('href')).toBe(BOOKING_URL);
      expect($(el).attr('target')).toBe('_blank');
      expect($(el).attr('rel')).toContain('noopener');
    });
  });

  test('header "Contact Us" link includes ?contact=true param', () => {
    const contactLink = $('.header__actions a').filter((_, el) =>
      $(el).text().trim() === 'Contact Us'
    );
    expect(contactLink.length).toBe(1);
    expect(contactLink.attr('href')).toContain(CONTACT_PARAM);
  });

  test('"Book Your Strategy Call" link points to booking URL', () => {
    const link = $('a').filter((_, el) =>
      $(el).text().trim().includes('Book Your Strategy Call')
    );
    expect(link.length).toBe(1);
    expect(link.attr('href')).toBe(BOOKING_URL);
    expect(link.attr('target')).toBe('_blank');
  });

  test('no "Book a Call" links point to just locations.html', () => {
    const links = $('a').filter((_, el) => $(el).text().trim() === 'Book a Call');
    links.each((_, el) => {
      expect($(el).attr('href')).not.toMatch(/^pages\/locations\.html$/);
    });
  });

  test('page has a title', () => {
    expect($('title').length).toBe(1);
    expect($('title').text().length).toBeGreaterThan(0);
  });

  test('navigation contains dropdown sections', () => {
    expect($('.dropdown').length).toBeGreaterThanOrEqual(4);
  });

  test('all links have non-empty href', () => {
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      expect(href).toBeTruthy();
    });
  });

  test('page loads required CSS', () => {
    expect($('link[rel="stylesheet"]').length).toBeGreaterThan(0);
  });

  test('page loads script.js', () => {
    const scripts = $('script[src]').toArray();
    const hasScript = scripts.some(s => $(s).attr('src').includes('script.js'));
    expect(hasScript).toBe(true);
  });
});

// ─── Locations Page Tests ───

describe('Locations page (pages/locations.html)', () => {
  let $, html;

  beforeAll(() => {
    const filePath = path.join(__dirname, '..', 'pages', 'locations.html');
    html = fs.readFileSync(filePath, 'utf8');
    $ = cheerio.load(html);
  });

  test('"Book a Call" links point to Outlook booking URL', () => {
    const links = $('a').filter((_, el) => $(el).text().trim().includes('Book a Call'));
    expect(links.length).toBeGreaterThanOrEqual(2);
    links.each((_, el) => {
      expect($(el).attr('href')).toBe(BOOKING_URL);
      expect($(el).attr('target')).toBe('_blank');
    });
  });

  test('inquiry modal exists with required elements', () => {
    expect($('#inquiryModal').length).toBe(1);
    expect($('#inquiryForm').length).toBe(1);
    expect($('.modal__close').length).toBeGreaterThanOrEqual(1);
  });

  test('inquiry form has required fields', () => {
    const form = $('#inquiryForm');
    expect(form.find('[required]').length).toBeGreaterThanOrEqual(4);
    expect(form.find('input[name="Name"]').length).toBe(1);
    expect(form.find('input[name="Email"]').length).toBe(1);
  });

  test('inquiry form posts to FormSubmit.co', () => {
    expect($('#inquiryForm').attr('action')).toContain('formsubmit.co');
  });

  test('inquiry form has honeypot spam protection', () => {
    expect($('input[name="_honey"]').length).toBe(1);
  });

  test('success state has booking link', () => {
    const success = $('#formSuccess');
    expect(success.length).toBe(1);
    expect(success.find(`a[href="${BOOKING_URL}"]`).length).toBe(1);
  });

  test('page JS handles ?contact=true to auto-open modal', () => {
    expect(html).toContain('contact=true');
    expect(html).toContain('openInquiryForm()');
  });

  test('page JS handles ?submitted=true for success state', () => {
    expect(html).toContain('submitted=true');
    expect(html).toContain('formSuccess');
  });

  test('"Contact Us Today" button calls openInquiryForm()', () => {
    const buttons = $('button').filter((_, el) =>
      $(el).text().trim().includes('Contact Us')
    );
    expect(buttons.length).toBeGreaterThan(0);
    buttons.each((_, el) => {
      expect($(el).attr('onclick')).toContain('openInquiryForm');
    });
  });

  test('modal has close mechanisms (Escape key + overlay click)', () => {
    expect(html).toContain('closeInquiryForm');
    expect(html).toContain("e.key === 'Escape'");
    expect(html).toContain('e.target === this');
  });
});

// ─── Template.js Tests ───

describe('Template.js (subpage header injection)', () => {
  let src;

  beforeAll(() => {
    src = fs.readFileSync(path.join(__dirname, '..', 'pages', 'template.js'), 'utf8');
  });

  test('"Book a Call" link points to Outlook booking URL', () => {
    const match = src.match(/href="([^"]+)"[^>]*>Book a Call</);
    expect(match).not.toBeNull();
    expect(match[1]).toBe(BOOKING_URL);
  });

  test('"Contact Us" link includes ?contact=true', () => {
    const match = src.match(/href="([^"]+)"[^>]*>Contact Us</);
    expect(match).not.toBeNull();
    expect(match[1]).toContain(CONTACT_PARAM);
  });

  test('injects header into #site-header', () => {
    expect(src).toContain("getElementById('site-header')");
  });

  test('injects footer into #site-footer', () => {
    expect(src).toContain("getElementById('site-footer')");
  });

  test('includes navigation dropdowns', () => {
    expect(src).toContain('dropdown');
    expect(src).toContain('Services');
    expect(src).toContain('Industries');
  });
});

// ─── Subpage Link Validation ───

describe('Generated subpages', () => {
  const subpageDir = path.join(__dirname, '..', 'pages');
  const samplePages = [
    'helpdesk.html',
    'managed-soc.html',
    'ai-workflow-automation.html',
    'finance-accounting.html',
    'about.html',
    'blog.html',
  ];

  test.each(samplePages)('%s has valid HTML structure', (page) => {
    const $ = load(path.join(subpageDir, page));
    expect($('title').length).toBe(1);
    expect($('#site-header').length).toBe(1);
    expect($('#site-footer').length).toBe(1);
    expect($('.page-hero').length).toBe(1);
  });

  test.each(samplePages)('%s CTA links to locations.html?contact=true', (page) => {
    const $ = load(path.join(subpageDir, page));
    const ctaLink = $('a').filter((_, el) => $(el).text().trim().includes('Contact Us'));
    if (ctaLink.length) {
      expect(ctaLink.attr('href')).toContain(CONTACT_PARAM);
    }
  });

  test.each(samplePages)('%s loads template.js', (page) => {
    const $ = load(path.join(subpageDir, page));
    const scripts = $('script[src]').toArray();
    expect(scripts.some(s => $(s).attr('src').includes('template.js'))).toBe(true);
  });

  test.each(samplePages)('%s "Get Started" links to locations.html', (page) => {
    const $ = load(path.join(subpageDir, page));
    const link = $('a').filter((_, el) => $(el).text().trim() === 'Get Started');
    if (link.length) {
      expect(link.attr('href')).toContain('locations.html');
    }
  });
});

// ─── Cross-site Consistency ───

describe('Cross-site consistency', () => {
  const pagesDir = path.join(__dirname, '..', 'pages');
  const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

  // Standalone splash pages that don't use the standard layout
  const standaloneSplashPages = ['form-success.html'];

  test('all subpages are valid HTML5', () => {
    htmlFiles.forEach(file => {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
    });
  });

  test('all subpages reference required CSS files', () => {
    htmlFiles.filter(f => !standaloneSplashPages.includes(f)).forEach(file => {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
      expect(content).toContain('styles.css');
      expect(content).toContain('pages.css');
    });
  });

  test('no "Book a Call" links in index.html point to just locations.html', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const matches = [...content.matchAll(/href="([^"]*)"[^>]*>\s*Book a Call\s*</g)];
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach(m => {
      expect(m[1]).toBe(BOOKING_URL);
    });
  });

  test('no "Book a Call" links in template.js point to just locations.html', () => {
    const content = fs.readFileSync(path.join(pagesDir, 'template.js'), 'utf8');
    const matches = [...content.matchAll(/href="([^"]*)"[^>]*>Book a Call</g)];
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach(m => {
      expect(m[1]).toBe(BOOKING_URL);
    });
  });

  test('booking URL appears in locations.html', () => {
    const content = fs.readFileSync(path.join(pagesDir, 'locations.html'), 'utf8');
    expect(content).toContain(BOOKING_URL);
  });
});
