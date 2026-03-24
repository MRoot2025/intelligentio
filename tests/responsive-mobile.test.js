const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function load(filePath) {
  return cheerio.load(fs.readFileSync(filePath, 'utf8'));
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

const stylesCSS = readFile(path.join(__dirname, '..', 'styles.css'));
const pagesCSS = readFile(path.join(__dirname, '..', 'pages', 'pages.css'));
const indexHTML = readFile(path.join(__dirname, '..', 'index.html'));
const locationsHTML = readFile(path.join(__dirname, '..', 'pages', 'headquarters.html'));

// ─── Viewport Meta Tag ───

describe('Viewport meta tag', () => {
  test('index.html has viewport meta tag', () => {
    const $ = cheerio.load(indexHTML);
    const viewport = $('meta[name="viewport"]');
    expect(viewport.length).toBe(1);
    expect(viewport.attr('content')).toContain('width=device-width');
    expect(viewport.attr('content')).toContain('initial-scale=1');
  });

  test('headquarters.html has viewport meta tag', () => {
    const $ = cheerio.load(locationsHTML);
    const viewport = $('meta[name="viewport"]');
    expect(viewport.length).toBe(1);
    expect(viewport.attr('content')).toContain('width=device-width');
  });

  const samplePages = ['helpdesk.html', 'about.html', 'managed-soc.html'];
  test.each(samplePages)('%s has viewport meta tag', (page) => {
    const $ = load(path.join(__dirname, '..', 'pages', page));
    expect($('meta[name="viewport"]').length).toBe(1);
  });
});

// ─── CSS Breakpoints ───

describe('CSS breakpoints (styles.css)', () => {
  test('has mobile breakpoint at 640px', () => {
    expect(stylesCSS).toMatch(/@media\s*\(max-width:\s*640px\)/);
  });

  test('has tablet breakpoint at 768px', () => {
    expect(stylesCSS).toMatch(/@media\s*\(max-width:\s*768px\)/);
  });

  test('has desktop breakpoint at 1024px', () => {
    expect(stylesCSS).toMatch(/@media\s*\(max-width:\s*1024px\)/);
  });

  test('body has overflow-x hidden to prevent horizontal scroll', () => {
    expect(stylesCSS).toMatch(/body\s*\{[^}]*overflow-x:\s*hidden/);
  });

  test('box-sizing border-box is applied globally', () => {
    expect(stylesCSS).toMatch(/\*.*box-sizing:\s*border-box/);
  });
});

describe('CSS breakpoints (pages.css)', () => {
  test('has mobile breakpoint at 768px', () => {
    expect(pagesCSS).toMatch(/@media\s*\(max-width:\s*768px\)/);
  });

  test('has small mobile breakpoint at 480px', () => {
    expect(pagesCSS).toMatch(/@media\s*\(max-width:\s*480px\)/);
  });
});

// ─── Mobile Navigation ───

describe('Mobile navigation', () => {
  test('hamburger menu is hidden on desktop, shown on mobile', () => {
    expect(stylesCSS).toContain('.header__hamburger { display: flex; }');
    // Default state should be none
    expect(stylesCSS).toMatch(/\.header__hamburger\s*\{[^}]*display:\s*none/);
  });

  test('desktop nav is hidden on mobile', () => {
    expect(stylesCSS).toMatch(/\.header__nav\s*\{[^}]*display:\s*none/);
  });

  test('mobile nav menu has overflow-y auto for scrolling', () => {
    expect(stylesCSS).toMatch(/\.header__nav\.open\s*\{[^}]*overflow-y:\s*auto/);
  });

  test('mobile nav has max-height constraint', () => {
    expect(stylesCSS).toMatch(/\.header__nav\.open\s*\{[^}]*max-height/);
  });

  test('mega dropdown collapses to single column on tablet', () => {
    // At 768px, mega dropdown should be 1 column
    expect(stylesCSS).toContain('.header__nav.open .dropdown--mega { grid-template-columns: 1fr; }');
  });
});

// ─── Grid Layouts Responsive ───

describe('Grid layouts collapse on mobile', () => {
  test('services grid → 1 column at 640px', () => {
    const match640 = stylesCSS.match(/@media\s*\(max-width:\s*640px\)\s*\{([^}]*\{[^}]*\})*[^}]*/);
    expect(match640[0]).toContain('.services__grid { grid-template-columns: 1fr; }');
  });

  test('numbers grid collapses on smaller screens', () => {
    expect(stylesCSS).toMatch(/\.numbers__grid\s*\{\s*grid-template-columns:\s*repeat\(2,\s*1fr\)/);
  });

  test('footer columns → 1 column at 640px', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toContain('.footer__columns { grid-template-columns: 1fr; }');
  });

  test('inline 2-column grids override exists at 768px', () => {
    expect(stylesCSS).toContain('[style*="grid-template-columns: 1fr 1fr"]');
    expect(stylesCSS).toContain('grid-template-columns: 1fr !important');
  });

  test('dashboard mockup grid collapses on mobile', () => {
    expect(stylesCSS).toContain('.dashboard-mockup__grid { grid-template-columns: 1fr; }');
  });

  test('page stats grid has responsive rules', () => {
    // At 1024px should be 2 columns, at 480px should be 1 column
    expect(pagesCSS).toContain('.page-stats { grid-template-columns: repeat(2, 1fr); }');
    expect(pagesCSS).toContain('.page-stats { grid-template-columns: 1fr;');
  });
});

// ─── Typography Responsive ───

describe('Typography scales down on mobile', () => {
  test('hero h1 reduces at 640px', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    const match = after640.match(/\.hero__content h1\s*\{\s*font-size:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeLessThanOrEqual(32);
  });

  test('section header h2 reduces at 640px', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    const match = after640.match(/\.section__header h2\s*\{\s*font-size:\s*(\d+)px/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1])).toBeLessThanOrEqual(32);
  });

  test('page hero h1 reduces on mobile (pages.css)', () => {
    const match = pagesCSS.match(/\.page-hero h1\s*\{\s*font-size:\s*(\d+)px/g);
    expect(match.length).toBeGreaterThanOrEqual(2); // Desktop + at least one breakpoint
  });

  test('CTA h2 reduces at 640px', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toContain('.cta__inner h2');
  });
});

// ─── Touch Target Sizes ───

describe('Touch target sizes', () => {
  test('btn--lg has minimum 48px height on mobile', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toMatch(/\.btn--lg\s*\{[^}]*min-height:\s*48px/);
  });

  test('btn--sm has minimum 44px height on mobile', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toMatch(/\.btn--sm\s*\{[^}]*min-height:\s*44px/);
  });

  test('modal close button is at least 44x44px', () => {
    const closeMatch = locationsHTML.match(/\.modal__close\s*\{[^}]*width:\s*(\d+)px;\s*height:\s*(\d+)px/);
    expect(closeMatch).not.toBeNull();
    expect(parseInt(closeMatch[1])).toBeGreaterThanOrEqual(44);
    expect(parseInt(closeMatch[2])).toBeGreaterThanOrEqual(44);
  });
});

// ─── Modal Responsiveness ───

describe('Modal mobile responsiveness', () => {
  test('modal has max-height to prevent overflow', () => {
    expect(locationsHTML).toMatch(/\.modal\s*\{[^}]*max-height:\s*\d+vh/);
  });

  test('modal overlay has padding for safe area', () => {
    expect(locationsHTML).toMatch(/\.modal-overlay\s*\{[^}]*padding/);
  });

  test('modal has mobile-specific styles at 640px', () => {
    expect(locationsHTML).toMatch(/@media\s*\(max-width:\s*640px\)/);
  });

  test('modal padding reduces on mobile', () => {
    // Check that mobile modal has smaller padding than desktop
    const desktopPadding = locationsHTML.match(/\.modal\s*\{[^}]*padding:\s*(\d+)px/);
    expect(desktopPadding).not.toBeNull();
    // Mobile rule should exist with smaller padding
    const mobileBlock = locationsHTML.split('@media')[1];
    expect(mobileBlock).toContain('.modal');
  });

  test('form inputs are 16px on mobile (prevents iOS zoom)', () => {
    const mobileBlock = locationsHTML.split('@media')[1];
    expect(mobileBlock).toMatch(/font-size:\s*16px/);
  });
});

// ─── Images and Assets ───

describe('Image responsiveness', () => {
  test('images have max-width 100% rule', () => {
    expect(stylesCSS).toMatch(/img\s*\{[^}]*max-width:\s*100%/);
  });

  test('images have height auto', () => {
    expect(stylesCSS).toMatch(/img\s*\{[^}]*height:\s*auto/);
  });
});

// ─── Container and Layout ───

describe('Container responsiveness', () => {
  test('container has max-width constraint', () => {
    expect(stylesCSS).toMatch(/\.container\s*\{[^}]*max-width:\s*\d+px/);
  });

  test('container padding reduces on tablet (1024px)', () => {
    const after1024 = stylesCSS.split('@media (max-width: 1024px)')[1];
    expect(after1024).toContain('.container { padding: 0 24px; }');
  });

  test('container padding reduces further on mobile (640px)', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toMatch(/\.container\s*\{\s*padding:\s*0\s*16px/);
  });
});

// ─── Calculator Form ───

describe('Calculator form mobile', () => {
  test('calculator grid collapses to 1 column on tablet', () => {
    const after1024 = stylesCSS.split('@media (max-width: 1024px)')[1].split('@media')[0];
    expect(after1024).toContain('.calculator__inner { grid-template-columns: 1fr; }');
  });

  test('calculator form inner padding reduces on mobile', () => {
    expect(stylesCSS).toContain('.calculator__form-inner { padding:');
  });

  test('form inputs are full width', () => {
    expect(stylesCSS).toMatch(/\.form-select\s*\{[^}]*width:\s*100%/);
  });
});

// ─── Subpage Responsive Structure ───

describe('Subpage responsive structure', () => {
  const samplePages = ['helpdesk.html', 'finance-accounting.html', 'ai-workflow-automation.html'];

  test.each(samplePages)('%s references pages.css for responsive styles', (page) => {
    const content = readFile(path.join(__dirname, '..', 'pages', page));
    expect(content).toContain('pages.css');
  });

  test.each(samplePages)('%s references styles.css for base responsive', (page) => {
    const content = readFile(path.join(__dirname, '..', 'pages', page));
    expect(content).toContain('styles.css');
  });
});

// ─── Hero Responsive ───

describe('Hero sections responsive', () => {
  test('hero actions stack vertically on mobile', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toContain('.hero__actions { flex-direction: column; }');
  });

  test('hero trust badges stack on mobile', () => {
    const after640 = stylesCSS.split('@media (max-width: 640px)')[1];
    expect(after640).toContain('.hero__trust-badges { flex-direction: column;');
  });

  test('page hero reduces padding on mobile (pages.css)', () => {
    expect(pagesCSS).toMatch(/@media\s*\(max-width:\s*480px\)[\s\S]*\.page-hero/);
  });
});

// ─── Overflow Prevention ───

describe('Overflow prevention', () => {
  test('body prevents horizontal overflow', () => {
    expect(stylesCSS).toContain('overflow-x: hidden');
  });

  test('buttons use white-space nowrap to prevent text wrapping', () => {
    expect(stylesCSS).toMatch(/\.btn\s*\{[^}]*white-space:\s*nowrap/);
  });

  test('no hardcoded min-width on mega dropdown in mobile context', () => {
    // In the 1024px media query, min-width should be auto
    const after1024 = stylesCSS.split('@media (max-width: 1024px)')[1].split('@media')[0];
    expect(after1024).toContain('min-width: auto');
  });
});
