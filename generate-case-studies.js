const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'assets', 'case-studies');
const LOGO_PATH = path.join(__dirname, 'assets', 'logo-green.png');

// Colors
const DARK_BG = '#1a1a2e';
const TEAL = '#76e6d8';
const DARK_TEXT = '#222222';
const GRAY_TEXT = '#555555';
const LIGHT_GRAY = '#f4f4f4';
const WHITE = '#ffffff';

const caseStudies = [
  {
    filename: 'cs01-financial-services-compliance.pdf',
    title: 'How a 120-Employee Wealth Management Firm Passed Their NYDFS Audit with Zero Deficiencies',
    companyName: 'Meridian Wealth Partners',
    industry: 'Financial Services / Wealth Management',
    employees: '120',
    location: 'New York, NY',
    challenge: [
      'Meridian Wealth Partners had been managing regulatory compliance with a patchwork of manual processes and outdated documentation. With the New York Department of Financial Services (NYDFS) tightening cybersecurity requirements under 23 NYCRR 500, the firm faced mounting pressure to overhaul their compliance posture.',
      'Their previous IT provider lacked the expertise to address financial-sector regulations, leaving Meridian exposed to potential audit failures. Internal teams spent hundreds of hours each quarter on compliance documentation, pulling resources away from client-facing activities.',
      'With an upcoming NYDFS audit on the horizon, Meridian needed a partner who understood both the technical and regulatory demands of financial services IT.'
    ],
    solution: [
      'Intelligent iT deployed a comprehensive compliance-first IT strategy tailored to NYDFS requirements. This included implementing a Zero Trust security architecture with multi-factor authentication across all systems, encrypted communications, and continuous vulnerability scanning.',
      'Our team established automated compliance monitoring and documentation workflows, ensuring that every policy, procedure, and security control was continuously validated and audit-ready. We deployed endpoint detection and response (EDR) across all workstations and configured SIEM logging to meet regulatory retention requirements.',
      'We also conducted quarterly risk assessments and penetration testing, providing Meridian with detailed remediation roadmaps and executive-level compliance dashboards.'
    ],
    results: [
      { metric: '75%', description: 'Reduction in audit preparation time' },
      { metric: 'Zero', description: 'Deficiencies found during NYDFS audit' },
      { metric: '20%', description: 'Reduction in overall IT costs' },
      { metric: '100%', description: 'Compliance with 23 NYCRR 500 requirements' }
    ],
    quote: {
      text: 'Before Intelligent iT, our compliance process was a nightmare. They transformed our entire IT infrastructure and had us audit-ready in weeks, not months. When the NYDFS examiners came through, they found zero deficiencies. That kind of result speaks for itself.',
      author: 'David Hartman',
      role: 'Chief Compliance Officer, Meridian Wealth Partners'
    }
  },
  {
    filename: 'cs02-healthcare-hipaa-security.pdf',
    title: 'Healthcare Practice Eliminates Downtime and Achieves HIPAA Compliance in 90 Days',
    companyName: 'Atlantic Primary Care Associates',
    industry: 'Healthcare',
    employees: '85',
    location: 'Boston, MA',
    challenge: [
      'Atlantic Primary Care Associates operates four clinic locations across the greater Boston area, serving over 20,000 patients annually. Their aging IT infrastructure was causing frequent outages that directly impacted patient care, with EHR systems going offline multiple times per month.',
      'A recent risk assessment revealed critical gaps in their HIPAA compliance posture, including unencrypted patient data transfers, lack of proper access controls, and insufficient backup procedures. The practice faced potential fines and reputational damage.',
      'Staff members were spending excessive time on IT workarounds rather than patient care, and the practice urgently needed a technology partner who understood healthcare regulations and clinical workflows.'
    ],
    solution: [
      'Intelligent iT executed a 90-day HIPAA compliance transformation, beginning with a thorough gap analysis against all HIPAA Security Rule requirements. We migrated the practice to a HIPAA-compliant cloud infrastructure with redundant systems ensuring 99.99% uptime.',
      'Our team implemented role-based access controls, encrypted data at rest and in transit, and deployed automated backup systems with 15-minute recovery point objectives. We established a Business Associate Agreement (BAA) framework for all technology vendors.',
      'We also rolled out HIPAA security awareness training for all staff, implemented secure patient communication channels, and established continuous compliance monitoring with real-time alerting for any policy violations.'
    ],
    results: [
      { metric: '99.99%', description: 'System uptime achieved (up from 96%)' },
      { metric: '90 Days', description: 'To full HIPAA compliance' },
      { metric: '60%', description: 'Fewer IT support tickets' },
      { metric: 'Zero', description: 'HIPAA violations since implementation' }
    ],
    quote: {
      text: 'Our old IT provider treated us like any other business. Intelligent iT understood that when our systems go down, patients suffer. Since they took over, we haven\'t had a single outage that impacted patient care, and we finally have the confidence that our patient data is properly protected.',
      author: 'Dr. Sarah Okonkwo',
      role: 'Managing Partner, Atlantic Primary Care Associates'
    }
  },
  {
    filename: 'cs03-law-firm-cloud-migration.pdf',
    title: '85-Employee Law Firm Migrates to Cloud with Zero Business Disruption',
    companyName: 'Caldwell, Reeves & Morrison LLP',
    industry: 'Professional Services / Legal',
    employees: '85',
    location: 'New York, NY',
    challenge: [
      'Caldwell, Reeves & Morrison LLP was running critical legal applications on aging on-premise servers that were nearing end-of-life. Attorneys working remotely or in court had limited access to case files, document management systems, and research databases, severely impacting productivity.',
      'The firm\'s IT environment had grown organically over 15 years without a strategic plan, resulting in a complex web of legacy systems, incompatible software versions, and a growing maintenance burden. Annual hardware replacement costs were escalating beyond budget.',
      'With client confidentiality requirements and strict data retention obligations, the firm needed a migration approach that guaranteed zero data loss and maintained chain-of-custody documentation throughout the process.'
    ],
    solution: [
      'Intelligent iT designed a phased cloud migration strategy that moved the firm to Microsoft 365 and Azure while maintaining full operations throughout. We began with a comprehensive audit of all applications, data, and dependencies to create a risk-free migration roadmap.',
      'The migration was executed over three weekends, with each phase validated before proceeding. We migrated over 12TB of legal documents, case files, and email archives while maintaining metadata integrity and permission structures. A custom SharePoint architecture was built to mirror the firm\'s existing folder structure.',
      'Post-migration, we implemented cloud-native security controls, Azure Active Directory with conditional access policies, and a modern endpoint management solution that enabled secure access from any device, anywhere.'
    ],
    results: [
      { metric: 'Zero', description: 'Business disruption during migration' },
      { metric: '35%', description: 'Reduction in annual IT costs' },
      { metric: '2x', description: 'Faster document and file access' },
      { metric: '100%', description: 'Remote access for all attorneys' }
    ],
    quote: {
      text: 'We were terrified of migrating to the cloud. Our entire practice depends on being able to access case files instantly. Intelligent iT executed the migration flawlessly over a weekend, and Monday morning our attorneys didn\'t even realize the switch had happened. That\'s exactly what we needed.',
      author: 'Patricia Caldwell',
      role: 'Managing Partner, Caldwell, Reeves & Morrison LLP'
    }
  },
  {
    filename: 'cs04-marketing-agency-scalability.pdf',
    title: 'Fast-Growing Marketing Agency Scales from 50 to 200 Employees Without Adding IT Staff',
    companyName: 'Prism Creative Group',
    industry: 'Marketing / Advertising',
    employees: '50 to 200 (during engagement)',
    location: 'San Diego, CA',
    challenge: [
      'Prism Creative Group was on a rapid growth trajectory, winning major accounts and onboarding new employees at an unprecedented pace. Their single in-house IT administrator was overwhelmed, creating bottlenecks in employee onboarding that sometimes took two weeks to complete.',
      'The agency\'s creative teams needed access to high-performance computing resources, large file sharing capabilities, and collaboration tools that could handle video production, design assets, and campaign data. Their existing infrastructure couldn\'t scale to meet demand.',
      'Leadership faced a difficult decision: invest heavily in building an internal IT department, or find a managed services partner who could scale with them. They needed a solution that would keep pace with their growth without ballooning costs.'
    ],
    solution: [
      'Intelligent iT implemented a scalable IT-as-a-Service model designed specifically for rapid-growth organizations. We deployed automated onboarding workflows that provision new employee accounts, devices, software licenses, and security permissions in minutes rather than days.',
      'For the creative teams, we built a hybrid cloud architecture with high-performance compute resources for rendering and editing, combined with enterprise-grade file sharing that handled terabyte-scale creative assets. Integration with Adobe Creative Cloud, project management tools, and client collaboration platforms was seamless.',
      'Our AI-powered helpdesk handled tier-1 support automatically, while our dedicated team managed infrastructure scaling, security, and strategic planning as the company grew from 50 to 200 employees over 18 months.'
    ],
    results: [
      { metric: '4x', description: 'Growth with same IT spend per user' },
      { metric: '4 Min', description: 'Average new employee onboarding time' },
      { metric: 'Zero', description: 'Additional IT staff hires needed' },
      { metric: '99.9%', description: 'Uptime across all systems' }
    ],
    quote: {
      text: 'We quadrupled in size in 18 months, and Intelligent iT scaled right alongside us. New hires are productive on day one, our creative teams have the computing power they need, and I never had to build an IT department. They saved us at least three full-time IT salaries.',
      author: 'Marcus Chen',
      role: 'CEO, Prism Creative Group'
    }
  },
  {
    filename: 'cs05-construction-field-ops.pdf',
    title: 'Construction Firm Connects 15 Job Sites with Secure, Reliable IT Infrastructure',
    companyName: 'Hargrove Construction Corp.',
    industry: 'Construction',
    employees: '175',
    location: 'New York, NY & Tri-State Area',
    challenge: [
      'Hargrove Construction Corp. manages large-scale commercial construction projects across the New York tri-state area, with 15 active job sites at any given time. Field supervisors and project managers had unreliable connectivity, forcing them to rely on personal devices and unsecured file-sharing methods.',
      'Critical project documents, blueprints, and safety compliance records were scattered across USB drives, personal email accounts, and paper files. This lack of centralization led to version control issues, delayed approvals, and compliance risks with OSHA documentation.',
      'The company\'s headquarters IT systems were disconnected from field operations, creating a two-tier technology environment that made project oversight and real-time reporting nearly impossible.'
    ],
    solution: [
      'Intelligent iT designed a unified field-to-office IT infrastructure that brought enterprise-grade connectivity and security to every job site. We deployed ruggedized networking equipment with redundant cellular and satellite connectivity at each location, ensuring reliable access regardless of site conditions.',
      'A centralized document management system was implemented with mobile-optimized access, allowing field teams to view blueprints, submit daily reports, and access safety documentation from company-managed tablets and smartphones. Offline sync capabilities ensured productivity even in areas with limited connectivity.',
      'We established a unified endpoint management solution that secured all devices, implemented geo-fencing policies for sensitive project data, and created role-based access controls that aligned with the company\'s project hierarchy.'
    ],
    results: [
      { metric: '100%', description: 'Job site connectivity achieved' },
      { metric: '50%', description: 'Reduction in IT support calls from field' },
      { metric: 'Secure', description: 'Field access to all project documents' },
      { metric: '3 Hours', description: 'Saved per project manager per week' }
    ],
    quote: {
      text: 'Our job sites used to be technology dead zones. Now every superintendent has instant access to blueprints, schedules, and safety docs. The time savings alone paid for the entire investment in the first quarter. Intelligent iT understood construction in a way our previous IT company never did.',
      author: 'Robert Hargrove Jr.',
      role: 'VP of Operations, Hargrove Construction Corp.'
    }
  },
  {
    filename: 'cs06-accounting-ransomware-prevention.pdf',
    title: 'How Our AI SOC Stopped a Ransomware Attack Before It Encrypted a Single File',
    companyName: 'Brecker & Associates CPAs',
    industry: 'Financial Services / Accounting',
    employees: '95',
    location: 'Boston, MA',
    challenge: [
      'Brecker & Associates CPAs manages sensitive financial data for over 500 business clients, making them a high-value target for cybercriminals. During tax season, their team works around the clock, and any system downtime would directly impact client deliverables and firm revenue.',
      'The firm had experienced a phishing incident the previous year that, while contained, exposed weaknesses in their security posture. Their existing antivirus solution relied on signature-based detection, leaving them vulnerable to zero-day threats and sophisticated social engineering attacks.',
      'With client trust at the foundation of their business, Brecker & Associates needed a security solution that could detect and neutralize threats in real time, especially during their most vulnerable and high-traffic periods.'
    ],
    solution: [
      'Intelligent iT deployed our AI-powered Security Operations Center (SOC) with 24/7/365 threat monitoring and automated response capabilities. The system uses behavioral analytics and machine learning to detect anomalous activity patterns that traditional antivirus solutions miss entirely.',
      'We implemented a layered defense strategy including next-generation endpoint protection, email security with AI-powered phishing detection, network segmentation to contain potential breaches, and immutable backup systems that cannot be encrypted by ransomware.',
      'During the engagement, our AI SOC detected and automatically isolated a sophisticated ransomware attack that entered through a compromised vendor email. The threat was identified, contained, and neutralized in under three minutes, before a single file could be encrypted.'
    ],
    results: [
      { metric: '<3 Min', description: 'Attack detected and neutralized' },
      { metric: 'Zero', description: 'Files encrypted or data lost' },
      { metric: 'Zero', description: 'Minutes of downtime' },
      { metric: '24/7', description: 'AI-powered threat monitoring' }
    ],
    quote: {
      text: 'It was the middle of tax season when the attack hit. If we had our old security setup, we would have lost everything. Intelligent iT\'s AI caught the ransomware in under three minutes and shut it down before it could do any damage. They literally saved our business.',
      author: 'Jennifer Brecker',
      role: 'Managing Partner, Brecker & Associates CPAs'
    }
  },
  {
    filename: 'cs07-professional-services-managed-it.pdf',
    title: '150-Employee Consulting Firm Reduces IT Tickets by 70% with AI-Powered Helpdesk',
    companyName: 'Northbridge Management Consulting',
    industry: 'Professional Services / Management Consulting',
    employees: '150',
    location: 'New York, NY',
    challenge: [
      'Northbridge Management Consulting\'s internal IT team was drowning in repetitive support tickets, with consultants submitting an average of 400 tickets per month for password resets, software access requests, VPN issues, and basic troubleshooting. Response times averaged 4 hours, and resolution often took over a day.',
      'With consultants billing at premium rates, every hour spent waiting for IT support represented lost revenue. The firm estimated they were losing over $50,000 per month in billable time due to IT-related productivity losses.',
      'Attempts to hire additional IT staff proved difficult in the competitive NYC market, and the firm needed a fundamentally different approach to IT support that could deliver enterprise-grade responsiveness without an enterprise-sized IT budget.'
    ],
    solution: [
      'Intelligent iT deployed our AI-powered helpdesk platform that automatically resolves common IT issues without human intervention. The system handles password resets, software provisioning, VPN troubleshooting, and dozens of other routine tasks through an intuitive chat interface available 24/7.',
      'For issues requiring human expertise, our tiered support model ensures a live engineer responds within 2 minutes. We implemented proactive monitoring that detects and resolves problems before users even notice them, dramatically reducing the volume of reactive support requests.',
      'We also conducted a thorough environment optimization, addressing root causes of recurring issues including network configuration problems, outdated software deployments, and inconsistent device management policies that were generating unnecessary tickets.'
    ],
    results: [
      { metric: '70%', description: 'Reduction in IT support tickets' },
      { metric: '2 Min', description: 'Average response time (from 4 hours)' },
      { metric: '40%', description: 'Increase in consultant productivity' },
      { metric: '$600K', description: 'Annual savings in recovered billable time' }
    ],
    quote: {
      text: 'Our consultants used to dread dealing with IT issues. Now most problems are resolved instantly by the AI helpdesk, and when they need a real person, someone picks up in two minutes. The impact on morale and productivity has been tremendous. This is what modern IT support should look like.',
      author: 'Amanda Torres',
      role: 'COO, Northbridge Management Consulting'
    }
  },
  {
    filename: 'cs08-transportation-network-modernization.pdf',
    title: 'Regional Transportation Company Modernizes IT Across 8 Locations',
    companyName: 'Coastal Logistics & Transport',
    industry: 'Transportation / Logistics',
    employees: '220',
    location: 'San Diego, CA & West Coast',
    challenge: [
      'Coastal Logistics & Transport operates a fleet of 300+ vehicles across 8 locations from San Diego to Seattle. Each location had been managing its own IT independently, resulting in incompatible systems, inconsistent security policies, and no centralized visibility into operations.',
      'Dispatchers relied on a mix of legacy software and manual processes, with no real-time fleet visibility across locations. Communication between sites was fragmented, and the lack of standardization made it impossible to generate unified reporting for management.',
      'The company was also facing increasing cybersecurity threats targeting the transportation sector, with no unified security framework to protect driver data, route information, and client shipping records across their distributed network.'
    ],
    solution: [
      'Intelligent iT executed a comprehensive IT modernization program that unified all 8 locations under a single managed infrastructure. We deployed standardized networking equipment, centralized identity management, and a unified communications platform that connected every location seamlessly.',
      'We migrated dispatch and fleet management systems to a cloud-based platform with real-time tracking and analytics, giving management unprecedented visibility into operations across all locations. Standardized workstation images and automated patch management ensured every endpoint was consistent and secure.',
      'A unified cybersecurity framework was implemented with centralized SIEM monitoring, consistent security policies across all sites, and encrypted communications between locations using SD-WAN technology that also improved network performance and reduced connectivity costs.'
    ],
    results: [
      { metric: '99.9%', description: 'Network uptime across all locations' },
      { metric: 'Unified', description: 'Management dashboard for all 8 sites' },
      { metric: '30%', description: 'Reduction in overall IT costs' },
      { metric: '45%', description: 'Faster cross-location communication' }
    ],
    quote: {
      text: 'We went from eight separate IT environments to one unified system practically overnight. For the first time, I can see real-time operations across every location from a single dashboard. Intelligent iT didn\'t just modernize our IT, they modernized how we run our business.',
      author: 'Thomas Reilly',
      role: 'CEO, Coastal Logistics & Transport'
    }
  }
];

function generateCaseStudy(doc, study) {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  // === HEADER SECTION ===
  doc.rect(0, 0, pageWidth, 160).fill(DARK_BG);

  // Try to add logo
  try {
    doc.image(LOGO_PATH, margin, 20, { height: 30 });
  } catch (e) {
    // If logo fails, just use text
  }

  doc.fillColor(TEAL)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('INTELLIGENT iT CASE STUDY', margin, 25, { width: contentWidth, align: 'right' });

  // Title
  doc.fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(16)
    .text(study.title, margin, 65, { width: contentWidth, lineGap: 4 });

  // === COMPANY PROFILE BAR ===
  const profileY = 170;
  doc.rect(0, profileY, pageWidth, 50).fill(LIGHT_GRAY);

  const colWidth = contentWidth / 4;
  const profileItems = [
    { label: 'COMPANY', value: study.companyName },
    { label: 'INDUSTRY', value: study.industry },
    { label: 'EMPLOYEES', value: study.employees },
    { label: 'LOCATION', value: study.location }
  ];

  profileItems.forEach((item, i) => {
    const x = margin + i * colWidth;
    doc.fillColor(GRAY_TEXT).font('Helvetica-Bold').fontSize(7)
      .text(item.label, x, profileY + 10, { width: colWidth - 10 });
    doc.fillColor(DARK_TEXT).font('Helvetica').fontSize(8)
      .text(item.value, x, profileY + 22, { width: colWidth - 10 });
  });

  let currentY = profileY + 65;

  // === THE CHALLENGE ===
  currentY = drawSection(doc, 'THE CHALLENGE', study.challenge, margin, currentY, contentWidth);

  // === THE SOLUTION ===
  currentY = drawSection(doc, 'THE SOLUTION', study.solution, margin, currentY, contentWidth);

  // Check if we need a new page for results
  if (currentY > pageHeight - 300) {
    doc.addPage();
    currentY = 50;
  }

  // === THE RESULTS ===
  doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(13)
    .text('THE RESULTS', margin, currentY);
  currentY += 25;

  // Results grid
  const resultColWidth = contentWidth / 2;
  study.results.forEach((result, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * resultColWidth;
    const y = currentY + row * 55;

    // Metric box
    doc.rect(x, y, resultColWidth - 15, 45).lineWidth(0).fill('#f0faf8');
    doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(22)
      .text(result.metric, x + 12, y + 5, { width: resultColWidth - 35 });
    doc.fillColor(DARK_TEXT).font('Helvetica').fontSize(9)
      .text(result.description, x + 12, y + 30, { width: resultColWidth - 35 });
  });

  currentY += Math.ceil(study.results.length / 2) * 55 + 20;

  // Check if we need a new page for quote
  if (currentY > pageHeight - 160) {
    doc.addPage();
    currentY = 50;
  }

  // === CLIENT QUOTE ===
  doc.rect(margin, currentY, contentWidth, 2).fill(TEAL);
  currentY += 15;

  doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(20)
    .text('\u201C', margin, currentY - 5);

  doc.fillColor(DARK_TEXT).font('Helvetica-Oblique').fontSize(10)
    .text(study.quote.text, margin + 15, currentY, {
      width: contentWidth - 30,
      lineGap: 3
    });

  currentY = doc.y + 12;

  doc.fillColor(DARK_TEXT).font('Helvetica-Bold').fontSize(9)
    .text(study.quote.author, margin + 15, currentY);
  doc.fillColor(GRAY_TEXT).font('Helvetica').fontSize(8)
    .text(study.quote.role, margin + 15, doc.y + 2);

  currentY = doc.y + 30;

  // Check if we need a new page for CTA
  if (currentY > pageHeight - 120) {
    doc.addPage();
    currentY = 50;
  }

  // === CALL TO ACTION ===
  doc.rect(0, currentY, pageWidth, 90).fill(DARK_BG);

  doc.fillColor(WHITE).font('Helvetica-Bold').fontSize(14)
    .text('Ready to Transform Your IT?', margin, currentY + 15, { width: contentWidth, align: 'center' });

  doc.fillColor(TEAL).font('Helvetica').fontSize(10)
    .text('Schedule a free consultation with Intelligent iT', margin, currentY + 38, { width: contentWidth, align: 'center' });

  doc.fillColor('#cccccc').font('Helvetica').fontSize(9)
    .text('intelligentit.io  |  hello@intelligentit.io  |  2-Minute Response Guarantee', margin, currentY + 58, { width: contentWidth, align: 'center' });
}

function drawSection(doc, title, paragraphs, margin, startY, contentWidth) {
  doc.fillColor(TEAL).font('Helvetica-Bold').fontSize(13)
    .text(title, margin, startY);

  let y = startY + 22;

  paragraphs.forEach((para, i) => {
    doc.fillColor(DARK_TEXT).font('Helvetica').fontSize(9.5)
      .text(para, margin, y, { width: contentWidth, lineGap: 3 });
    y = doc.y + 10;
  });

  return y + 5;
}

// Generate all PDFs
console.log('Generating case study PDFs...\n');

let completed = 0;
const total = caseStudies.length;

caseStudies.forEach((study) => {
  const filePath = path.join(OUTPUT_DIR, study.filename);
  const doc = new PDFDocument({
    size: 'letter',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      Title: study.title,
      Author: 'Intelligent iT',
      Subject: 'Case Study',
      Creator: 'Intelligent iT'
    }
  });

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  generateCaseStudy(doc, study);

  doc.end();

  stream.on('finish', () => {
    completed++;
    console.log(`[${completed}/${total}] Created: ${study.filename}`);
    if (completed === total) {
      console.log('\nAll case study PDFs generated successfully!');
    }
  });
});
