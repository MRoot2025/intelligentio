const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'assets', 'resources');

// Brand colors
const DARK_BG = '#191919';
const TEAL = '#76e6d8';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#AAAAAA';
const MED_GRAY = '#CCCCCC';
const BODY_TEXT = '#333333';
const SECTION_BG = '#F5F5F5';

function hexToRGB(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.substring(0,2),16), parseInt(h.substring(2,4),16), parseInt(h.substring(4,6),16)];
}

function createPDF(config) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'LETTER', margins: { top: 50, bottom: 50, left: 50, right: 50 } });
    const filePath = path.join(OUTPUT_DIR, config.filename);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const pageW = 612;
    const pageH = 792;
    const marginL = 50;
    const marginR = 50;
    const contentW = pageW - marginL - marginR;

    let curY = 0;

    // ── HEADER BLOCK ──
    const headerH = 130;
    doc.rect(0, 0, pageW, headerH).fill(DARK_BG);

    // Type label pill
    const pillText = config.type.toUpperCase();
    doc.fontSize(8).font('Helvetica-Bold');
    const pillW = doc.widthOfString(pillText) + 20;
    doc.roundedRect(marginL, 22, pillW, 18, 9).fill(TEAL);
    doc.fillColor('#111111').text(pillText, marginL, 25, { width: pillW, align: 'center' });

    // Company name
    doc.fontSize(10).font('Helvetica').fillColor(LIGHT_GRAY);
    doc.text('INTELLIGENT iT', marginL + pillW + 12, 25);

    // Category badge right side
    doc.fontSize(8).font('Helvetica').fillColor(LIGHT_GRAY);
    const catText = config.category.toUpperCase();
    const catW = doc.widthOfString(catText) + 16;
    doc.roundedRect(pageW - marginR - catW, 22, catW, 18, 9).lineWidth(0.5).strokeColor(LIGHT_GRAY).stroke();
    doc.fillColor(LIGHT_GRAY).text(catText, pageW - marginR - catW, 25, { width: catW, align: 'center' });

    // Title
    doc.fontSize(22).font('Helvetica-Bold').fillColor(WHITE);
    const titleH = doc.heightOfString(config.title, { width: contentW, lineGap: 2 });
    doc.text(config.title, marginL, 55, { width: contentW, lineGap: 2 });

    // Subtitle
    if (config.subtitle) {
      const subtitleY = 55 + titleH + 4;
      doc.fontSize(9).font('Helvetica').fillColor(LIGHT_GRAY);
      doc.text(config.subtitle, marginL, subtitleY, { width: contentW });
    }

    curY = headerH + 20;

    // Teal accent line
    doc.rect(marginL, headerH, contentW, 3).fill(TEAL);

    // ── FOOTER (drawn inline on each page) ──
    function drawFooterInline() {
      const fY = pageH - 50;
      doc.rect(0, fY - 10, pageW, 60).fill(DARK_BG);
      doc.rect(0, fY - 10, pageW, 2).fill(TEAL);
      doc.fontSize(8).font('Helvetica-Bold').fillColor(TEAL);
      doc.text('Ready to strengthen your IT strategy?', marginL, fY + 2, { width: contentW, lineBreak: false, height: 10 });
      doc.fontSize(7.5).font('Helvetica').fillColor(LIGHT_GRAY);
      doc.text('intelligentit.io  |  info@intelligentit.io  |  Schedule a free consultation', marginL, fY + 14, { width: contentW / 2, lineBreak: false, height: 10 });
      doc.fontSize(7.5).font('Helvetica').fillColor('#666666');
      doc.text('\u00A9 Intelligent iT. All rights reserved.', marginL, fY + 14, { width: contentW, align: 'right', lineBreak: false, height: 10 });
    }

    // ── BODY CONTENT ──
    function ensureSpace(needed) {
      if (curY + needed > pageH - 80) {
        drawFooterInline();
        doc.addPage();
        curY = 50;
      }
    }

    function drawSectionHeader(text) {
      ensureSpace(35);
      doc.rect(marginL, curY, contentW, 26).fill(SECTION_BG);
      doc.rect(marginL, curY, 3, 26).fill(TEAL);
      doc.fontSize(11).font('Helvetica-Bold').fillColor(BODY_TEXT);
      doc.text(text.toUpperCase(), marginL + 12, curY + 7, { width: contentW - 20 });
      curY += 34;
    }

    function drawCheckItem(text) {
      ensureSpace(22);
      // Checkbox
      doc.rect(marginL + 8, curY + 2, 11, 11).lineWidth(0.75).strokeColor(TEAL).stroke();
      doc.fontSize(9.5).font('Helvetica').fillColor(BODY_TEXT);
      const textH = doc.heightOfString(text, { width: contentW - 35 });
      doc.text(text, marginL + 26, curY + 1, { width: contentW - 35 });
      curY += Math.max(18, textH + 6);
    }

    function drawBulletItem(text, indent = 0) {
      ensureSpace(20);
      const x = marginL + 10 + indent;
      doc.circle(x + 3, curY + 6, 2.5).fill(TEAL);
      doc.fontSize(9.5).font('Helvetica').fillColor(BODY_TEXT);
      const textH = doc.heightOfString(text, { width: contentW - 30 - indent });
      doc.text(text, x + 12, curY + 1, { width: contentW - 30 - indent });
      curY += Math.max(18, textH + 6);
    }

    function drawTemplateRow(label, description) {
      ensureSpace(36);
      doc.rect(marginL, curY, contentW, 0.5).fill('#E0E0E0');
      curY += 4;
      doc.fontSize(10).font('Helvetica-Bold').fillColor(...hexToRGB(TEAL));
      doc.text(label, marginL + 8, curY);
      curY += 14;
      doc.fontSize(9).font('Helvetica').fillColor(BODY_TEXT);
      const h = doc.heightOfString(description, { width: contentW - 16 });
      doc.text(description, marginL + 8, curY, { width: contentW - 16 });
      curY += h + 8;
    }

    function drawScoreRow(criterion, description) {
      ensureSpace(42);
      doc.rect(marginL, curY, contentW, 0.5).fill('#E0E0E0');
      curY += 4;
      doc.fontSize(10).font('Helvetica-Bold').fillColor(BODY_TEXT);
      doc.text(criterion, marginL + 8, curY, { width: contentW - 140 });
      // Score boxes 1-5
      const boxStart = pageW - marginR - 120;
      for (let i = 1; i <= 5; i++) {
        const bx = boxStart + (i - 1) * 22;
        doc.rect(bx, curY, 16, 14).lineWidth(0.5).strokeColor('#CCCCCC').stroke();
        doc.fontSize(7).font('Helvetica').fillColor(LIGHT_GRAY).text(String(i), bx, curY + 3, { width: 16, align: 'center' });
      }
      curY += 18;
      doc.fontSize(8.5).font('Helvetica').fillColor('#666666');
      const h = doc.heightOfString(description, { width: contentW - 16 });
      doc.text(description, marginL + 8, curY, { width: contentW - 16 });
      curY += h + 8;
    }

    function drawParagraph(text) {
      ensureSpace(20);
      doc.fontSize(9.5).font('Helvetica').fillColor(BODY_TEXT);
      const h = doc.heightOfString(text, { width: contentW });
      doc.text(text, marginL, curY, { width: contentW });
      curY += h + 8;
    }

    function drawIntro(text) {
      ensureSpace(30);
      doc.fontSize(9.5).font('Helvetica').fillColor('#555555');
      const h = doc.heightOfString(text, { width: contentW });
      doc.text(text, marginL, curY, { width: contentW, lineGap: 2 });
      curY += h + 14;
    }

    // Render sections from config
    if (config.intro) {
      drawIntro(config.intro);
    }

    for (const section of config.sections) {
      if (section.header) drawSectionHeader(section.header);
      if (section.paragraph) drawParagraph(section.paragraph);
      if (section.items) {
        for (const item of section.items) {
          if (section.style === 'check') drawCheckItem(item);
          else if (section.style === 'bullet') drawBulletItem(item);
          else if (section.style === 'template') drawTemplateRow(item.label, item.desc);
          else if (section.style === 'score') drawScoreRow(item.label, item.desc);
          else drawCheckItem(item);
        }
      }
    }

    // Draw footer on the final page
    drawFooterInline();

    doc.end();
    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}

// ════════════════════════════════════════════════
// RESOURCE DEFINITIONS
// ════════════════════════════════════════════════

const resources = [
  // 1. Cybersecurity Risk Assessment Checklist
  {
    filename: 'rl01-cybersecurity-risk-checklist.pdf',
    title: 'Cybersecurity Risk\nAssessment Checklist',
    subtitle: '20 critical controls every business should evaluate to reduce cyber risk.',
    type: 'Checklist',
    category: 'Cybersecurity',
    intro: 'Use this checklist to audit your organization\'s security posture. Each item maps to industry frameworks (NIST, CIS Controls). Check off completed items and prioritize gaps.',
    sections: [
      { header: 'Identity & Access Management', style: 'check', items: [
        'Multi-factor authentication (MFA) enforced on all user accounts and admin portals',
        'Role-based access control (RBAC) implemented with least-privilege policies',
        'Privileged accounts inventoried, monitored, and rotated on a regular schedule',
        'Single sign-on (SSO) deployed across all business-critical applications',
      ]},
      { header: 'Endpoint & Network Security', style: 'check', items: [
        'Endpoint Detection & Response (EDR) deployed on all workstations and servers',
        'Next-gen firewall configured with intrusion prevention enabled',
        'DNS filtering active to block malicious domains',
        'Automatic OS and software patching within 14 days of release',
        'Mobile Device Management (MDM) enforced on all company and BYOD devices',
      ]},
      { header: 'Email & Phishing', style: 'check', items: [
        'Email filtering with anti-phishing, anti-malware, and sandboxing enabled',
        'DMARC, DKIM, and SPF records configured for all company domains',
        'Phishing simulation training conducted quarterly for all employees',
      ]},
      { header: 'Data Protection & Backup', style: 'check', items: [
        'Critical data backed up daily with 3-2-1 strategy (3 copies, 2 media, 1 offsite)',
        'Backup restoration tested quarterly with documented results',
        'Data Loss Prevention (DLP) policies configured for sensitive data',
        'Full-disk encryption enabled on all laptops and portable storage',
      ]},
      { header: 'Incident Response & Governance', style: 'check', items: [
        'Documented incident response plan reviewed and updated annually',
        'Security awareness training completed by all employees at least annually',
        'Vulnerability scanning performed monthly; penetration testing annually',
        'Cyber insurance policy active and reviewed with current risk profile',
      ]},
    ]
  },

  // 2. IT Budget Planning Template
  {
    filename: 'rl02-it-budget-planning-template.pdf',
    title: 'Annual IT Budget\nPlanning Template',
    subtitle: 'A structured framework to forecast, track, and optimize your IT spend.',
    type: 'Template',
    category: 'IT Strategy',
    intro: 'Use this template to build a comprehensive IT budget. Fill in estimated and actual costs for each category. Adjust line items to fit your organization\'s needs.',
    sections: [
      { header: 'Hardware & Infrastructure', style: 'template', items: [
        { label: 'Workstations & Laptops', desc: 'New purchases, replacements, and refresh cycles. Include monitors, docking stations, peripherals.' },
        { label: 'Servers & Networking', desc: 'On-premises servers, switches, routers, access points, UPS units, rack equipment.' },
        { label: 'Printers & Peripherals', desc: 'Printers, scanners, specialty devices. Include maintenance contracts and supplies.' },
      ]},
      { header: 'Software & Licensing', style: 'template', items: [
        { label: 'Productivity Suite', desc: 'Microsoft 365, Google Workspace, or equivalent. Per-user licensing costs.' },
        { label: 'Line-of-Business Applications', desc: 'ERP, CRM, accounting, project management, and industry-specific software.' },
        { label: 'Security Software', desc: 'EDR, email security, backup software, password managers, SIEM/SOC subscriptions.' },
      ]},
      { header: 'Cloud Services', style: 'template', items: [
        { label: 'Cloud Infrastructure (IaaS)', desc: 'Azure, AWS, or GCP compute, storage, and networking costs.' },
        { label: 'SaaS Applications', desc: 'All cloud-hosted applications not covered in other categories.' },
        { label: 'Cloud Backup & DR', desc: 'Disaster recovery as a service, cloud backup storage, replication costs.' },
      ]},
      { header: 'Security & Compliance', style: 'template', items: [
        { label: 'Managed Security Services', desc: 'SOC monitoring, managed detection & response, threat intelligence feeds.' },
        { label: 'Compliance & Auditing', desc: 'SOC 2 audits, penetration testing, vulnerability scanning, compliance consulting.' },
        { label: 'Cyber Insurance', desc: 'Annual premium for cyber liability and data breach coverage.' },
      ]},
      { header: 'Support & Professional Services', style: 'template', items: [
        { label: 'Managed IT Services', desc: 'Monthly managed services contract, help desk, remote monitoring & management.' },
        { label: 'Projects & Consulting', desc: 'Network upgrades, migrations, new deployments, and strategic consulting.' },
      ]},
      { header: 'Contingency & Innovation', style: 'template', items: [
        { label: 'Emergency Reserve (10-15%)', desc: 'Buffer for unexpected failures, emergency replacements, and unplanned projects.' },
        { label: 'Innovation & R&D', desc: 'AI tools, automation initiatives, proof-of-concept projects, training & certifications.' },
      ]},
    ]
  },

  // 3. IT Onboarding & Offboarding Checklist
  {
    filename: 'rl03-employee-onboarding-checklist.pdf',
    title: 'IT Onboarding &\nOffboarding Checklist',
    subtitle: 'Ensure secure, consistent account provisioning and deprovisioning for every employee.',
    type: 'Checklist',
    category: 'Operations',
    intro: 'A standardized onboarding/offboarding process reduces security risk and ensures productivity from day one. Use this checklist for every hire and departure.',
    sections: [
      { header: 'Onboarding — Account Setup', style: 'check', items: [
        'Create user account in Active Directory / identity provider',
        'Assign Microsoft 365 / Google Workspace license and configure email',
        'Set up MFA enrollment and verify with user on first day',
        'Provision access to required line-of-business applications',
        'Add user to correct security groups and distribution lists',
      ]},
      { header: 'Onboarding — Device & Equipment', style: 'check', items: [
        'Provision laptop/workstation with standard OS image and security tools',
        'Enroll device in MDM and apply compliance policies',
        'Assign phone system extension or soft phone license',
        'Provide any required peripherals (headset, monitor, docking station)',
      ]},
      { header: 'Onboarding — Training & Documentation', style: 'check', items: [
        'Schedule security awareness training within first week',
        'Share IT policies: acceptable use, password policy, data handling',
        'Provide help desk contact info and ticket submission process',
        'Walk through VPN setup and remote access procedures',
      ]},
      { header: 'Offboarding — Access Revocation', style: 'check', items: [
        'Disable user account in Active Directory / identity provider immediately',
        'Revoke access to all SaaS applications and cloud portals',
        'Remove from security groups, distribution lists, and shared mailboxes',
        'Terminate VPN and remote access credentials',
        'Reset passwords on any shared or service accounts the user accessed',
      ]},
      { header: 'Offboarding — Data & Device Recovery', style: 'check', items: [
        'Back up user\'s email, files, and OneDrive/Google Drive to secure archive',
        'Transfer ownership of shared files and projects to manager',
        'Collect and inventory all company devices (laptop, phone, badge, keys)',
        'Wipe and reimage returned devices; update asset inventory',
        'Confirm all data retention requirements are met per company policy',
      ]},
    ]
  },

  // 4. Cloud Migration Readiness Assessment
  {
    filename: 'rl04-cloud-migration-readiness.pdf',
    title: 'Cloud Migration\nReadiness Assessment',
    subtitle: 'Evaluate whether your organization is prepared for a successful cloud migration.',
    type: 'Assessment',
    category: 'Cloud',
    intro: 'Answer each question honestly to identify gaps before beginning your migration. This assessment covers the five critical dimensions of cloud readiness.',
    sections: [
      { header: 'Current Infrastructure Inventory', style: 'check', items: [
        'All physical and virtual servers are inventoried with OS, role, and dependencies documented',
        'Network topology is fully documented including VLANs, firewall rules, and WAN links',
        'Storage utilization and growth trends are tracked for all critical data stores',
        'Server and application performance baselines are established',
      ]},
      { header: 'Application Assessment', style: 'check', items: [
        'All business applications are catalogued with vendor, version, and licensing details',
        'Applications are classified: cloud-native, cloud-ready, needs refactoring, or cannot migrate',
        'Integration dependencies between applications are mapped',
        'Vendor support for cloud-hosted deployment has been confirmed for each application',
      ]},
      { header: 'Data & Compliance', style: 'check', items: [
        'Data classification policy exists (public, internal, confidential, regulated)',
        'Regulatory requirements for data residency and sovereignty are identified',
        'Data volumes and transfer requirements are estimated for migration planning',
        'Backup and retention policies are documented and compatible with cloud storage',
      ]},
      { header: 'Security & Identity', style: 'check', items: [
        'Identity provider (Azure AD, Okta, etc.) is in place for centralized authentication',
        'Conditional access and MFA policies are defined for cloud resource access',
        'Network security model (zero-trust, VPN, private endpoints) is planned for cloud',
        'Security monitoring and logging strategy is defined for cloud workloads',
      ]},
      { header: 'Budget & Resources', style: 'check', items: [
        'Total cost of ownership (TCO) comparison: on-premises vs. cloud has been completed',
        'Monthly cloud spend estimates include compute, storage, networking, and licensing',
        'Internal team has cloud skills or training plan / partner engagement is budgeted',
        'Migration project timeline, milestones, and rollback plan are documented',
      ]},
    ]
  },

  // 5. Cyber Incident Response Plan Template
  {
    filename: 'rl05-incident-response-plan-template.pdf',
    title: 'Cyber Incident Response\nPlan Template',
    subtitle: 'A ready-to-customize framework for responding to cybersecurity incidents swiftly and effectively.',
    type: 'Template',
    category: 'Cybersecurity',
    intro: 'Every organization needs a documented incident response plan. Customize this template with your team\'s contact information, escalation paths, and specific procedures.',
    sections: [
      { header: '1. Incident Classification', style: 'bullet', items: [
        'Severity 1 — Critical: Active breach, ransomware, data exfiltration in progress. Immediate all-hands response.',
        'Severity 2 — High: Confirmed malware, compromised account, or unauthorized access. Response within 1 hour.',
        'Severity 3 — Medium: Suspicious activity, phishing attempt succeeded, policy violation. Response within 4 hours.',
        'Severity 4 — Low: Failed attack, informational alert, minor policy deviation. Response within 24 hours.',
      ]},
      { header: '2. Response Team Roles', style: 'template', items: [
        { label: 'Incident Commander', desc: 'Leads the response effort. Authorizes containment and communication decisions. Typically IT Director or CISO.' },
        { label: 'Technical Lead', desc: 'Performs investigation, forensics, and remediation. Senior engineer or managed security partner.' },
        { label: 'Communications Lead', desc: 'Manages internal and external messaging. Coordinates with legal, PR, and regulatory contacts.' },
        { label: 'Executive Sponsor', desc: 'Provides business authority for critical decisions (system shutdowns, ransom decisions, regulatory disclosure).' },
      ]},
      { header: '3. Communication Plan', style: 'bullet', items: [
        'Internal notification: Alert response team via out-of-band channel (phone, Signal) — never use potentially compromised systems.',
        'Employee communication: Brief staff on need-to-know basis; provide clear instructions (e.g., do not click, change passwords).',
        'External notification: Engage legal counsel before contacting regulators, customers, or law enforcement.',
        'Documentation: Log all actions, decisions, and timestamps in the incident log from minute one.',
      ]},
      { header: '4. Containment & Eradication', style: 'bullet', items: [
        'Isolate affected systems from the network immediately — disable network ports or Wi-Fi, do not power off.',
        'Reset credentials for all compromised and potentially compromised accounts.',
        'Block attacker IOCs (IPs, domains, hashes) at the firewall and endpoint level.',
        'Engage forensics partner if Severity 1 or 2; preserve evidence (disk images, memory dumps, logs).',
      ]},
      { header: '5. Recovery & Post-Incident', style: 'bullet', items: [
        'Restore systems from known-good backups after confirming threat is eradicated.',
        'Monitor restored systems closely for 72 hours for signs of persistence or reinfection.',
        'Conduct a post-incident review (blameless retrospective) within 5 business days.',
        'Update this plan, security controls, and training based on lessons learned.',
      ]},
    ]
  },

  // 6. IT Vendor Evaluation Scorecard
  {
    filename: 'rl06-vendor-evaluation-scorecard.pdf',
    title: 'IT Vendor Evaluation\nScorecard',
    subtitle: 'Objectively compare IT vendors and managed service providers using weighted criteria.',
    type: 'Scorecard',
    category: 'IT Strategy',
    intro: 'Rate each vendor on a scale of 1-5 for every criterion below. Multiply by the weight to get a weighted score. The vendor with the highest total score is the strongest fit.',
    sections: [
      { header: 'Security & Compliance (Weight: 5x)', style: 'score', items: [
        { label: 'Security Certifications', desc: 'Does the vendor hold SOC 2 Type II, ISO 27001, or equivalent certifications?' },
        { label: 'Data Protection Practices', desc: 'Encryption at rest and in transit, access controls, data residency commitments.' },
        { label: 'Incident Response Capability', desc: 'Documented incident response plan, breach notification SLAs, forensic capabilities.' },
      ]},
      { header: 'Service Level Agreements (Weight: 4x)', style: 'score', items: [
        { label: 'Uptime Guarantee', desc: 'What uptime SLA is offered? (99.9%, 99.99%) Are there financial penalties for non-compliance?' },
        { label: 'Response & Resolution Times', desc: 'Guaranteed response time for critical, high, medium, and low priority issues.' },
        { label: 'After-Hours & Weekend Support', desc: 'Is 24/7/365 support included or available? What is the escalation process?' },
      ]},
      { header: 'Technical Capabilities (Weight: 4x)', style: 'score', items: [
        { label: 'Technology Stack Alignment', desc: 'Does the vendor support your existing platforms (Microsoft, Google, AWS, Azure, etc.)?' },
        { label: 'Scalability', desc: 'Can services scale up/down easily as your organization grows or needs change?' },
        { label: 'Proactive Monitoring & Automation', desc: 'Does the vendor provide 24/7 monitoring, automated remediation, and reporting?' },
      ]},
      { header: 'Pricing & Value (Weight: 3x)', style: 'score', items: [
        { label: 'Pricing Transparency', desc: 'Clear, predictable pricing with no hidden fees. Per-user or per-device model clarity.' },
        { label: 'Contract Flexibility', desc: 'Term length options, exit clauses, and ability to adjust scope mid-contract.' },
      ]},
      { header: 'References & Reputation (Weight: 3x)', style: 'score', items: [
        { label: 'Client References', desc: 'Can the vendor provide references from clients in your industry and size range?' },
        { label: 'Online Reviews & Case Studies', desc: 'Presence of verified reviews (Google, Clutch, G2) and published case studies.' },
        { label: 'Industry Experience', desc: 'Years in business, team certifications, and experience with your specific industry.' },
      ]},
    ]
  },

  // 7. SOC 2 Readiness Checklist
  {
    filename: 'rl07-soc2-readiness-checklist.pdf',
    title: 'SOC 2 Type II\nReadiness Checklist',
    subtitle: 'Prepare for your SOC 2 audit by verifying controls across all five Trust Service Criteria.',
    type: 'Checklist',
    category: 'Compliance',
    intro: 'SOC 2 Type II requires demonstrating that controls are effective over time (typically 6-12 months). Use this checklist to assess your readiness before engaging an auditor.',
    sections: [
      { header: 'Security (Common Criteria — Required)', style: 'check', items: [
        'Formal information security policy documented, approved by management, and distributed to all staff',
        'Risk assessment performed annually with documented risk register and treatment plan',
        'Logical access controls: unique user IDs, MFA, role-based access, quarterly access reviews',
        'Network security: firewalls, IDS/IPS, network segmentation, encrypted connections',
        'Change management process: documented approval, testing, and rollback procedures for all system changes',
        'Incident response plan documented, tested annually, and incidents are tracked and resolved',
        'Vulnerability management: regular scanning, timely patching, and penetration testing at least annually',
      ]},
      { header: 'Availability', style: 'check', items: [
        'System uptime monitoring in place with defined SLAs and escalation procedures',
        'Disaster recovery plan documented and tested at least annually',
        'Redundancy implemented for critical systems (failover, load balancing, geo-redundancy)',
        'Capacity planning process ensures resources meet current and projected demand',
      ]},
      { header: 'Processing Integrity', style: 'check', items: [
        'Data processing is complete, valid, accurate, and timely with documented quality checks',
        'Error handling and exception reporting procedures are in place and monitored',
        'Automated and manual reconciliation processes validate data accuracy',
      ]},
      { header: 'Confidentiality', style: 'check', items: [
        'Data classification policy defines confidential data and handling requirements',
        'Encryption enforced for confidential data at rest and in transit',
        'Data retention and disposal policies are documented and followed',
        'NDAs and confidentiality agreements are executed with employees and third parties',
      ]},
      { header: 'Privacy', style: 'check', items: [
        'Privacy notice published and accessible, describing data collection, use, and sharing practices',
        'Consent mechanisms in place for collection of personal data',
        'Data subject access and deletion requests can be fulfilled within required timeframes',
        'Third-party data processors are assessed and bound by data processing agreements',
      ]},
    ]
  },

  // 8. Remote Work Security Best Practices
  {
    filename: 'rl08-remote-work-security-guide.pdf',
    title: 'Remote Work Security\nBest Practices',
    subtitle: 'Essential security controls to protect your workforce — anywhere they connect.',
    type: 'Quick Guide',
    category: 'Cybersecurity',
    intro: 'Remote and hybrid work expands your attack surface. This guide outlines the key controls every organization should implement to secure distributed teams.',
    sections: [
      { header: 'Secure Connectivity', style: 'bullet', items: [
        'Deploy always-on VPN or Zero Trust Network Access (ZTNA) for all remote connections to company resources.',
        'Require WPA3 or WPA2-Enterprise for Wi-Fi connections; prohibit use of public/open Wi-Fi for work without VPN.',
        'Use split tunneling only when security policies allow; route sensitive traffic through corporate network.',
      ]},
      { header: 'Identity & Authentication', style: 'bullet', items: [
        'Enforce MFA on all accounts — prioritize phishing-resistant methods (FIDO2 keys, authenticator apps).',
        'Implement conditional access policies: block sign-ins from unknown devices, locations, or risky sessions.',
        'Require strong, unique passwords (16+ characters) managed through an enterprise password manager.',
      ]},
      { header: 'Device Management', style: 'bullet', items: [
        'Enroll all devices (company and BYOD) in Mobile Device Management (MDM) with compliance policies.',
        'Require full-disk encryption (BitLocker, FileVault) on all laptops and workstations.',
        'Enable automatic OS and application updates; enforce a maximum patch window of 14 days.',
        'Deploy EDR (Endpoint Detection & Response) on all endpoints with centralized alerting.',
      ]},
      { header: 'Phishing & Social Engineering', style: 'bullet', items: [
        'Conduct monthly or quarterly phishing simulations and track improvement over time.',
        'Implement advanced email filtering with link rewriting, attachment sandboxing, and impersonation protection.',
        'Train employees to verify unusual requests (wire transfers, credential resets) through a second communication channel.',
      ]},
      { header: 'Data Protection', style: 'bullet', items: [
        'Restrict download and sync of sensitive data to managed, compliant devices only.',
        'Enable Data Loss Prevention (DLP) policies in email, cloud storage, and collaboration tools.',
        'Require cloud-based file storage (OneDrive, SharePoint, Google Drive) instead of local-only storage.',
        'Disable USB storage devices via group policy unless explicitly approved.',
      ]},
      { header: 'Endpoint Protection & Monitoring', style: 'bullet', items: [
        'Centralize logging and monitoring for all remote endpoints through SIEM or managed SOC.',
        'Enable automatic screen lock after 5 minutes of inactivity on all devices.',
        'Implement remote wipe capability for lost or stolen devices.',
      ]},
    ]
  },

  // 9. HIPAA Compliance Checklist
  {
    filename: 'rl09-hipaa-compliance-checklist.pdf',
    title: 'HIPAA Compliance\nQuick-Start Checklist',
    subtitle: 'Key safeguards every covered entity and business associate must implement.',
    type: 'Checklist',
    category: 'Compliance',
    intro: 'HIPAA requires administrative, physical, and technical safeguards to protect electronic Protected Health Information (ePHI). Use this checklist to evaluate your compliance posture.',
    sections: [
      { header: 'Administrative Safeguards', style: 'check', items: [
        'Designated HIPAA Privacy Officer and Security Officer appointed',
        'Comprehensive risk analysis conducted and documented (required annually)',
        'Risk management plan addresses identified vulnerabilities with remediation timelines',
        'Workforce training on HIPAA policies completed at hire and annually thereafter',
        'Business Associate Agreements (BAAs) executed with all vendors handling ePHI',
        'Sanctions policy documented for workforce members who violate HIPAA policies',
        'Contingency plan includes data backup, disaster recovery, and emergency operations',
      ]},
      { header: 'Physical Safeguards', style: 'check', items: [
        'Facility access controls limit physical access to systems containing ePHI',
        'Workstation use policies define appropriate use and physical positioning of screens',
        'Workstation security: automatic screen lock, cable locks, and clean-desk policy enforced',
        'Device and media controls: inventory, disposal, and re-use procedures documented',
        'Visitor logs maintained for areas where ePHI is stored or accessible',
      ]},
      { header: 'Technical Safeguards', style: 'check', items: [
        'Unique user identification: each user has a unique ID for ePHI system access',
        'Automatic logoff configured on all systems that access ePHI',
        'Encryption implemented for ePHI at rest and in transit (AES-256, TLS 1.2+)',
        'Audit controls: hardware, software, and procedures to record and examine access to ePHI',
        'Integrity controls ensure ePHI is not improperly altered or destroyed',
        'Access controls enforce minimum necessary standard — users access only required ePHI',
        'Multi-factor authentication required for remote access to systems containing ePHI',
      ]},
      { header: 'Breach Notification Readiness', style: 'check', items: [
        'Breach notification procedures documented for individuals, HHS, and media (if 500+ affected)',
        'Incident response team trained on breach risk assessment (4-factor test)',
        'Breach log maintained for all incidents, including those determined not reportable',
        'Legal counsel identified for breach notification guidance',
      ]},
    ]
  },

  // 10. Disaster Recovery Plan Template
  {
    filename: 'rl10-disaster-recovery-plan-template.pdf',
    title: 'Business Continuity &\nDisaster Recovery Plan',
    subtitle: 'A comprehensive template to ensure your business can recover from any disruption.',
    type: 'Template',
    category: 'Cloud',
    intro: 'A robust BC/DR plan minimizes downtime and data loss. Customize this template with your organization\'s specific systems, contacts, and recovery objectives.',
    sections: [
      { header: '1. RTO & RPO Definitions', style: 'template', items: [
        { label: 'Recovery Time Objective (RTO)', desc: 'Maximum acceptable downtime for each critical system. Example: Email = 1 hour, ERP = 4 hours, File storage = 8 hours.' },
        { label: 'Recovery Point Objective (RPO)', desc: 'Maximum acceptable data loss measured in time. Example: Email = 1 hour, Database = 15 minutes, Files = 24 hours.' },
        { label: 'Critical Systems Inventory', desc: 'List all Tier 1 (mission-critical), Tier 2 (important), and Tier 3 (non-critical) systems with assigned RTO/RPO.' },
      ]},
      { header: '2. Backup Strategy', style: 'template', items: [
        { label: 'Backup Schedule', desc: 'Define frequency for each system: real-time replication, hourly snapshots, daily full backups, weekly archives.' },
        { label: '3-2-1 Backup Rule', desc: 'Maintain 3 copies of data on 2 different media types with 1 copy stored offsite or in the cloud.' },
        { label: 'Backup Verification', desc: 'Automated backup monitoring with alerts. Manual restoration tests performed quarterly.' },
      ]},
      { header: '3. Failover & Recovery Procedures', style: 'template', items: [
        { label: 'Cloud Failover', desc: 'Automated failover to secondary cloud region or standby environment. Document activation steps and DNS changes.' },
        { label: 'On-Premises Recovery', desc: 'Bare-metal restore procedures for physical servers. Include boot media locations and configuration documentation.' },
        { label: 'Application Recovery Sequence', desc: 'Define the order in which systems are restored: infrastructure first, then directory services, then applications.' },
      ]},
      { header: '4. Communication Plan', style: 'template', items: [
        { label: 'Emergency Contacts', desc: 'Maintain a current list of key personnel, managed service provider contacts, and vendor support numbers.' },
        { label: 'Employee Notification', desc: 'Define how employees will be notified (SMS, personal email, phone tree) when primary communication is down.' },
        { label: 'Customer & Stakeholder Updates', desc: 'Pre-drafted status page templates and communication cadence during extended outages.' },
      ]},
      { header: '5. Testing & Maintenance', style: 'template', items: [
        { label: 'Tabletop Exercises', desc: 'Conduct scenario-based walkthroughs with the response team semi-annually.' },
        { label: 'Full DR Test', desc: 'Perform a complete failover and recovery test at least annually. Document results and gaps.' },
        { label: 'Plan Review & Updates', desc: 'Review and update this plan quarterly, or immediately after any major infrastructure change or incident.' },
      ]},
    ]
  },
];

// ── MAIN ──
async function main() {
  console.log(`Generating ${resources.length} resource PDFs...`);
  for (const config of resources) {
    const filePath = await createPDF(config);
    console.log(`  ✓ ${config.filename}`);
  }
  console.log(`\nDone! All ${resources.length} PDFs saved to ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
