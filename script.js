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


  // Navegación robusta hacia Nuestra historia (menú y botón principal).
  // Mantiene compatibilidad con enlaces de versiones anteriores del sitio.
  const storyTarget = document.getElementById('nuestra-historia');
  if (storyTarget) {
    const storyLinks = document.querySelectorAll(
      'a[href="#nuestra-historia"], a[href="#historia"], a[href="#Nuestrahistoria"], a[href="#galeria"]'
    );
    storyLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (window.location.hash !== '#nuestra-historia') {
          try { window.history.replaceState(null, '', '#nuestra-historia'); } catch (_) { /* El desplazamiento funciona aunque el historial no se pueda actualizar. */ }
        }
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        storyTarget.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (nav && toggle) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Abrir menú');
        }
      });
    });
  }


  // Carrusel de cuatro fotografías de la finca.
  const gallery = document.querySelector('[data-gallery-carousel]');
  if (gallery) {
    const slides = Array.from(gallery.querySelectorAll('[data-gallery-slide]'));
    const dots = Array.from(gallery.querySelectorAll('[data-gallery-dot]'));
    const status = gallery.querySelector('[data-gallery-status]');
    let current = 0;
    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.hidden = !active;
        slide.classList.toggle('is-active', active);
      });
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-pressed', String(active));
      });
      if (status) status.textContent = `Imagen ${current + 1} de ${slides.length}`;
    };
    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showSlide(current - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => showSlide(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    showSlide(0);
  }

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
