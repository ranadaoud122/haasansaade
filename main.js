document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // REVEAL ON SCROLL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // ============================================
  // NAVBAR SCROLL SHADOW
  // ============================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // CLOSE MOBILE MENU ON LINK CLICK
  // ============================================
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }
    });
  });

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', targetId);
      }
    });
  });

  // ============================================
  // PORTFOLIO FILTERING
  // ============================================
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    filterBar.addEventListener('click', function(e) {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      const filter = btn.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const items = document.querySelectorAll('.project-grid .col-md-6');
      items.forEach(function(col) {
        const card = col.querySelector('.project-card');
        if (!card) return;
        const cat = card.getAttribute('data-category') || 'all';
        if (filter === 'all' || cat === filter) {
          col.classList.remove('hidden');
        } else {
          col.classList.add('hidden');
        }
      });
    });
  }

  // ============================================
  // CAROUSEL RESET ON MODAL OPEN
  // ============================================
  document.querySelectorAll('.modal').forEach(function(modalEl) {
    const carouselEl = modalEl.querySelector('.carousel');
    if (!carouselEl) return;
    modalEl.addEventListener('shown.bs.modal', function() {
      const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
      carousel.to(0);
    });
  });

  // ============================================
  // CONTACT FORM — FORMSPREE AJAX SUBMIT
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const FORM_ENDPOINT = 'https://formspree.io/f/mgogdwaw'; // <-- replace with your Formspree endpoint
    const submitBtn = document.getElementById('contactSubmitBtn');
    const successMsg = document.getElementById('contactSuccessMsg');
    const errorMsg = document.getElementById('contactErrorMsg');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      errorMsg.classList.add('d-none');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(function(response) {
        if (response.ok) {
          contactForm.reset();
          successMsg.classList.remove('d-none');
          submitBtn.textContent = 'Send Request';
          submitBtn.disabled = false;
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch(function() {
        errorMsg.classList.remove('d-none');
        submitBtn.textContent = 'Send Request';
        submitBtn.disabled = false;
      });
    });
  }

  // ============================================
  // TRANSLATION SUPPORT
  // ============================================
  const translations = {
    en: {
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.journey': 'Journey',
      'nav.why_us': 'Why Us',
      'nav.our_work': 'Our Work',
      'nav.get_quote': 'Get a Quote',
      'hero.badge': 'Free quote within 48 hours',
      'hero.subheading': 'Plastering · False Ceilings · Interior Décor',
      'hero.title': 'Craftsmanship you can trust, in every room.',
      'hero.lead': 'Saadeh Constructions designs and installs gibson board false ceilings, partitions and custom interior décor for homes and businesses across Libreville, Gabon.',
      'hero.view_work': 'View Our Work',
      'hero.request_quote': 'Request a Quote',
      'contact.title': 'Contact',
      'contact.heading': 'Have a Project in Mind?',
      'contact.subtext': 'Get in touch for a free quote or to discuss your plastering or decoration project. We typically reply within 48 hours.',
      'about.title': 'About Us',
      'about.heading': 'Our Company',
      'about.p1': 'For the past two years we\'ve handled gibson board false ceilings and partitions for homes and offices across Libreville, with a focus on careful finishing, reliable timelines, and quality materials. We started small, and step by step we\'ve grown — today we\'re trusted with properties tied to the Palace, and many other well-established addresses across the city.',
      'about.p2': 'Based in Libreville, Gabon · serving Battrie 4, Louis, Nombakélé, Glass, Oloumi, Lalala, Bord de mer, Trois Quartiers, Okala, Carrefour l\'Auberge, Delta, Gigi, Pk18 Akanda, and Angondgé.',
      'locations.title': 'Project Areas',
      'locations.heading': 'Places we have worked in',
      'locations.description': 'These are the neighborhoods and districts where we have completed projects for homes, offices, and commercial spaces.',
      'services.title': 'Services',
      'services.heading': 'What We Offer',
      'journey.title': 'Our Journey',
      'journey.heading': 'How We\'ve Grown',
      'why.title': 'Why Choose Us',
      'why.heading': 'Our Commitments',
      'featured.title': 'Featured Story',
      'featured.heading': 'Watch the craft in motion',
      'featured.subtext': 'Stay tuned for a glimpse of the flawless finishing layer in Oloumi, Gabon.',
      'portfolio.title': 'Our Work',
      'portfolio.heading': 'Recent Projects',
      'portfolio.subtext': 'Click any project to browse its photos and videos.',
      'form.name.label': 'Full name',
      'form.name.placeholder': 'Your name',
      'form.contact.label': 'Phone or email',
      'form.contact.placeholder': 'How can we reach you?',
      'form.project.label': 'Project type',
      'form.project.option1': 'False ceilings & plastering',
      'form.project.option2': 'Interior decoration',
      'form.project.option3': 'Renovation & fit-out',
      'form.project.option4': 'Other',
      'form.message.label': 'Tell us about your project',
      'form.message.placeholder': 'Location, size, timeline...',
      'form.submit': 'Send Request',
      'form.success': 'Thanks! Your request has been sent — we\'ll get back to you within 48 hours.',
      'form.error': 'Something went wrong. Please try again or reach us directly.'
    },
    fr: {
      'nav.about': 'À propos',
      'nav.services': 'Services',
      'nav.journey': 'Parcours',
      'nav.why_us': 'Pourquoi nous',
      'nav.our_work': 'Nos réalisations',
      'nav.get_quote': 'Demander un devis',
      'hero.badge': 'Devis gratuit sous 48 heures',
      'hero.subheading': 'Plâtrerie · Faux plafonds · Décoration intérieure',
      'hero.title': 'Un savoir-faire fiable dans chaque pièce.',
      'hero.lead': 'Saadeh Constructions conçoit et installe des faux plafonds en gibson board, des cloisons et de la décoration intérieure sur Libreville, Gabon.',
      'hero.view_work': 'Voir nos réalisations',
      'hero.request_quote': 'Demander un devis',
      'contact.title': 'Contact',
      'contact.heading': 'Un projet en tête ?',
      'contact.subtext': 'Contactez-nous pour un devis gratuit ou pour discuter de votre projet de plâtrerie ou de décoration. Nous répondons généralement sous 48 heures.',
      'about.title': 'À propos',
      'about.heading': 'Notre entreprise',
      'about.p1': 'Depuis deux ans, nous réalisons des faux plafonds en gibson board et des cloisons pour des maisons et des bureaux à Libreville, en mettant l\'accent sur une finition soignée, des délais fiables et des matériaux de qualité. Nous avons commencé petit, puis nous avons grandi étape par étape — aujourd\'hui, nous sommes de confiance pour des propriétés liées au Palais et bien d\'autres adresses établies dans la ville.',
      'about.p2': 'Basé à Libreville, Gabon · nous intervenons à Battrie 4, Louis, Nombakélé, Glass, Oloumi, Lalala, Bord de mer, Trois Quartiers, Okala, Carrefour l\'Auberge, Delta, Gigi, Pk18 Akanda et Angondgé.',
      'locations.title': 'Zones de chantier',
      'locations.heading': 'Lieux où nous avons travaillé',
      'locations.description': 'Voici les quartiers et districts où nous avons réalisé des projets pour des maisons, des bureaux et des espaces commerciaux.',
      'services.title': 'Services',
      'services.heading': 'Ce que nous proposons',
      'journey.title': 'Notre parcours',
      'journey.heading': 'Comment nous avons évolué',
      'why.title': 'Pourquoi nous',
      'why.heading': 'Nos engagements',
      'featured.title': 'Histoire en vedette',
      'featured.heading': 'Regardez l\'artisanat en action',
      'featured.subtext': 'Restez à l\'écoute pour un aperçu de la couche de finition impeccable à Oloumi, Gabon.',
      'portfolio.title': 'Nos réalisations',
      'portfolio.heading': 'Projets récents',
      'portfolio.subtext': 'Cliquez sur un projet pour parcourir ses photos et vidéos.',
      'form.name.label': 'Nom complet',
      'form.name.placeholder': 'Votre nom',
      'form.contact.label': 'Téléphone ou email',
      'form.contact.placeholder': 'Comment pouvons-nous vous joindre ?',
      'form.project.label': 'Type de projet',
      'form.project.option1': 'Faux plafonds et plâtrerie',
      'form.project.option2': 'Décoration intérieure',
      'form.project.option3': 'Rénovation et aménagement',
      'form.project.option4': 'Autre',
      'form.message.label': 'Parlez-nous de votre projet',
      'form.message.placeholder': 'Emplacement, taille, délai...',
      'form.submit': 'Envoyer la demande',
      'form.success': 'Merci ! Votre demande a été envoyée — nous vous répondrons sous 48 heures.',
      'form.error': 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
    }
  };

  const languageToggle = document.getElementById('languageToggle');

  function translatePage(locale) {
    document.documentElement.lang = locale;
    const keys = document.querySelectorAll('[data-i18n]');
    keys.forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const translation = translations[locale] && translations[locale][key];
      if (translation) {
        el.textContent = translation;
      }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = translations[locale] && translations[locale][key];
      if (translation) {
        el.setAttribute('placeholder', translation);
      }
    });

    if (languageToggle) {
      languageToggle.textContent = locale === 'fr' ? 'EN' : 'FR';
    }
  }

  const savedLocale = localStorage.getItem('siteLocale');
  const initialLocale = savedLocale === 'fr' ? 'fr' : 'en';
  translatePage(initialLocale);

  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      const currentLang = document.documentElement.lang || 'en';
      const nextLang = currentLang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('siteLocale', nextLang);
      translatePage(nextLang);
    });
  }

  console.log('🚀 Saadeh Constructions - All Animations Activated!');
});