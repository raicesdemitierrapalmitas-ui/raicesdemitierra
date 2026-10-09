(() => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }));
  }
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const config = (typeof SITE_CONFIG === 'object' && SITE_CONFIG) ? SITE_CONFIG : {};
  const whatsapp = String(config.whatsappNumber || '').replace(/\D/g, '');
  const whatsappLink = document.getElementById('whatsapp-link');
  if (whatsappLink && whatsapp.length >= 10) {
    whatsappLink.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Hola, quiero conocer más sobre Café Raíces de Mi Tierra.')}`;
    whatsappLink.hidden = false;
  }
  const instagram = document.getElementById('instagram-link');
  if (instagram && /^https:\/\//i.test(config.instagramUrl || '')) {
    instagram.href = config.instagramUrl;
    instagram.hidden = false;
  }
  const facebook = document.getElementById('facebook-link');
  if (facebook && /^https:\/\//i.test(config.facebookUrl || '')) {
    facebook.href = config.facebookUrl;
    facebook.hidden = false;
  }
})();
