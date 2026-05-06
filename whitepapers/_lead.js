// Shared HubSpot lead-capture handler for white papers.
// Portal ID is the same one in the existing tracking script (242795522).
// Form ID needs to be created in HubSpot dashboard once and pasted below.
// Until set, falls back to mailto so leads never get lost.

const HUBSPOT_PORTAL_ID = '242795522';
const HUBSPOT_FORM_ID = ''; // TODO: paste form GUID from HubSpot dashboard

async function submitLead(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const fields = [
    { objectTypeId: '0-1', name: 'email', value: data.get('email') },
    { objectTypeId: '0-1', name: 'company', value: data.get('company') },
    { objectTypeId: '0-1', name: 'topic_interest', value: data.get('topic_interest') },
    { objectTypeId: '0-1', name: 'message', value: data.get('message') || '' },
    { objectTypeId: '0-1', name: 'source_page', value: data.get('source_page') || 'whitepaper' }
  ];

  const subject = encodeURIComponent('AI strategy call — ' + (data.get('topic_interest') || ''));
  const body = encodeURIComponent('Email: ' + data.get('email') + '\nCompany: ' + data.get('company') + '\nFrom: ' + (data.get('source_page') || 'whitepaper') + '\n\n' + (data.get('message') || ''));
  const mailtoFallback = `mailto:sales@intelligentitnyc.com?subject=${subject}&body=${body}`;

  if (HUBSPOT_FORM_ID) {
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context: { pageUri: window.location.href, pageName: document.title } })
      });
      if (!res.ok) throw new Error('HubSpot rejected: ' + res.status);
    } catch (err) {
      console.error('HubSpot submit failed', err);
      window.location.href = mailtoFallback;
      return false;
    }
  } else {
    window.location.href = mailtoFallback;
    return false;
  }

  const wrap = form.closest('.wp-lead-card');
  if (wrap) wrap.classList.add('is-submitted');
  return false;
}
