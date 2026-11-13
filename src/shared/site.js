(() => {
  'use strict';
  document.querySelectorAll('[data-menu-toggle]').forEach(button => {
    const nav = document.getElementById(button.getAttribute('aria-controls'));
    if (!nav) return;
    const close = () => {button.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open');};
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => {if (event.target.closest('a')) close();});
    document.addEventListener('keydown', event => {if (event.key === 'Escape' && nav.classList.contains('is-open')) {close(); button.focus();}});
  });
  const download = (text, title) => {
    const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url;
    link.download = `${title.replace(/[^a-zа-яё0-9_-]+/gi, '-').toLowerCase()}.txt`;
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  };
  document.querySelectorAll('form[data-local-form]').forEach(form => {
    let summary = '';
    const title = form.dataset.title || 'Заявка';
    const status = form.querySelector('[data-form-status]');
    const result = form.querySelector('[data-form-result]');
    const output = form.querySelector('[data-form-text]');
    form.addEventListener('submit', event => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const fields = Array.from(form.elements).filter(field => field.name && !field.disabled && !['submit','button'].includes(field.type) && (!['checkbox','radio'].includes(field.type) || field.checked));
      summary = title + '\n\n' + fields.map(field => {
        const label = field.dataset.label || Array.from(field.labels?.[0]?.childNodes || []).filter(node => node.nodeType === 3).map(node => node.textContent).join('').trim() || field.name;
        const value = field.tagName === 'SELECT' ? field.selectedOptions[0]?.textContent : field.value;
        return `${label}: ${value || 'Не указано'}`;
      }).join('\n');
      if (output) output.value = summary;
      if (result) result.hidden = false;
      const email = window.OFFSET_CONFIG?.email;
      const sendLink = form.querySelector('[data-send]');
      if (sendLink && email) {sendLink.href = `mailto:${email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(summary)}`;sendLink.hidden = false;}
      if (status) status.textContent = form.hasAttribute('data-offset-brief') ? `Бриф готов. Откройте письмо или скопируйте текст${email ? ' и отправьте на '+email : ''}.` : 'Заявка подготовлена. Это демо: данные не отправлены. Сохраните или скопируйте текст.';
      output?.focus();
    });
    form.querySelector('[data-download]')?.addEventListener('click', () => {if (summary) download(summary, title);});
    form.querySelector('[data-copy]')?.addEventListener('click', async () => {
      try {await navigator.clipboard.writeText(summary); if (status) status.textContent = 'Текст скопирован.';}
      catch {output?.focus(); output?.select(); if (status) status.textContent = 'Текст выделен. Нажмите Ctrl+C или удерживайте текст для копирования.';}
    });
  });
  document.querySelectorAll('input[type="date"][data-future]').forEach(input => {
    const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());input.min = now.toISOString().slice(0,10);
  });
})();
