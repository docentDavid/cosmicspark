(() => {
  'use strict';

  const doc = document.documentElement;
  const themeButtons = document.querySelectorAll('.theme-toggle');
  const storedTheme = localStorage.getItem('cosmic-theme');

  if (storedTheme === 'dark' || storedTheme === 'light') {
    doc.dataset.theme = storedTheme;
  }

  const syncThemeButtons = () => {
    const isDark = doc.dataset.theme === 'dark';
    themeButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(isDark));
    });
  };

  syncThemeButtons();
  // Deze knoppen werken alleen met JavaScript; zonder script blijven ze verborgen.
  document.querySelectorAll('.theme-toggle, .filter-bar').forEach(el => { el.hidden = false; });
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextTheme = doc.dataset.theme === 'dark' ? 'light' : 'dark';
      doc.dataset.theme = nextTheme;
      localStorage.setItem('cosmic-theme', nextTheme);
      syncThemeButtons();
    });
  });

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-dock]').forEach(link => {
    if (link.dataset.dock === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let count = 0;

      filters.forEach(option => {
        const isActive = option === button;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach(card => {
        card.hidden = filter !== 'alles' && card.dataset.category !== filter;
        if (!card.hidden) count += 1;
      });

      const status = document.querySelector('.results-status');
      if (status) {
        status.textContent = `${count} ${count === 1 ? 'mogelijkheid' : 'mogelijkheden'}`;
      }
    });
  });

  const serviceSelect = document.getElementById('dienst');
  if (serviceSelect) {
    const requestedService = new URLSearchParams(location.search).get('dienst');
    if (requestedService && [...serviceSelect.options].some(option => option.value === requestedService)) {
      serviceSelect.value = requestedService;
    }
  }

  // Contactformulier: verstuurt via Web3Forms zonder de pagina te verlaten.
  // Zonder JavaScript verstuurt het formulier gewoon via action/method.
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('contact-submit');
  const formStatus = document.getElementById('form-status');

  if (form && submitButton && formStatus) {
    const showStatus = (message, state) => {
      formStatus.textContent = message;
      formStatus.dataset.state = state;
      if (state !== 'busy') formStatus.focus();
    };

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = Object.fromEntries(new FormData(form));
      if (!data.access_key || data.access_key.startsWith('VUL-')) {
        showStatus('Je bericht is niet verzonden: het formulier is nog niet gekoppeld aan een e-mailadres.', 'error');
        return;
      }

      delete data.redirect; // alleen bedoeld voor verzenden zonder JavaScript
      // Lege optionele velden weglaten, zodat de mail alleen ingevulde gegevens toont.
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string' && data[key].trim() === '') delete data[key];
      });
      data.subject = `Nieuw bericht van ${data.Naam}` + (data.Onderwerp ? ` over ${data.Onderwerp}` : '') + ' (Cosmic Spark)';

      submitButton.disabled = true;
      showStatus('Bezig met verzenden…', 'busy');

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
          signal: controller.signal
        });
        const result = await response.json().catch(() => ({}));
        if (response.ok && result.success) {
          form.reset();
          showStatus('Dank je wel! Je bericht is verzonden naar Kim.', 'success');
        } else {
          showStatus('Je bericht is niet verzonden. Probeer het over een paar minuten opnieuw.', 'error');
        }
      } catch (error) {
        showStatus('Je bericht is niet verzonden, mogelijk door een verbindingsprobleem. Controleer je internetverbinding en probeer het opnieuw.', 'error');
      } finally {
        clearTimeout(timeout);
        submitButton.disabled = false;
      }
    });
  }
})();