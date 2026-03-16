# Intelligent iT Website - Claude Code Project Context

## Project Overview
This is the **Intelligent iT** corporate website — a managed IT services and cybersecurity company. The site was built from a Figma design and is deployed via GitHub Pages.

## Live URLs
- **GitHub Repo:** https://github.com/MRoot2025/intelligentio
- **Live Site:** https://mroot2025.github.io/intelligentio/
- **Local Dev:** `npx http-server . -p 3001 -a 0.0.0.0 -c-1 --cors`

## Figma Source
- **File URL:** https://www.figma.com/design/GQnyAlNvV5dx7umo4MI5PK/Intelligent-iT--Copy-
- **File Key:** `GQnyAlNvV5dx7umo4MI5PK`
- **API Pattern:** `curl -s -H "X-Figma-Token: TOKEN" "https://api.figma.com/v1/files/GQnyAlNvV5dx7umo4MI5PK"`
- **Note:** A personal access token is required. Ask the user for it — do NOT store tokens in this file.

## Tech Stack
- **Pure HTML/CSS/JS** — no frameworks, no build step
- **Font:** Inter (Google Fonts)
- **Hosting:** GitHub Pages (master branch, root `/`)
- **No package.json** — static site, served directly

## Design System
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0c0c0c` | Page bg |
| White | `#ffffff` | Primary text |
| Teal/Mint | `#76e6d8` | Accent, active states, stats |
| Darker Teal | `#5dd2c3` | Links, inline accents |
| Blue | `#1b5ace` | Gradient start |
| Deep Teal | `#00b19b` | Gradient end |
| Light Gray-Blue | `#dde1ed` | Secondary text |
| Lighter Gray-Blue | `#edeff7` | Body text |
| Medium Gray | `#bcbfcc` | Inactive/tertiary text |
| Dark Gray | `#191919` | Button text on light bg |

### Gradients
- **Hero/CTA:** `linear-gradient(135deg, #1b5ace, #00b19b)`
- **IntelligentView:** `linear-gradient(135deg, #00b19b, #006ab1)`
- **Solution cards:** `linear-gradient(135deg, #155065, #1e4c4a)`

### Typography
- Font: Inter, all weights 400/500/600/700
- H1: 56px/600, H2: 44px/600, H3: 36px/600
- Body: 18px/400, Buttons: 20px/500 (lg), 16px/500 (sm)
- Stats: 48-60px/600 in teal

### Buttons
- Primary: white bg, dark text, rounded 50px
- Secondary: transparent, teal border + text
- CTA header: white + teal variants, 16px

## File Structure
```
/
├── index.html          # Homepage (13 sections)
├── styles.css          # All styles (homepage + shared)
├── script.js           # Homepage JS (tabs, filters, animations, mobile menu)
├── assets/
│   ├── logo.png        # Logo (from Figma node 2:2)
│   ├── logo-green.png  # Green logo variant
│   ├── hero-bg.png     # Hero background image
│   ├── thumbnail.png   # Site thumbnail
│   └── image-6.png     # Decorative image
└── pages/
    ├── template.js     # Shared header/footer injector for subpages
    ├── pages.css       # Subpage-specific styles
    ├── generate-pages.js  # Node script to regenerate all subpages
    └── *.html          # 51 subpages (services, industries, company, etc.)
```

## Homepage Sections (in order)
1. Header (fixed, with mega-menu dropdowns)
2. Hero (gradient bg, CTA buttons)
3. Services Overview (6 cards grid)
4. Who We Are (5 tabs)
5. IntelligentView Dashboard (gradient bg, mockup)
6. AI Support Chat (chat mockup)
7. Our Solutions (8 filterable cards)
8. Testimonials (3 cards + logos)
9. Numbers/Stats (5 animated counters)
10. Partners (tabbed, 4 cards)
11. Cost Calculator (step form)
12. Insights & Resources (4 cards)
13. Recent Articles (4 cards)
14. Final CTA (gradient bg)
15. Footer (5-column mega footer)

## Subpages (51 total)
Subpages use `pages/template.js` to inject shared header/footer with full navigation. Each subpage has:
- Hero section with breadcrumb
- Content sections with headings, text, bullet lists, and stat grids
- Bottom CTA block

### Page Categories:
- **Business Outcomes (6):** reduce-it-costs, improve-security-compliance, eliminate-downtime, scale-your-team, distributed-workforce, automate-workflows
- **Managed IT Services (5):** helpdesk, fully-managed-it, co-managed-it, hardware-procurement, it-projects
- **Cybersecurity (5):** managed-soc, threat-protection, email-security, compliance-support, security-awareness
- **Cloud & Infrastructure (5):** microsoft-365, cloud-migrations, backup-disaster-recovery, network-wifi, remote-workforce
- **IT Strategy (4):** fractional-cio, it-assessments, technology-budgeting, vendor-management
- **AI & Automation (6):** ai-workflow-automation, ai-knowledgebase, automated-onboarding, automated-compliance-reports, ai-ticketing, repetitive-task-automation
- **Industries (7):** finance-accounting, marketing-agencies, professional-services, healthcare, construction, transportation, telecommunications
- **Company (5):** about, leadership, careers, locations, why-clients-choose-us
- **Insights (6):** blog, guides, case-studies, webinars, overview-video, resource-library
- **Legal (2):** privacy, terms

## Key Figma Node IDs (for future extraction)
| Page/Section | Node ID |
|-------------|---------|
| Homepage | 1197:37202 |
| Header Menu | 2:2463 |
| Footer | 1184:34013 |
| About Us | 1410:78201 |
| Leadership | 1410:80433 |
| Careers | 1375:71067 |
| Why Clients Choose Us | 1411:94145 |
| Blog | 1378:73162 |
| SOC | 1214:32328 |
| Threat Protection | 1214:35776 |
| Email Security | 1216:37356 |
| Compliance Support | 1219:39205 |
| Helpdesk | 1285:37039 |
| Fully Managed IT | 1295:38132 |
| Co-Managed IT | 1295:40974 |
| Cloud Migrations | 1306:47350 |
| AI Workflow Automation | 1339:52987 |
| Finance & Accounting | 1371:65520 |
| Locations | 1411:84335 |
| Menu Section | 1412:95897 |

## Deployment
```bash
# Push to GitHub (auto-deploys via GitHub Pages)
git add -A && git commit -m "description" && git push

# GitHub Pages is configured on master branch, root /
# Site updates within 1-2 minutes of push
```

## Local Development
```bash
# Start local server (avoid port 3000 if other projects use it)
npx http-server . -p 3001 -a 0.0.0.0 -c-1 --cors

# Regenerate subpages after editing generate-pages.js
cd pages && node generate-pages.js
```

## Company Info
- **Company:** Intelligent iT (intelligentitnyc.com)
- **Email:** sales@intelligentitnyc.com
- **Phone:** 212-730-1844
- **Offices:** New York City (HQ), Boston, San Diego
- **GitHub Account:** MRoot2025
