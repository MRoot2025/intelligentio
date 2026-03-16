const fs = require('fs');
const path = require('path');

const pages = [
  // Business Outcomes
  { file: 'reduce-it-costs.html', title: 'Reduce IT Costs', category: 'Business Outcomes', hero: 'Reduce IT Costs Without Sacrificing Quality', subtitle: 'Predictable monthly pricing, smarter resource allocation, and elimination of wasteful spending — so your IT budget works harder for you.', sections: [
    { heading: 'The Problem', text: 'Most growing organizations overspend on IT because they\'re reacting to problems instead of preventing them. Break-fix models, underused licenses, and redundant tools quietly drain your budget.' },
    { heading: 'How We Help', text: 'We audit your current IT environment, eliminate waste, consolidate tools, and deliver a fixed monthly cost that covers everything — support, security, and strategy.' },
    { heading: 'What You Get', items: ['Predictable monthly IT costs with no surprise invoices', 'License optimization across Microsoft 365, Google Workspace, and security tools', 'Proactive maintenance that prevents costly emergency repairs', 'Vendor consolidation and negotiation on your behalf'] },
    { heading: 'Results Our Clients See', stats: [{ value: '30-40%', label: 'Reduction in overall IT spend' }, { value: '$0', label: 'Surprise invoices' }, { value: '100%', label: 'Budget predictability' }] }
  ]},
  { file: 'improve-security-compliance.html', title: 'Improve Security & Compliance', category: 'Business Outcomes', hero: 'Improve Security & Compliance Posture', subtitle: 'Close security gaps, meet regulatory requirements, and protect your organization from evolving threats.', sections: [
    { heading: 'The Challenge', text: 'Cyber threats are evolving faster than most internal teams can keep up. Compliance frameworks like SOC 2, HIPAA, PCI DSS, and NYDFS 500 add layers of complexity.' },
    { heading: 'Our Approach', text: 'We implement layered security controls, continuous monitoring, and compliance automation — so you\'re always audit-ready and always protected.' },
    { heading: 'What We Deliver', items: ['24/7 SOC monitoring and threat detection', 'Compliance gap analysis and remediation roadmaps', 'Security awareness training and phishing simulations', 'Endpoint protection, email security, and MFA enforcement'] },
    { heading: 'Impact', stats: [{ value: '75%', label: 'Reduction in phishing incidents' }, { value: '100%', label: 'Audit readiness' }, { value: '24/7', label: 'Threat monitoring' }] }
  ]},
  { file: 'eliminate-downtime.html', title: 'Eliminate Downtime', category: 'Business Outcomes', hero: 'Eliminate Downtime, Maximize Productivity', subtitle: 'Proactive monitoring, rapid response, and resilient infrastructure ensure your team stays productive.', sections: [
    { heading: 'The Cost of Downtime', text: 'Every minute of downtime costs money, productivity, and trust. For mid-sized organizations, unplanned outages can cost thousands per hour.' },
    { heading: 'How We Prevent It', text: 'We monitor your systems 24/7, catch issues before they cause outages, and maintain backup and disaster recovery plans that keep you running.' },
    { heading: 'What\'s Included', items: ['24/7/365 infrastructure monitoring and alerting', 'Proactive patch management and system updates', 'Backup and disaster recovery with tested failover', 'Rapid incident response with < 5 minute first response'] },
    { heading: 'Results', stats: [{ value: '99.9%', label: 'Uptime guarantee' }, { value: '<5min', label: 'Avg. first response' }, { value: '8,760+', label: 'Monitoring hours/year' }] }
  ]},
  { file: 'scale-your-team.html', title: 'Scale Your Team Efficiently', category: 'Business Outcomes', hero: 'Scale Your Team Without Scaling IT Headcount', subtitle: 'Grow confidently with IT infrastructure that scales with you — without the overhead of building an internal team.', sections: [
    { heading: 'The Growth Challenge', text: 'Hiring, training, and retaining IT staff is expensive and slow. As your team grows, your IT needs multiply.' },
    { heading: 'Our Solution', text: 'We become your IT department — or extend your existing one. You get enterprise-grade expertise at a fraction of the cost of hiring internally.' },
    { heading: 'How It Works', items: ['Scalable support that grows with your headcount', 'Automated onboarding and offboarding for new hires', 'Cloud infrastructure that adapts to your needs', 'Strategic IT planning aligned with business growth'] },
    { heading: 'Impact', stats: [{ value: '50%', label: 'Faster employee onboarding' }, { value: '0', label: 'IT hires needed' }, { value: '24/7', label: 'Coverage from day one' }] }
  ]},
  { file: 'distributed-workforce.html', title: 'Support a Distributed Workforce', category: 'Business Outcomes', hero: 'Support a Distributed Workforce Seamlessly', subtitle: 'Keep remote, hybrid, and multi-office teams connected, secure, and productive from anywhere.', sections: [
    { heading: 'The Reality', text: 'Remote and hybrid work is here to stay. Your IT infrastructure needs to support teams wherever they are — securely and reliably.' },
    { heading: 'What We Provide', items: ['Secure remote access and VPN configuration', 'Cloud-first collaboration tools (Microsoft 365, Google Workspace)', 'Endpoint management for personal and company devices', 'Zero-trust security architecture'] },
    { heading: 'Results', stats: [{ value: '100%', label: 'Remote team coverage' }, { value: 'Zero', label: 'Trust architecture' }, { value: '24/7', label: 'Global support' }] }
  ]},
  { file: 'automate-workflows.html', title: 'Automate Workflows & Processes', category: 'Business Outcomes', hero: 'Automate Workflows & Eliminate Manual IT Tasks', subtitle: 'Free your team from repetitive work with intelligent automation powered by AI and proven workflows.', sections: [
    { heading: 'Why Automate', text: 'Manual IT processes waste time, introduce errors, and slow your business down. Automation lets your team focus on what matters.' },
    { heading: 'What We Automate', items: ['Employee onboarding and offboarding workflows', 'Compliance reporting and documentation', 'Ticket routing and first-level support responses', 'Patch management and system updates', 'Data backup and recovery processes'] },
    { heading: 'Impact', stats: [{ value: '40%', label: 'Fewer support tickets' }, { value: '60%', label: 'Faster onboarding' }, { value: '100%', label: 'Consistent processes' }] }
  ]},

  // Services - Managed IT
  { file: 'helpdesk.html', title: '24/7 Helpdesk & End-User Support', category: 'Managed IT Services', hero: '24/7 Helpdesk & End-User Support', subtitle: 'On call, because the nine-to-five workday is a relic. Real engineers, real-time resolution, around the clock.', sections: [
    { heading: 'Always-On Support', text: 'Your team doesn\'t stop working at 5pm, and neither do we. Our helpdesk is staffed by real engineers — not bots, not scripts — who resolve issues fast.' },
    { heading: 'What\'s Included', items: ['24/7/365 phone, email, and chat support', 'Average first response time under 5 minutes', 'Dedicated support engineers who know your environment', 'Escalation paths to senior engineers and specialists', 'Self-service portal with knowledge base'] },
    { heading: 'By the Numbers', stats: [{ value: '10,000+', label: 'Tickets resolved all-time' }, { value: '<5min', label: 'Avg. first response' }, { value: '<2hr', label: 'Avg. resolution time' }] }
  ]},
  { file: 'fully-managed-it.html', title: 'Fully Managed IT', category: 'Managed IT Services', hero: 'Fully Managed IT Services', subtitle: 'Complete IT management so you can focus on running your business, not troubleshooting technology.', sections: [
    { heading: 'Your Complete IT Department', text: 'We take full ownership of your IT environment — from helpdesk support and security to strategy and vendor management. One partner, one monthly cost, zero gaps.' },
    { heading: 'What\'s Included', items: ['24/7 helpdesk and end-user support', 'Network monitoring and management', 'Cybersecurity and compliance management', 'Cloud infrastructure management', 'IT strategy and virtual CIO services', 'Vendor management and procurement', 'Onboarding and offboarding automation'] },
    { heading: 'Results', stats: [{ value: '40%', label: 'Fewer IT tickets' }, { value: 'Fixed', label: 'Monthly pricing' }, { value: '2x', label: 'Faster resolutions' }] }
  ]},
  { file: 'co-managed-it.html', title: 'Co-Managed IT', category: 'Managed IT Services', hero: 'Co-Managed IT Services', subtitle: 'Extend your internal IT team with enterprise-grade expertise, tools, and 24/7 coverage.', sections: [
    { heading: 'The Best of Both Worlds', text: 'Your internal team knows your business. We bring the depth, tools, and round-the-clock coverage they need to excel. Co-managed IT fills the gaps without replacing your people.' },
    { heading: 'How It Works', items: ['We augment your team with specialized expertise', 'Shared ticketing and documentation systems', '24/7 monitoring and after-hours support', 'Cybersecurity and compliance tools your team can leverage', 'Strategic planning alongside your IT leadership'] }
  ]},
  { file: 'hardware-procurement.html', title: 'Hardware & Software Procurement', category: 'Managed IT Services', hero: 'Hardware & Software Procurement', subtitle: 'Get the right technology at the right price, configured and deployed without the hassle.', sections: [
    { heading: 'Simplified Procurement', text: 'We leverage vendor relationships and volume pricing to source, configure, and deploy hardware and software — saving you time and money.' },
    { heading: 'What We Handle', items: ['Laptops, desktops, and mobile devices', 'Networking equipment and infrastructure', 'Software licensing and optimization', 'Asset tracking and lifecycle management', 'Configuration and deployment to your specifications'] }
  ]},
  { file: 'it-projects.html', title: 'IT Projects & Migrations', category: 'Managed IT Services', hero: 'IT Projects & Migrations', subtitle: 'From office moves to cloud migrations, we plan and execute IT projects on time and on budget.', sections: [
    { heading: 'Expert Project Delivery', text: 'Whether you\'re migrating to the cloud, opening a new office, or overhauling your infrastructure, we bring structured project management and deep technical expertise.' },
    { heading: 'Project Types', items: ['Cloud migrations (AWS, Azure, Google Cloud)', 'Office relocations and network buildouts', 'Infrastructure upgrades and modernization', 'Email and collaboration platform migrations', 'Security infrastructure overhauls'] }
  ]},

  // Services - Cybersecurity
  { file: 'managed-soc.html', title: 'Managed SOC (Monitoring & Response)', category: 'Cybersecurity & Compliance', hero: 'Managed SOC — 24/7 Monitoring & Response', subtitle: 'Continuous threat detection, investigation, and response by certified security analysts protecting your organization around the clock.', sections: [
    { heading: 'Enterprise Security, Accessible to All', text: 'Our Security Operations Center monitors your environment 24/7, detecting and responding to threats before they become breaches.' },
    { heading: 'Capabilities', items: ['24/7 real-time threat monitoring and detection', 'SIEM log management and correlation', 'Incident investigation and response', 'Threat intelligence and vulnerability scanning', 'Monthly security reports and executive briefings'] },
    { heading: 'Results', stats: [{ value: '24/7', label: 'Monitoring coverage' }, { value: '<15min', label: 'Threat response time' }, { value: '99.9%', label: 'Threat detection rate' }] }
  ]},
  { file: 'threat-protection.html', title: 'Threat Protection', category: 'Cybersecurity & Compliance', hero: 'Advanced Threat Protection', subtitle: 'Multi-layered defense against ransomware, malware, phishing, and zero-day attacks.', sections: [
    { heading: 'Defense in Depth', text: 'We deploy multiple layers of protection across your endpoints, network, email, and cloud environments to stop threats at every stage of the attack chain.' },
    { heading: 'Protection Layers', items: ['Next-gen antivirus and endpoint detection & response (EDR)', 'DNS filtering and web content filtering', 'Firewall management and intrusion prevention', 'Dark web monitoring for compromised credentials', 'Automated threat remediation'] }
  ]},
  { file: 'email-security.html', title: 'Email Security', category: 'Cybersecurity & Compliance', hero: 'Email Security', subtitle: 'Protect your inbox from phishing, business email compromise, and malicious attachments.', sections: [
    { heading: 'Your #1 Attack Vector', text: 'Over 90% of cyberattacks start with email. We deploy advanced email security that catches what built-in filters miss.' },
    { heading: 'What We Deploy', items: ['Advanced anti-phishing and anti-spoofing', 'Attachment and URL sandboxing', 'Business email compromise (BEC) detection', 'DMARC, DKIM, and SPF configuration', 'Email encryption and DLP policies'] }
  ]},
  { file: 'compliance-support.html', title: 'Compliance Support', category: 'Cybersecurity & Compliance', hero: 'Compliance Support', subtitle: 'SOC 2, HIPAA, PCI DSS, GDPR, CCPA, NYDFS 500, FTC Safeguards Rule, NIST CSF, ISO 27001 readiness — we\'ve got you covered.', sections: [
    { heading: 'Always Audit-Ready', text: 'We implement the technical controls, documentation, and monitoring required by major compliance frameworks — and keep them current.' },
    { heading: 'Frameworks We Support', items: ['SOC 2 Type I & Type II', 'HIPAA / HITECH', 'PCI DSS', 'GDPR & CCPA', 'NYDFS 500', 'FTC Safeguards Rule', 'NIST Cybersecurity Framework', 'ISO 27001 readiness'] },
    { heading: 'Results', stats: [{ value: '60%', label: 'Audit prep reduction' }, { value: '100%', label: 'Documentation consistency' }, { value: 'Zero', label: 'Compliance gaps' }] }
  ]},
  { file: 'security-awareness.html', title: 'Security Awareness & Phishing Testing', category: 'Cybersecurity & Compliance', hero: 'Security Awareness & Phishing Testing', subtitle: 'Turn your team into your strongest security layer with ongoing training and realistic phishing simulations.', sections: [
    { heading: 'People Are the Perimeter', text: 'Technology alone can\'t stop every attack. We train your employees to recognize and report threats — making them an active line of defense.' },
    { heading: 'Program Includes', items: ['Monthly phishing simulation campaigns', 'Interactive security awareness training modules', 'Role-based training for high-risk users', 'Detailed reporting on employee performance', 'Remediation training for users who fail simulations'] }
  ]},

  // Services - Cloud
  { file: 'microsoft-365.html', title: 'Microsoft 365 & Google Workspace Management', category: 'Cloud & Infrastructure', hero: 'Microsoft 365 & Google Workspace Management', subtitle: 'Get the most from your cloud collaboration platform with expert management, optimization, and support.', sections: [
    { heading: 'Maximize Your Investment', text: 'Most organizations use less than 30% of their Microsoft 365 or Google Workspace capabilities. We optimize your setup, manage users, and ensure security.' },
    { heading: 'What We Manage', items: ['User provisioning and license management', 'Email configuration and migration', 'SharePoint/OneDrive and Google Drive administration', 'Teams/Slack integration and optimization', 'Security policies and conditional access', 'Backup and data protection'] }
  ]},
  { file: 'cloud-migrations.html', title: 'Cloud Migrations', category: 'Cloud & Infrastructure', hero: 'Cloud Migrations', subtitle: 'Move to the cloud with confidence — planned, tested, and executed with zero disruption.', sections: [
    { heading: 'Seamless Migration', text: 'We plan and execute cloud migrations that minimize downtime and maximize the benefits of modern cloud infrastructure.' },
    { heading: 'Migration Services', items: ['Cloud readiness assessments', 'Azure, AWS, and Google Cloud migrations', 'Email and data migration', 'Application migration and modernization', 'Hybrid cloud architecture design', 'Post-migration optimization'] }
  ]},
  { file: 'backup-disaster-recovery.html', title: 'Backup & Disaster Recovery', category: 'Cloud & Infrastructure', hero: 'Backup & Disaster Recovery', subtitle: 'Protect your data and ensure business continuity with tested, reliable backup and recovery solutions.', sections: [
    { heading: 'When Disaster Strikes', text: 'Whether it\'s ransomware, hardware failure, or human error — your data needs to be recoverable. We implement and test backup solutions that work when you need them most.' },
    { heading: 'What We Provide', items: ['Automated daily backups with offsite replication', 'Rapid recovery with defined RPO and RTO targets', 'Regular backup testing and disaster recovery drills', 'Microsoft 365 and Google Workspace backup', 'Ransomware-resistant backup architecture'] }
  ]},
  { file: 'network-wifi.html', title: 'Network Architecture & Wi-Fi', category: 'Cloud & Infrastructure', hero: 'Network Architecture & Wi-Fi', subtitle: 'Reliable, secure, high-performance networking designed for modern workplaces.', sections: [
    { heading: 'Built for Performance', text: 'We design, deploy, and manage network infrastructure that delivers reliable connectivity, strong security, and room to grow.' },
    { heading: 'Services', items: ['Network design and architecture', 'Enterprise Wi-Fi deployment and management', 'Firewall and VPN configuration', 'Network segmentation and security', 'Performance monitoring and optimization', 'SD-WAN implementation'] }
  ]},
  { file: 'remote-workforce.html', title: 'Remote Workforce Enablement', category: 'Cloud & Infrastructure', hero: 'Remote Workforce Enablement', subtitle: 'Equip your distributed team with secure, reliable access to everything they need — from anywhere.', sections: [
    { heading: 'Work From Anywhere', text: 'We build the infrastructure and security your remote and hybrid teams need to be productive, collaborative, and protected.' },
    { heading: 'What We Deploy', items: ['Secure remote access (VPN, ZTNA)', 'Cloud desktop and virtual desktop (VDI)', 'Endpoint management for remote devices', 'Collaboration platform optimization', 'Home office setup and support'] }
  ]},

  // Services - IT Strategy
  { file: 'fractional-cio.html', title: 'Fractional CIO / Fractional CTO', category: 'IT Strategy & Leadership', hero: 'Fractional CIO / Fractional CTO', subtitle: 'Executive-level IT leadership and strategy — without the full-time salary.', sections: [
    { heading: 'Strategic IT Leadership', text: 'Get a seasoned technology executive who aligns your IT investments with business goals, leads digital transformation, and guides your technology roadmap.' },
    { heading: 'What You Get', items: ['Quarterly technology roadmap and strategic planning', 'IT budget planning and optimization', 'Vendor evaluation and selection', 'Board and leadership team presentations', 'Digital transformation guidance', 'Risk assessment and security strategy'] }
  ]},
  { file: 'it-assessments.html', title: 'IT Assessments & Roadmapping', category: 'IT Strategy & Leadership', hero: 'IT Assessments & Roadmapping', subtitle: 'Understand where your IT stands today and build a clear path to where it needs to be.', sections: [
    { heading: 'Know Your Starting Point', text: 'We conduct comprehensive assessments of your IT environment, identify risks and opportunities, and build a prioritized roadmap for improvement.' },
    { heading: 'Assessment Areas', items: ['Infrastructure health and performance', 'Security posture and vulnerability assessment', 'Compliance readiness evaluation', 'Cloud readiness and optimization opportunities', 'IT process and workflow analysis', 'Total cost of ownership analysis'] }
  ]},
  { file: 'technology-budgeting.html', title: 'Technology Budgeting & Planning', category: 'IT Strategy & Leadership', hero: 'Technology Budgeting & Planning', subtitle: 'Align IT spending with business priorities and eliminate budget surprises.', sections: [
    { heading: 'Strategic Budgeting', text: 'We help you plan IT investments that drive business value — with clear forecasting, ROI analysis, and priority alignment.' },
    { heading: 'What We Deliver', items: ['Annual IT budget planning and forecasting', 'License and subscription optimization', 'Capital vs. operational expense planning', 'Technology refresh lifecycle management', 'Vendor cost negotiation'] }
  ]},
  { file: 'vendor-management.html', title: 'Vendor Management', category: 'IT Strategy & Leadership', hero: 'Vendor Management', subtitle: 'We manage your technology vendors so you don\'t have to — saving you time, money, and frustration.', sections: [
    { heading: 'One Point of Contact', text: 'Stop chasing vendors. We manage all your technology vendor relationships, from ISPs to SaaS providers, acting as your single point of contact.' },
    { heading: 'What We Handle', items: ['Vendor selection and evaluation', 'Contract negotiation and renewal', 'Issue escalation and resolution', 'Performance monitoring and SLA tracking', 'License and subscription management'] }
  ]},

  // Services - AI & Automation
  { file: 'ai-workflow-automation.html', title: 'AI Workflow Automation', category: 'AI & Automation', hero: 'AI Workflow Automation', subtitle: 'Smarter workflows that reduce manual effort and boost productivity across your organization.', sections: [
    { heading: 'Intelligent Automation', text: 'We identify repetitive processes in your organization and implement AI-powered automation that saves time, reduces errors, and lets your team focus on high-value work.' },
    { heading: 'What We Automate', items: ['Document processing and data extraction', 'Approval workflows and routing', 'Report generation and distribution', 'Data synchronization between systems', 'Customer communication workflows'] },
    { heading: 'Impact', stats: [{ value: '40%', label: 'Time saved on manual tasks' }, { value: '90%', label: 'Reduction in errors' }, { value: '2x', label: 'Process throughput' }] }
  ]},
  { file: 'ai-knowledgebase.html', title: 'AI Knowledgebase Agent', category: 'AI & Automation', hero: 'AI Knowledgebase Agent', subtitle: 'An AI assistant trained on your company knowledge that answers questions and solves problems instantly.', sections: [
    { heading: 'Your Company\'s AI Expert', text: 'We build and deploy an AI agent trained on your internal documentation, processes, and policies — giving your team instant answers to common questions.' },
    { heading: 'Capabilities', items: ['Trained on your internal documentation and SOPs', 'Natural language Q&A for employees', 'Integration with Slack, Teams, and email', 'Escalation to human experts when needed', 'Continuous learning from new content'] }
  ]},
  { file: 'automated-onboarding.html', title: 'Automated Onboarding & Offboarding', category: 'AI & Automation', hero: 'Automated Onboarding & Offboarding', subtitle: 'Streamline employee lifecycle management with automated provisioning and deprovisioning.', sections: [
    { heading: 'Day One Ready', text: 'New hires get accounts, devices, and access on day one. Departing employees are fully deprovisioned within minutes. No manual checklists, no missed steps.' },
    { heading: 'What\'s Automated', items: ['Account creation across all platforms', 'Device provisioning and configuration', 'Access permissions based on role', 'Welcome emails and training materials', 'Offboarding: account deactivation, data backup, device recovery'] }
  ]},
  { file: 'automated-compliance-reports.html', title: 'Automated Compliance Reports', category: 'AI & Automation', hero: 'Automated Compliance Reports', subtitle: 'Generate audit-ready compliance reports automatically — no more manual data gathering.', sections: [
    { heading: 'Always Audit-Ready', text: 'We automate the collection, formatting, and delivery of compliance evidence and reports for frameworks like SOC 2, HIPAA, and more.' },
    { heading: 'What\'s Included', items: ['Automated evidence collection from your systems', 'Pre-formatted reports aligned to compliance frameworks', 'Scheduled report generation and distribution', 'Gap identification and remediation tracking', 'Audit trail and change documentation'] }
  ]},
  { file: 'ai-ticketing.html', title: 'AI for Ticketing & Support', category: 'AI & Automation', hero: 'AI for Ticketing & Support', subtitle: 'Intelligent ticket routing, auto-resolution, and support insights powered by AI.', sections: [
    { heading: 'Smarter Support', text: 'Our AI-powered ticketing system automatically categorizes, prioritizes, and routes tickets — and resolves common issues without human intervention.' },
    { heading: 'Capabilities', items: ['Automatic ticket categorization and prioritization', 'AI-powered first response and resolution', 'Smart routing to the right engineer', 'Pattern detection for recurring issues', 'Self-service resolution suggestions'] },
    { heading: 'Results', stats: [{ value: '50%', label: 'Ticket reduction' }, { value: '<1min', label: 'Auto-response time' }, { value: '30%', label: 'Auto-resolved tickets' }] }
  ]},
  { file: 'repetitive-task-automation.html', title: 'Repetitive Task Automation', category: 'AI & Automation', hero: 'Repetitive Task Automation', subtitle: 'Eliminate tedious manual IT tasks with proven automation workflows.', sections: [
    { heading: 'Stop Wasting Time', text: 'We identify and automate the repetitive tasks that eat up your IT team\'s time — from password resets to patch deployments.' },
    { heading: 'Common Automations', items: ['Password resets and account unlocks', 'Patch management and system updates', 'Backup monitoring and alerting', 'User access reviews and cleanup', 'Report generation and distribution'] }
  ]},

  // Industries
  { file: 'finance-accounting.html', title: 'Finance & Accounting', category: 'Industries', hero: 'IT Solutions for Finance & Accounting', subtitle: 'Protect sensitive financial data, ensure regulatory compliance, and keep your team productive with IT built for financial services.', sections: [
    { heading: 'Built for Financial Services', text: 'Financial firms handle some of the most sensitive data in any industry. We understand the unique compliance, security, and uptime requirements you face.' },
    { heading: 'Why Finance Firms Choose Us', items: ['SOC 2, PCI DSS, and NYDFS 500 compliance support', 'Secure remote access for distributed teams', 'Encrypted communications and data protection', 'Business continuity and disaster recovery', '24/7 monitoring and rapid incident response'] }
  ]},
  { file: 'marketing-agencies.html', title: 'Marketing & Creative Agencies', category: 'Industries', hero: 'IT Solutions for Marketing & Creative Agencies', subtitle: 'Fast, reliable IT that keeps creative teams moving — with cloud collaboration, secure file sharing, and always-on support.', sections: [
    { heading: 'IT That Moves at Creative Speed', text: 'Agencies need IT that\'s fast, flexible, and never in the way. We provide the infrastructure and support that lets your creative team focus on their best work.' },
    { heading: 'What We Provide', items: ['Cloud storage optimization and collaboration tools', 'Mac and PC support for creative workstations', 'Secure client data handling and NDAs', 'Fast onboarding for freelancers and contractors', 'Scalable infrastructure for campaign spikes'] }
  ]},
  { file: 'professional-services.html', title: 'Professional Services', category: 'Industries', hero: 'IT Solutions for Professional Services', subtitle: 'Reliable, secure IT for law firms, consulting firms, and professional service organizations.', sections: [
    { heading: 'Built for Professional Firms', text: 'Professional services firms rely on trust, confidentiality, and uptime. We deliver IT that protects client data and keeps billable teams productive.' },
    { heading: 'Our Focus', items: ['Client data confidentiality and encryption', 'Compliance with industry regulations', 'Secure remote access for distributed teams', 'Document management system integration', 'Business email security and continuity'] }
  ]},
  { file: 'healthcare.html', title: 'Healthcare & Life Sciences', category: 'Industries', hero: 'IT Solutions for Healthcare & Life Sciences', subtitle: 'HIPAA-compliant IT infrastructure, security, and support designed for healthcare organizations.', sections: [
    { heading: 'Healthcare IT Expertise', text: 'We understand the unique challenges of healthcare IT — from HIPAA compliance to EHR integration to protecting patient data.' },
    { heading: 'What We Deliver', items: ['HIPAA compliance implementation and monitoring', 'EHR/EMR system integration support', 'Secure telehealth infrastructure', 'Medical device network security', 'Staff security awareness training', 'Disaster recovery for clinical systems'] }
  ]},
  { file: 'construction.html', title: 'Construction & Real Estate', category: 'Industries', hero: 'IT Solutions for Construction & Real Estate', subtitle: 'Mobile-friendly, rugged IT solutions for teams that work in the field and the office.', sections: [
    { heading: 'IT for the Field', text: 'Construction and real estate teams need IT that works on job sites, in the office, and everywhere in between.' },
    { heading: 'What We Provide', items: ['Mobile device management for field teams', 'Cloud-based project management integration', 'Secure file sharing for blueprints and documents', 'Rugged device procurement and support', 'Multi-site networking and connectivity'] }
  ]},
  { file: 'transportation.html', title: 'Transportation', category: 'Industries', hero: 'IT Solutions for Transportation', subtitle: 'Keep your fleet connected and your operations running with reliable, secure IT infrastructure.', sections: [
    { heading: 'Connected Operations', text: 'Transportation companies need always-on systems, secure communications, and reliable infrastructure across distributed locations.' },
    { heading: 'Our Solutions', items: ['Fleet management system integration', 'Multi-location network management', 'Secure communications infrastructure', 'Compliance support for industry regulations', 'Mobile workforce enablement'] }
  ]},
  { file: 'telecommunications.html', title: 'Telecommunications', category: 'Industries', hero: 'IT Solutions for Telecommunications', subtitle: 'Enterprise IT management and security for telecom companies that demand uptime and performance.', sections: [
    { heading: 'Telecom-Grade IT', text: 'We deliver IT infrastructure and security that meets the demanding requirements of telecommunications companies.' },
    { heading: 'What We Offer', items: ['High-availability infrastructure management', 'Network performance monitoring and optimization', 'Security and compliance for customer data', 'Cloud infrastructure and hybrid solutions', 'Scalable support for growing operations'] }
  ]},

  // Company
  { file: 'about.html', title: 'About Us', category: 'Company', hero: 'About Intelligent iT', subtitle: 'We\'re a team of IT professionals passionate about keeping businesses secure, productive, and growing. Based in New York City with offices in Boston and San Diego.', sections: [
    { heading: 'Our Mission', text: 'To deliver outsourced IT consulting for organizations that rely on secure, dependable systems. Our strategic, proactive approach keeps your infrastructure resilient and your team focused on growth.' },
    { heading: 'Who We Are', text: 'Intelligent iT is a managed IT services and cybersecurity provider serving growing organizations across the United States. We combine enterprise-grade technology with hands-on, personalized service.' },
    { heading: 'Why We\'re Different', items: ['Real engineers, not scripts — every interaction is with a qualified technician', '24/7/365 monitoring and support with under 5-minute response times', 'Fixed monthly pricing — no surprise invoices, no hidden fees', 'Strategic IT leadership through our Fractional CIO/CTO services', 'Industry-specific expertise across healthcare, finance, legal, and more'] }
  ]},
  { file: 'leadership.html', title: 'Leadership', category: 'Company', hero: 'Our Leadership Team', subtitle: 'Meet the people driving Intelligent iT\'s mission to deliver exceptional IT and cybersecurity services.', sections: [
    { heading: 'Leadership', text: 'Our leadership team brings decades of combined experience in IT services, cybersecurity, and business strategy. We\'re committed to building lasting partnerships with our clients.' }
  ]},
  { file: 'careers.html', title: 'Careers', category: 'Company', hero: 'Careers at Intelligent iT', subtitle: 'Join a team that\'s passionate about technology, security, and making a real difference for our clients.', sections: [
    { heading: 'Why Work With Us', text: 'We\'re growing fast and looking for talented engineers, analysts, and consultants who want to do meaningful work in a collaborative environment.' },
    { heading: 'What We Offer', items: ['Competitive salary and benefits', 'Remote and hybrid work options', 'Ongoing training and certification support', 'Exposure to diverse industries and technologies', 'A collaborative, supportive team culture'] },
    { heading: 'Open Positions', text: 'Check back regularly for new openings, or send your resume to careers@intelligentitnyc.com.' }
  ]},
  { file: 'locations.html', title: 'Locations', category: 'Company', hero: 'Our Locations', subtitle: 'Nationwide support with local presence. Headquartered in New York City with offices in Boston and San Diego.', sections: [
    { heading: 'New York City (Headquarters)', text: '📍 Midtown Manhattan, New York, NY\n📞 212-730-1844\n📧 sales@intelligentitnyc.com' },
    { heading: 'Boston', text: '📍 Boston, MA\nServing the greater New England region.' },
    { heading: 'San Diego', text: '📍 San Diego, CA\nServing Southern California and the West Coast.' },
    { heading: 'Nationwide Coverage', text: 'While we have physical offices in three cities, we provide remote IT support and management to organizations across the United States.' }
  ]},
  { file: 'why-clients-choose-us.html', title: 'Why Clients Choose Us', category: 'Company', hero: 'Why Clients Choose Intelligent iT', subtitle: 'Real results, real relationships, real engineers. Here\'s what sets us apart.', sections: [
    { heading: 'What Makes Us Different', items: ['Real engineers on every call — no bots, no scripts, no runarounds', 'Under 5-minute average first response time', 'Fixed monthly pricing with no surprises', 'Industry-specific expertise and compliance support', 'Strategic IT leadership, not just break-fix support'] },
    { heading: 'What Our Clients Say', text: '"The switch to Intelligent iT made a huge difference. I would recommend Intelligent iT any time." — Thoman Oommen, Control Solutions Group' },
    { heading: 'By the Numbers', stats: [{ value: '10,000+', label: 'Tickets resolved' }, { value: '<5min', label: 'Avg. response time' }, { value: '8,760+', label: 'Monitoring hours/year' }] }
  ]},

  // Insights
  { file: 'blog.html', title: 'Blog', category: 'Insights', hero: 'Intelligent iT Blog', subtitle: 'Expert insights on cybersecurity, IT strategy, compliance, and technology trends for growing businesses.', sections: [
    { heading: 'Latest Articles', text: 'Stay informed with our latest thinking on IT security, cloud strategy, compliance, and more.' }
  ]},
  { file: 'guides.html', title: 'Guides & Playbooks', category: 'Insights', hero: 'Guides & Playbooks', subtitle: 'Practical, actionable resources to help you strengthen your IT and security posture.', sections: [
    { heading: 'Resources', text: 'Download our guides covering cybersecurity best practices, compliance checklists, IT budgeting templates, and more.' }
  ]},
  { file: 'case-studies.html', title: 'Case Studies', category: 'Insights', hero: 'Case Studies', subtitle: 'See how organizations like yours achieved real results with Intelligent iT.', sections: [
    { heading: 'Client Success Stories', text: 'Read about the challenges our clients faced and how we helped them achieve measurable business outcomes.' }
  ]},
  { file: 'webinars.html', title: 'Webinars', category: 'Insights', hero: 'Webinars', subtitle: 'Live and on-demand sessions covering cybersecurity, compliance, IT strategy, and emerging technology.', sections: [
    { heading: 'Upcoming & On-Demand', text: 'Join our experts for in-depth sessions on the topics that matter most to growing organizations.' }
  ]},
  { file: 'overview-video.html', title: '90-Second Overview Video', category: 'Insights', hero: 'See What Intelligent iT Can Do — In 90 Seconds', subtitle: 'A quick overview of our managed IT, cybersecurity, and AI-powered services.', sections: [
    { heading: '', text: '' }
  ]},
  { file: 'resource-library.html', title: 'Resource Library', category: 'Insights', hero: 'Resource Library', subtitle: 'Explore our complete collection of guides, templates, checklists, and tools.', sections: [
    { heading: 'All Resources', text: 'Browse our library of practical resources designed to help you make informed IT and security decisions.' }
  ]},

  // Legal
  { file: 'privacy.html', title: 'Privacy Policy', category: 'Legal', hero: 'Privacy Policy', subtitle: 'How Intelligent iT collects, uses, and protects your information.', sections: [
    { heading: 'Overview', text: 'Your privacy is important to us. This policy describes how we collect and handle your personal information when you use our services or visit our website.' }
  ]},
  { file: 'terms.html', title: 'Terms and Conditions', category: 'Legal', hero: 'Terms and Conditions', subtitle: 'Terms governing your use of Intelligent iT services and website.', sections: [
    { heading: 'Overview', text: 'These terms and conditions govern your use of the Intelligent iT website and services. By using our services, you agree to these terms.' }
  ]},
];

function generatePage(page) {
  let sectionsHtml = '';
  for (const section of page.sections) {
    if (!section.heading && !section.text) continue;
    sectionsHtml += `\n      <div class="page-section animate-on-scroll">\n`;
    if (section.heading) sectionsHtml += `        <h2>${section.heading}</h2>\n`;
    if (section.text) sectionsHtml += `        <p>${section.text}</p>\n`;
    if (section.items) {
      sectionsHtml += `        <ul class="page-list">\n`;
      for (const item of section.items) {
        sectionsHtml += `          <li>${item}</li>\n`;
      }
      sectionsHtml += `        </ul>\n`;
    }
    if (section.stats) {
      sectionsHtml += `        <div class="page-stats">\n`;
      for (const stat of section.stats) {
        sectionsHtml += `          <div class="page-stat"><span class="page-stat__value">${stat.value}</span><span class="page-stat__label">${stat.label}</span></div>\n`;
      }
      sectionsHtml += `        </div>\n`;
    }
    sectionsHtml += `      </div>\n`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title} | Intelligent iT</title>
  <meta name="description" content="${page.subtitle}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="pages.css">
  <link rel="icon" href="../assets/logo.png" type="image/png">
</head>
<body>
  <header class="header" id="site-header"></header>

  <section class="page-hero">
    <div class="page-hero__bg"></div>
    <div class="container page-hero__inner">
      <span class="page-hero__breadcrumb"><a href="../index.html">Home</a> / <a href="#">${page.category}</a> / ${page.title}</span>
      <h1>${page.hero}</h1>
      <p>${page.subtitle}</p>
      <a href="locations.html" class="btn btn--teal btn--lg">Get Started</a>
    </div>
  </section>

  <main class="page-content">
    <div class="container">
${sectionsHtml}
      <div class="page-cta">
        <h2>Ready to get started?</h2>
        <p>Book a free IT strategy session and see how Intelligent iT can help your organization.</p>
        <a href="locations.html" class="btn btn--teal btn--lg">Contact Us Today</a>
      </div>
    </div>
  </main>

  <footer class="footer" id="site-footer"></footer>

  <script src="template.js"></script>
</body>
</html>`;
}

// Generate all pages
const pagesDir = path.join(__dirname);
let count = 0;
for (const page of pages) {
  const html = generatePage(page);
  fs.writeFileSync(path.join(pagesDir, page.file), html, 'utf8');
  count++;
}
console.log(`Generated ${count} pages.`);
