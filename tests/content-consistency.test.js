const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');
const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

function readPage(file) {
  return fs.readFileSync(path.join(pagesDir, file), 'utf8');
}

// ─── Uptime Consistency ───

describe('Uptime claims consistency', () => {
  test('no HTML page claims 99.99% uptime', () => {
    htmlFiles.forEach(file => {
      const content = readPage(file);
      expect(content).not.toMatch(/99\.99%/);
    });
  });

  test('homepage does not claim 99.99% uptime', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).not.toMatch(/99\.99%/);
  });

  test('no page claims 99.999% (five-nines) uptime', () => {
    htmlFiles.forEach(file => {
      const content = readPage(file);
      expect(content).not.toMatch(/99\.999%/);
    });
  });
});

// ─── Resolution Time Consistency ───

describe('Resolution time consistency', () => {
  test('no page promises 30-minute resolution (should be 45)', () => {
    htmlFiles.forEach(file => {
      const content = readPage(file);
      // Allow "30-minute strategy" calls but not "30-minute resolution"
      const matches = content.match(/30-minute\s+resolution/gi);
      expect(matches).toBeNull();
    });
  });

  test('homepage does not promise 30-minute resolution', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    const matches = content.match(/30-minute\s+resolution/gi);
    expect(matches).toBeNull();
  });
});

// ─── Copyright Year ───

describe('Copyright year', () => {
  test('template.js has copyright 2026', () => {
    const content = fs.readFileSync(path.join(pagesDir, 'template.js'), 'utf8');
    expect(content).toContain('Copyright 2026');
    expect(content).not.toContain('Copyright 2025');
  });

  test('homepage has copyright 2026', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).toContain('Copyright 2026');
    expect(content).not.toContain('Copyright 2025');
  });
});

// ─── Broken Breadcrumbs ───

describe('Breadcrumb links', () => {
  test('no subpage has breadcrumb linking to href="#"', () => {
    htmlFiles.forEach(file => {
      const content = readPage(file);
      const breadcrumb = content.match(/page-hero__breadcrumb.*?<\/span>/s);
      if (breadcrumb) {
        expect(breadcrumb[0]).not.toContain('href="#"');
      }
    });
  });
});

// ─── Fake Names Removed ───

describe('Fake presenter names removed', () => {
  const fakeNames = ['Michael Torres', 'Sarah Chen', 'David Ramirez', 'Jennifer Walsh'];

  test.each(fakeNames)('"%s" does not appear on any page', (name) => {
    htmlFiles.forEach(file => {
      const content = readPage(file);
      expect(content).not.toContain(name);
    });
  });

  test.each(fakeNames)('"%s" does not appear on homepage', (name) => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).not.toContain(name);
  });
});

// ─── Testimonial Fixes ───

describe('Testimonial fixes', () => {
  test('homepage has "Thomas Oommen" not "Thoman"', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).not.toContain('Thoman');
    expect(content).toContain('Thomas Oommen');
  });

  test('Erica Doswell testimonial uses generic company description (no Sephora brand name)', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).toContain('Erica Doswell');
    expect(content).toContain('National Retail Company');
    expect(content).not.toMatch(/Sephora/);
  });
});

// ─── Microsoft 365 Title Fix ───

describe('Microsoft 365 page title', () => {
  test('microsoft-365.html title does not include Google Workspace', () => {
    const content = readPage('microsoft-365.html');
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    expect(titleMatch[1]).not.toContain('Google Workspace');
  });

  test('template.js nav does not say "Google Workspace" in link text', () => {
    const content = fs.readFileSync(path.join(pagesDir, 'template.js'), 'utf8');
    expect(content).not.toContain('Microsoft 365 / Google Workspace');
  });
});

// ─── LinkedIn URL ───

describe('LinkedIn URL uses named path', () => {
  test('template.js uses /company/intelligent-it/', () => {
    const content = fs.readFileSync(path.join(pagesDir, 'template.js'), 'utf8');
    expect(content).toContain('linkedin.com/company/intelligent-it/');
    expect(content).not.toContain('company/2609823');
  });

  test('homepage uses /company/intelligent-it/', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).toContain('linkedin.com/company/intelligent-it/');
    expect(content).not.toContain('company/2609823');
  });
});

// ─── Overview Video ───

describe('Overview video page', () => {
  test('overview-video.html does not have fake play button linking to contact', () => {
    const content = readPage('overview-video.html');
    // Should not have an <a> wrapping a play button going to locations
    expect(content).not.toMatch(/<a[^>]*class="video-embed"[^>]*href="locations\.html/);
  });
});

// ─── Pricing Page ───

describe('Pricing page', () => {
  test('does not claim "Simple, Transparent IT Pricing"', () => {
    const content = readPage('pricing.html');
    expect(content).not.toContain('Simple, Transparent IT Pricing');
  });

  test('Silver plan does not have duplicate "Cloud backup & recovery"', () => {
    const content = readPage('pricing.html');
    const silverSection = content.split('data-plan="Silver"')[1].split('data-plan="Gold"')[0];
    const matches = silverSection.match(/Cloud backup &amp; recovery/g);
    expect(matches ? matches.length : 0).toBeLessThanOrEqual(1);
  });
});

// ─── Response Time Consistency ───

describe('Contact response time consistency', () => {
  test('no page says "one business day"', () => {
    htmlFiles.forEach(file => {
      const content = readPage(file);
      expect(content.toLowerCase()).not.toContain('one business day');
    });
  });
});

// ─── Leadership Team ───

describe('Leadership page has full team', () => {
  const teamMembers = [
    'Manuel Ruiz', 'Thomas Atkins', 'Tyler Whittall', 'Maria Luisa',
    'Dan Flaherty', 'Anthony Feliciano', 'Eero Nevaluoto',
    'Anthony Senior', 'Melvin Rodriguez', 'Isabella Ruiz', 'Sam'
  ];

  test.each(teamMembers)('leadership.html includes %s', (name) => {
    const content = readPage('leadership.html');
    expect(content).toContain(name);
  });
});

// ─── GDPR and CCPA ───

describe('Privacy policy has GDPR and CCPA sections', () => {
  test('privacy.html contains GDPR section', () => {
    const content = readPage('privacy.html');
    expect(content).toContain('European Data Protection (GDPR)');
    expect(content).toContain('Legal Basis for Processing');
    expect(content).toContain('Data Breach Notification');
    expect(content).toContain('Subprocessors');
  });

  test('privacy.html contains CCPA/CPRA section', () => {
    const content = readPage('privacy.html');
    expect(content).toContain('California Privacy Rights (CCPA/CPRA)');
    expect(content).toContain('do not sell');
    expect(content).toContain('Right to Know');
    expect(content).toContain('Right to Delete');
  });
});

// ─── Accessibility Statement ───

describe('Accessibility statement', () => {
  test('terms.html contains accessibility section', () => {
    const content = readPage('terms.html');
    expect(content).toContain('Accessibility Statement');
    expect(content).toContain('WCAG');
  });
});

// ─── Industry Source Citations ───

describe('Industry source citations', () => {
  test('generated pages include IBM/Gartner/Verizon citations', () => {
    const content = readPage('helpdesk.html');
    expect(content).toContain('IBM Cost of a Data Breach');
    expect(content).toContain('Gartner');
    expect(content).toContain('Verizon');
  });

  test('homepage includes industry source footnote', () => {
    const content = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    expect(content).toContain('IBM Cost of a Data Breach');
  });
});

// ─── Unique Stats Per Service ───

describe('Proven Results stats are customized per service', () => {
  test('helpdesk and cloud-migrations have different stats', () => {
    const helpdesk = readPage('helpdesk.html');
    const cloud = readPage('cloud-migrations.html');

    const helpdeskStats = helpdesk.match(/page-stat__value">(.*?)</g).map(m => m.replace(/page-stat__value">/, '').replace(/</, ''));
    const cloudStats = cloud.match(/page-stat__value">(.*?)</g).map(m => m.replace(/page-stat__value">/, '').replace(/</, ''));

    // They should not be identical
    expect(JSON.stringify(helpdeskStats)).not.toBe(JSON.stringify(cloudStats));
  });

  test('managed-soc and vendor-management have different stats', () => {
    const soc = readPage('managed-soc.html');
    const vendor = readPage('vendor-management.html');

    const socStats = soc.match(/page-stat__value">(.*?)</g).map(m => m.replace(/page-stat__value">/, '').replace(/</, ''));
    const vendorStats = vendor.match(/page-stat__value">(.*?)</g).map(m => m.replace(/page-stat__value">/, '').replace(/</, ''));

    expect(JSON.stringify(socStats)).not.toBe(JSON.stringify(vendorStats));
  });
});
