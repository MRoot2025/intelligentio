// Shared header and footer loader for subpages
document.addEventListener('DOMContentLoaded', () => {
  // Load header
  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = `
    <div class="container header__inner">
      <a href="../index.html" class="header__logo">
        <img src="../assets/logo-green.png" alt="Intelligent iT" width="170" height="47">
      </a>
      <nav class="header__nav" id="mainNav">
        <div class="nav-item has-dropdown">
          <button class="nav-link">Business Outcomes <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="dropdown">
            <div class="dropdown__col">
              <a href="reduce-it-costs.html" class="dropdown__link">Reduce IT Costs</a>
              <a href="improve-security-compliance.html" class="dropdown__link">Improve Security &amp; Compliance</a>
              <a href="eliminate-downtime.html" class="dropdown__link">Eliminate Downtime</a>
              <a href="scale-your-team.html" class="dropdown__link">Scale Your Team Efficiently</a>
              <a href="distributed-workforce.html" class="dropdown__link">Support a Distributed Workforce</a>
              <a href="automate-workflows.html" class="dropdown__link">Automate Workflows &amp; Processes</a>
            </div>
          </div>
        </div>
        <div class="nav-item has-dropdown">
          <button class="nav-link">Services <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="dropdown dropdown--mega">
            <div class="dropdown__col">
              <h4 class="dropdown__heading">Managed IT Services</h4>
              <a href="helpdesk.html" class="dropdown__link">24/7 Helpdesk &amp; End-User Support</a>
              <a href="fully-managed-it.html" class="dropdown__link">Fully Managed IT</a>
              <a href="co-managed-it.html" class="dropdown__link">Co-Managed IT</a>
              <a href="hardware-procurement.html" class="dropdown__link">Hardware &amp; Software Procurement</a>
              <a href="it-projects.html" class="dropdown__link">IT Projects &amp; Migrations</a>
            </div>
            <div class="dropdown__col">
              <h4 class="dropdown__heading">Cybersecurity &amp; Compliance</h4>
              <a href="managed-soc.html" class="dropdown__link">Managed SOC (Monitoring &amp; Response)</a>
              <a href="threat-protection.html" class="dropdown__link">Threat Protection</a>
              <a href="email-security.html" class="dropdown__link">Email Security</a>
              <a href="compliance-support.html" class="dropdown__link">Compliance Support</a>
              <a href="security-awareness.html" class="dropdown__link">Security Awareness &amp; Phishing Testing</a>
            </div>
            <div class="dropdown__col">
              <h4 class="dropdown__heading">Cloud &amp; Infrastructure</h4>
              <a href="microsoft-365.html" class="dropdown__link">Microsoft 365 Management</a>
              <a href="cloud-migrations.html" class="dropdown__link">Cloud Migrations</a>
              <a href="backup-disaster-recovery.html" class="dropdown__link">Backup &amp; Disaster Recovery</a>
              <a href="network-wifi.html" class="dropdown__link">Network Architecture &amp; Wi-Fi</a>
              <a href="remote-workforce.html" class="dropdown__link">Remote Workforce Enablement</a>
            </div>
            <div class="dropdown__col">
              <h4 class="dropdown__heading">IT Strategy &amp; Leadership</h4>
              <a href="fractional-cio.html" class="dropdown__link">Fractional CIO / Fractional CTO</a>
              <a href="it-assessments.html" class="dropdown__link">IT Assessments &amp; Roadmapping</a>
              <a href="technology-budgeting.html" class="dropdown__link">Technology Budgeting &amp; Planning</a>
              <a href="vendor-management.html" class="dropdown__link">Vendor Management</a>
            </div>
            <div class="dropdown__col">
              <h4 class="dropdown__heading">AI &amp; Automation</h4>
              <a href="ai-workflow-automation.html" class="dropdown__link">AI Workflow Automation</a>
              <a href="ai-knowledgebase.html" class="dropdown__link">AI Knowledgebase Agent</a>
              <a href="automated-onboarding.html" class="dropdown__link">Automated Onboarding / Offboarding</a>
              <a href="automated-compliance-reports.html" class="dropdown__link">Automated Compliance Reports</a>
              <a href="ai-ticketing.html" class="dropdown__link">AI for Ticketing &amp; Support</a>
              <a href="repetitive-task-automation.html" class="dropdown__link">Repetitive Task Automation</a>
            </div>
          </div>
        </div>
        <div class="nav-item has-dropdown">
          <button class="nav-link">Industries <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="dropdown">
            <div class="dropdown__col">
              <a href="finance-accounting.html" class="dropdown__link">Finance &amp; Accounting</a>
              <a href="marketing-agencies.html" class="dropdown__link">Marketing &amp; Creative Agencies</a>
              <a href="professional-services.html" class="dropdown__link">Professional Services</a>
              <a href="healthcare.html" class="dropdown__link">Healthcare &amp; Life Sciences</a>
              <a href="construction.html" class="dropdown__link">Construction &amp; Real Estate</a>
              <a href="transportation.html" class="dropdown__link">Transportation</a>
              <a href="telecommunications.html" class="dropdown__link">Telecommunications</a>
            </div>
          </div>
        </div>
        <div class="nav-item has-dropdown">
          <button class="nav-link">Company <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="dropdown">
            <div class="dropdown__col">
              <a href="about.html" class="dropdown__link">About Us</a>
              <a href="leadership.html" class="dropdown__link">Leadership</a>
              <a href="careers.html" class="dropdown__link">Careers</a>
              <a href="headquarters.html" class="dropdown__link">Headquarters</a>
              <a href="why-clients-choose-us.html" class="dropdown__link">Why Clients Choose Us</a>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="servicetiers.html" class="nav-link" style="white-space: nowrap;">Service Tiers</a>
        </div>
        <div class="nav-item has-dropdown">
          <button class="nav-link">Insights <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="dropdown">
            <div class="dropdown__col">
              <a href="blog.html" class="dropdown__link">Blog</a>
              <a href="guides.html" class="dropdown__link">Guides &amp; Playbooks</a>
              <a href="case-studies.html" class="dropdown__link">Case Studies</a>
              <a href="webinars.html" class="dropdown__link">Webinars</a>
              <a href="overview-video.html" class="dropdown__link">Overview Video</a>
              <a href="resource-library.html" class="dropdown__link">Resource Library</a>
            </div>
          </div>
        </div>
      </nav>
      <div class="header__actions">
        <a href="headquarters.html?contact=true" class="btn btn--white btn--sm">Contact Us</a>
        <a href="/book/" target="_blank" rel="noopener" class="btn btn--teal btn--sm">Book a Call</a>
      </div>
      <button class="header__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;
  }

  // Load footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = `
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <img src="../assets/logo-green.png" alt="Intelligent iT" width="170" height="47">
          <div class="footer__contact">
            <a href="mailto:sales@intelligentit.io">sales@intelligentit.io</a>
            <a href="tel:18337217332">1-833-721-7332</a>
          </div>
          <div class="footer__social">
            <a href="https://www.linkedin.com/company/intelligent-it/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href="https://www.facebook.com/IntelligentiT1" target="_blank" rel="noopener" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          </div>
        </div>
        <div class="footer__services-row">
          <h4>Services</h4>
          <div class="footer__services-grid">
            <div class="footer__combined-col">
              <div class="footer__subcol">
                <h5>Managed IT Services</h5>
                <a href="helpdesk.html">24/7 Helpdesk &amp; End-User Support</a>
                <a href="fully-managed-it.html">Fully Managed IT</a>
                <a href="co-managed-it.html">Co-Managed IT</a>
                <a href="hardware-procurement.html">Hardware &amp; Software Procurement</a>
                <a href="it-projects.html">IT Projects &amp; Migrations</a>
              </div>
              <div class="footer__section-below">
                <h4>Business Outcomes</h4>
                <a href="reduce-it-costs.html">Reduce IT Costs</a>
                <a href="improve-security-compliance.html">Improve Security &amp; Compliance</a>
                <a href="eliminate-downtime.html">Eliminate Downtime</a>
                <a href="scale-your-team.html">Scale Your Team Efficiently</a>
                <a href="distributed-workforce.html">Support a Distributed Workforce</a>
                <a href="automate-workflows.html">Automate Workflows &amp; Processes</a>
              </div>
            </div>
            <div class="footer__combined-col">
              <div class="footer__subcol">
                <h5>Cybersecurity &amp; Compliance</h5>
                <a href="managed-soc.html">Managed SOC</a>
                <a href="threat-protection.html">Threat Protection</a>
                <a href="email-security.html">Email Security</a>
                <a href="compliance-support.html">Compliance Support</a>
                <a href="security-awareness.html">Security Awareness &amp; Phishing Testing</a>
              </div>
              <div class="footer__section-below">
                <h4>Industries</h4>
                <a href="finance-accounting.html">Finance &amp; Accounting</a>
                <a href="marketing-agencies.html">Marketing &amp; Creative Agencies</a>
                <a href="professional-services.html">Professional Services</a>
                <a href="healthcare.html">Healthcare &amp; Life Sciences</a>
                <a href="construction.html">Construction &amp; Real Estate</a>
                <a href="transportation.html">Transportation</a>
                <a href="telecommunications.html">Telecommunications</a>
              </div>
            </div>
            <div class="footer__combined-col">
              <div class="footer__subcol">
                <h5>Cloud &amp; Infrastructure</h5>
                <a href="microsoft-365.html">Microsoft 365 Management</a>
                <a href="cloud-migrations.html">Cloud Migrations</a>
                <a href="backup-disaster-recovery.html">Backup &amp; Disaster Recovery</a>
                <a href="network-wifi.html">Network Architecture &amp; Wi-Fi</a>
                <a href="remote-workforce.html">Remote Workforce Enablement</a>
              </div>
              <div class="footer__section-below">
                <h4>Insights</h4>
                <a href="blog.html">Blog</a>
                <a href="guides.html">Guides &amp; Playbooks</a>
                <a href="case-studies.html">Case Studies</a>
                <a href="webinars.html">Webinars</a>
                <a href="overview-video.html">Overview Video</a>
                <a href="resource-library.html">Resource Library</a>
              </div>
            </div>
            <div class="footer__combined-col">
              <div class="footer__subcol">
                <h5>IT Strategy &amp; Leadership</h5>
                <a href="fractional-cio.html">Fractional CIO / Fractional CTO</a>
                <a href="it-assessments.html">IT Assessments &amp; Roadmapping</a>
                <a href="technology-budgeting.html">Technology Budgeting &amp; Planning</a>
                <a href="vendor-management.html">Vendor Management</a>
              </div>
              <div class="footer__section-below">
                <h4>Company</h4>
                <a href="about.html">About Us</a>
                <a href="leadership.html">Leadership</a>
                <a href="careers.html">Careers</a>
                <a href="headquarters.html">Headquarters</a>
                <a href="why-clients-choose-us.html">Why Clients Choose Us</a>
              </div>
            </div>
            <div class="footer__combined-col">
              <div class="footer__subcol">
                <h5>AI &amp; Automation</h5>
                <a href="ai-workflow-automation.html">AI Workflow Automation</a>
                <a href="ai-knowledgebase.html">AI Knowledgebase Agent</a>
                <a href="automated-onboarding.html">Automated Onboarding / Offboarding</a>
                <a href="automated-compliance-reports.html">Automated Compliance Reports</a>
                <a href="ai-ticketing.html">AI for Ticketing &amp; Support</a>
                <a href="repetitive-task-automation.html">Repetitive Task Automation</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <span>Copyright 2026, Intelligent Group. All Rights Reserved.</span>
        <div class="footer__legal">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms and Conditions</a>
        </div>
      </div>
    </div>`;
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    document.querySelectorAll('.nav-item.has-dropdown .nav-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          btn.closest('.nav-item').classList.toggle('dropdown-open');
        }
      });
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
