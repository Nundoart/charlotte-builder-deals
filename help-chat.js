(() => {
  const button = document.createElement('button');
  button.id = 'help-launch'; button.textContent = 'Questions? Chat here';
  button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', 'help-panel');
  const panel = document.createElement('section');
  panel.id = 'help-panel'; panel.hidden = true; panel.setAttribute('aria-label', 'Charlotte Builder Deals help');
  panel.innerHTML = `<header><div><strong>Charlotte homebuying guide</strong><small>Answers from this site’s published research</small></div><button id="help-close" aria-label="Close chat">×</button></header><div id="help-messages" role="log" aria-live="polite" aria-relevant="additions"></div><div class="help-quick"><button data-question="Show me current offers">Offers</button><button data-question="What is APR?">Rate vs APR</button><button data-question="I would like someone to reach out">Request follow-up</button></div><form id="help-form"><label class="sr-only" for="help-input">Your question</label><input id="help-input" maxlength="500" placeholder="Ask about a builder or offer…" autocomplete="off"><button type="submit">Send</button></form><p class="help-note">Please avoid sharing financial or sensitive information. This guide does not send your questions to an agent.</p>`;
  document.body.append(button, panel);
  const log = panel.querySelector('#help-messages'), input = panel.querySelector('#help-input');
  let confirmationPending = false;
  const date = x => x || 'not stated';
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  function message(text, user = false, links = []) {
    const row = document.createElement('div'); row.className = user ? 'help-message user' : 'help-message';
    const p = document.createElement('p'); p.textContent = text; row.append(p);
    links.forEach(({ url, label }) => { const a = document.createElement('a'); a.href = url; a.textContent = label; if (url.startsWith('https://')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } row.append(a); });
    log.append(row); log.scrollTop = log.scrollHeight;
  }
  function emailHandoff() {
    confirmationPending = false;
    message('Great—please email Blake at linebergerm01@gmail.com and let him know you would like someone to reach out. Include the builder or community you’re interested in, your preferred contact method, and a good time to connect. Your email app will open a draft; you’ll need to send it.', false, [{ url: 'mailto:linebergerm01@gmail.com?subject=Charlotte%20Builder%20Deals%20%E2%80%94%20Please%20reach%20out&body=Hi%20Blake%2C%0A%0AI%20am%20interested%20in%20a%20new%20home%20and%20would%20like%20you%20to%20reach%20out.%0ABuilder%20or%20community%3A%20%0APreferred%20contact%20method%3A%20%0ABest%20time%20to%20connect%3A%20%0A%0AThank%20you!', label: 'Email Blake: linebergerm01@gmail.com' }]);
  }
  function respond(raw) {
    const text = raw.trim(); if (!text) return;
    message(text, true);
    const q = text.toLowerCase();
    if (confirmationPending && /^(yes|yep|yeah|absolutely|please do|i confirm|confirmed|sure|correct)\b/.test(q)) { emailHandoff(); return; }
    if (confirmationPending && /^(no|not yet|cancel|just browsing)\b/.test(q)) { confirmationPending = false; message('Of course. Which builder, community, or financing term can I help you explore?'); return; }
    if (/reach out|contact me|call me|follow.?up|talk to (someone|an agent|blake)|speak (to|with)|ready to buy|very interested|email blake/.test(q)) {
      confirmationPending = true;
      message('Are you actively interested in buying a home and confirming that you would like Blake to reach out? Reply “yes” to get the email link, or “not yet” to keep exploring.'); return;
    }
    confirmationPending = false;
    if (/\bapr\b/.test(q)) { message('The interest rate is the rate used to calculate interest on the loan. APR also reflects certain loan costs, so it helps compare borrowing costs. Compare offers with the same loan type and term, and read the full lender disclosure. An ARM’s initial rate can change later.', false, [{url:'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/',label:'CFPB: interest rate vs. APR'}]); return; }
    if (/\barm\b|adjustable/.test(q)) { message('An adjustable-rate mortgage starts with an initial rate period and can adjust afterward. A 5/1 ARM generally fixes the rate for five years, then adjusts annually; a 7/6 ARM generally fixes it for seven years, then adjusts every six months. Confirm the index, margin, adjustment caps and APR in the lender’s offer.'); return; }
    if (/buydown|2\/1|2-1/.test(q)) { message('A temporary 2/1 buydown subsidizes payments using a rate two percentage points below the note rate in year one, one point below in year two, and the full note rate afterward. The note rate itself does not change. Ask the lender for all three payments and qualification terms.'); return; }
    if (/qualif|credit score|approved|down payment/.test(q)) { message('Eligibility varies by lender and home. Each offer’s detail view lists any published credit, down-payment and lender requirements; missing terms need confirmation. This guide cannot approve a loan. Which builder are you considering?'); return; }
    if (/payment|afford|calculator/.test(q)) { message('Use the home-price, down-payment and interest-rate calculator on this page for a 30-year estimate. It includes your taxes and insurance input, but excludes HOA, mortgage insurance and upfront fees. An adjustable or temporary rate may increase later.', false, [{url:'#payment',label:'Go to the payment estimate'}]); return; }
    if (/save|compare|shortlist/.test(q)) { message('Choose “Add to compare” on up to three cards, then open the comparison button. Use “Save this deal” inside a detail panel to keep a shortlist on this device. A saved deal is not a reservation.'); return; }
    if (/daily|refresh|updat/.test(q)) { message('The daily research collector is scheduled each morning around 8 a.m. Eastern. Completed findings have checked dates, source links and evidence labels. New research appears in Daily Review; the main offers change after review.', false, [{url:'/daily-review.html',label:'Open Daily Review'}]); return; }
    const entries = typeof deals !== 'undefined' ? deals : [];
    const wanted = normalize(q);
    const aliases = {'drhorton':'D.R. Horton','drb':'DRB Homes','mi':'M/I Homes','weekley':'David Weekley Homes','true':'True Homes','smithdouglas':'Smith Douglas Homes','mattamy':'Mattamy Homes','pulte':'Pulte Homes','lennar':'Lennar','meritage':'Meritage Homes','eastwood':'Eastwood Homes'};
    const named = Object.entries(aliases).filter(([alias]) => alias === 'mi' ? /\bm\/?i\b/i.test(q) : wanted.includes(alias)).map(([,name])=>name);
    let selected = entries.filter(d => named.includes(d.b) || (wanted.length > 3 && normalize(d.c).includes(wanted)) || (q.includes('edgewater') && d.c.toLowerCase().includes('edgewater')));
    if (!selected.length && /offer|incentive|deal|closing cost|rate|builder/.test(q)) selected = entries.filter(d => d.kind === 'official' && !(typeof isExpired === 'function' && isExpired(d)));
    if (selected.length) {
      selected.slice(0,4).forEach(d => {
        const expired = typeof isExpired === 'function' && isExpired(d);
        const status = expired ? 'EXPIRED' : d.kind === 'official' ? 'Builder advertisement reviewed' : 'Unconfirmed report / excerpt';
        message(`${d.b} — ${d.c}\n${status}: ${d.offer}\n${d.terms}\nAPR: ${d.apr ? d.apr+'%' : 'not stated'}. Loan: ${d.loan}.\nDeadline: ${date(d.end)}. Checked: ${d.checked}.\nConfirm current availability and complete terms with the builder.`, false, [{url:d.source,label:'Read the original source'}]);
      });
      if (selected.length > 4) message('There are more matching entries on the page. Ask about a specific builder to narrow the results.');
      return;
    }
    message('I can explain listed builder offers, APR, adjustable rates, buydowns, the calculator and comparison tools. I don’t have verified information to answer that question specifically. Try a builder name, or choose “Request follow-up” if you’d like personal help.');
  }
  function close() { panel.hidden = true; button.setAttribute('aria-expanded', 'false'); button.focus(); }
  button.onclick = () => { panel.hidden = !panel.hidden; button.setAttribute('aria-expanded', String(!panel.hidden)); if (!panel.hidden) input.focus(); };
  panel.querySelector('#help-close').onclick = close;
  panel.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  panel.querySelector('#help-form').onsubmit = e => { e.preventDefault(); const value=input.value; input.value=''; respond(value); input.focus(); };
  panel.querySelectorAll('[data-question]').forEach(b => b.onclick = () => respond(b.dataset.question));
  message('Hi! Ask me about the listed builder offers, financing terms, or how to compare deals. If you’re ready for personal help, I can show you how to contact Blake.');
})();
