const contactButton = document.querySelector('.contact-button');
contactButton.addEventListener('click', () => {
  const username = document.documentElement.dataset.telegram;
  if (username) window.open(`https://t.me/${username.replace('@','')}`, '_blank', 'noopener');
  else document.querySelector('#contact-note').textContent = '������ ��������� ��࠭��� - ���⠪� ᥩ�� ������砥���.';
});

