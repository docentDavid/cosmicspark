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

    // Validatie met Nederlandse meldingen onder elk veld. Zonder JavaScript
    // valt het formulier terug op de standaardcontrole van de browser.
    form.noValidate = true;
    const fields = [...form.querySelectorAll('.field input, .field textarea')];
    const messageFor = field => {
      const value = field.value.trim();
      if (field.required && value === '') {
        return { naam: 'Vul je naam in.', email: 'Vul je e-mailadres in.', bericht: 'Schrijf een bericht.' }[field.id] || 'Vul dit veld in.';
      }
      if (value === '') return '';
      // minlength wordt door browsers alleen na typen gecontroleerd, daarom hier zelf.
      if (field.minLength > 0 && value.length < field.minLength) {
        return field.id === 'bericht'
          ? `Je bericht is te kort: gebruik minimaal ${field.minLength} tekens.`
          : `Gebruik minimaal ${field.minLength} tekens.`;
      }
      if (field.validity.valid) return '';
      if (field.id === 'naam') return 'Vul je naam in (minimaal 2 tekens).';
      if (field.id === 'email') return 'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.nl.';
      if (field.id === 'telefoon') return 'Vul een geldig telefoonnummer in (8 tot 20 tekens: cijfers, spaties, streepjes, haakjes en eventueel een + aan het begin), of laat het veld leeg.';
      return field.validationMessage;
    };
    const checkField = field => {
      const message = messageFor(field);
      const error = document.getElementById(field.getAttribute('aria-describedby'));
      if (error) error.textContent = message;
      if (message) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
      return !message;
    };
    fields.forEach(field => {
      // Pas na het verlaten van een veld controleren; daarna live bijwerken zolang het fout is.
      field.addEventListener('blur', () => { if (field.value !== '') checkField(field); });
      field.addEventListener('input', () => { if (field.hasAttribute('aria-invalid')) checkField(field); });
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const invalid = fields.filter(field => !checkField(field));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      if (!data.access_key || data.access_key.startsWith('VUL-')) {
        showStatus('Je bericht is niet verzonden: het formulier is nog niet gekoppeld aan een e-mailadres.', 'error');
        return;
      }

      delete data.redirect; // alleen bedoeld voor verzenden zonder JavaScript
      // Lege optionele velden weglaten, zodat de mail alleen ingevulde gegevens toont.
      Object.keys(data).forEach(key => {
        if (typeof data[key] !== 'string') return;
        data[key] = data[key].trim();
        if (data[key] === '') delete data[key];
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