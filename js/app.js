/**
 * MY PORTFOLIO APP — Main Page (js/app.js)
 * ===========================================
 * All the interactive behavior for my portfolio site.
 *
 * WHAT I EDIT:
 * - EXPERIENCE_DATA (line 10): My job history — add/remove/modify entries
 * - INTEGRATION_DATA (line 37): Links to my other profiles (Spotify, GitHub, etc.)
 *
 * WHAT I DON'T TOUCH (unless I know JS):
 * - The classes below handle: smooth scrolling, scroll animations, navigation,
 *   rendering experience/integration cards, text scramble effect, reading
 *   progress bar, back-to-top button, and email copy.
 *
 * Compiled from TypeScript. I use this file directly since I don't have TS set up.
 */

// ============================================
// DATA — I edit these arrays to add/modify content
// ============================================

/**
 * MY EXPERIENCE DATA — My job history shown in the "Experience" section.
 *
 * To ADD a new job: I copy one of the objects below, paste it at the end (before the closing ]), and change the values.
 * To REMOVE a job: I delete the entire object (from { to }).
 * To CHANGE order: I move the objects around in the array.
 *
 * Each job has:
 *   id         — Unique ID (I just make sure it's different from others)
 *   role       — My job title
 *   company    — Company/agency name
 *   period     — When I worked there (e.g. "2022 — 2024")
 *   description— What I did (1-2 sentences)
 *   tags       — Short labels shown below the description
 */
const EXPERIENCE_DATA = [
  {
    id: 'exp-1',
    role: 'Associate Consultant',
    company: 'Cubastion Consulting',
    period: 'Jan. 2025 — Present',
    description: 'Designing and shipping production-grade Generative AI systems for enterprise clients — LLM apps, RAG, document intelligence, and agentic workflows. Owning the full stack: AI, backend engineering, cloud infra, and deployments, all under aggressive timelines.',
    tags: ['GenAI', 'Full Stack', 'Enterprise']
  },
  {
    id: 'exp-2',
    role: 'AI Intern',
    company: 'IFFCO Tokio GIC',
    period: 'Dec. 2023 — Feb. 2024',
    description: 'Built an XGBoost classifier to predict cross-sell opportunities from 15GB of raw policy data. Handled end-to-end EDA, feature engineering, and model training, directly driving revenue growth and customer retention.',
    tags: ['ML', 'Data Engineering', 'Python']
  }
];

/**
 * MY INTEGRATION DATA — Cards shown in the "Elsewhere" section.
 * Each card links to one of my profiles on other platforms.
 *
 * To ADD a new platform: I copy one of the objects below, paste it at the end, and change the values.
 * To REMOVE a platform: I delete the entire object.
 *
 * Each integration has:
 *   id         — Unique ID (lowercase, no spaces)
 *   platform   — Name shown on the card (e.g. "Spotify")
 *   username   — My handle (e.g. "@aditya")
 *   url        — Full link to my profile
 *   status     — Short text below the platform name (e.g. "Currently vibing to —")
 *   iconSvg    — SVG paths for the icon. I get icons from https://iconsvg.xyz
 *                (paste the <path> or <rect> elements inside the SVG tag)
 */
const INTEGRATION_DATA = [
  {
    id: 'spotify',
    platform: 'Spotify',
    username: '@yourusername',
    url: 'https://open.spotify.com/user/yourusername',
    status: 'Currently vibing to —',
    iconSvg: '<circle cx="12" cy="12" r="10"/><path d="M8 10c2.5-1 5.5-1 8 0M7 14c3-1.5 7-1.5 10 0"/>'
  },
  {
    id: 'letterboxd',
    platform: 'Letterboxd',
    username: '@yourusername',
    url: 'https://letterboxd.com/yourusername',
    status: 'Last watched —',
    iconSvg: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 4v16M10 4v16M14 4v16M18 4v16"/>'
  },
  {
    id: 'goodreads',
    platform: 'Goodreads',
    username: '@yourusername',
    url: 'https://goodreads.com/yourusername',
    status: 'Reading —',
    iconSvg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
  },
  {
    id: 'github',
    platform: 'GitHub',
    username: '@yourusername',
    url: 'https://github.com/yourusername',
    status: 'Contributions this week —',
    iconSvg: '<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>'
  },
  {
    id: 'strava',
    platform: 'Strava',
    username: '@yourusername',
    url: 'https://strava.com/athletes/yourusername',
    status: 'Last activity —',
    iconSvg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
  },
  {
    id: 'lastfm',
    platform: 'Last.fm',
    username: '@yourusername',
    url: 'https://last.fm/user/yourusername',
    status: 'Scrobbles today —',
    iconSvg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>'
  },
  {
    id: 'arena',
    platform: 'Are.na',
    username: '@yourusername',
    url: 'https://are.na/yourusername',
    status: 'Latest channel —',
    iconSvg: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
  },
  {
    id: 'readcv',
    platform: 'Read.cv',
    username: '@yourusername',
    url: 'https://read.cv/yourusername',
    status: 'View profile —',
    iconSvg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'
  }
];

// ============================================
// UTILITIES — Helper functions used by the classes below
// ============================================

/** Returns true if the visitor has "reduce motion" enabled in their OS settings (accessibility) */
const prefersReducedMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Limits how often a function runs — prevents lag from too many scroll events */
const throttle = (fn, ms) => {
  let lastTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastTime >= ms) {
      lastTime = now;
      fn(...args);
    }
  };
};

// ============================================
// CLASSES — Each class handles one feature of the site
// ============================================

/**
 * SmoothScroll — Makes my nav links scroll smoothly to sections instead of jumping.
 * Finds all links starting with "#" and uses scrollIntoView with smooth behavior.
 */
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }
  
  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

/**
 * ScrollAnimator — Fades in elements as I scroll down the page.
 * Targets any element with the data-animate attribute (set opacity:0 in CSS,
 * then transitions to visible when the element enters the viewport).
 * data-delay="N" adds a stagger delay in milliseconds.
 */
class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');
    if (prefersReducedMotion()) {
      this.elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    this.init();
  }
  
  init() {
    this.elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      this.observer.observe(el);
    });
  }
  
  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        this.observer.unobserve(el);
      }
    });
  }
}

/**
 * Navigation — Handles my sticky top nav bar:
 * - Adds a "scrolled" style when I scroll past 50px
 * - Highlights the active section link as I scroll
 * - Opens/closes the hamburger menu on mobile
 */
class Navigation {
  constructor() {
    this.nav = document.getElementById('nav');
    this.hamburger = document.getElementById('hamburger');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.links = document.querySelectorAll('.nav__link[data-section]');
    this.sections = document.querySelectorAll('section[id]');
    this.init();
  }
  
  init() {
    // Scroll effect on nav
    window.addEventListener('scroll', throttle(() => {
      if (window.scrollY > 50) this.nav.classList.add('scrolled');
      else this.nav.classList.remove('scrolled');
    }, 100));
    
    // Active link on scroll
    window.addEventListener('scroll', throttle(() => this.updateActiveLink(), 150));
    
    // Mobile menu
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
  }
  
  updateActiveLink() {
    const scrollPos = window.scrollY + 200;
    this.sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        this.links.forEach(link => {
          link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }
  
  toggleMobileMenu() {
    const isOpen = this.mobileMenu.classList.contains('active');
    if (isOpen) this.closeMobileMenu();
    else this.openMobileMenu();
  }
  
  openMobileMenu() {
    this.mobileMenu.classList.add('active');
    this.hamburger.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  
  closeMobileMenu() {
    this.mobileMenu.classList.remove('active');
    this.hamburger.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/**
 * ExperienceRenderer — Takes my EXPERIENCE_DATA array and generates HTML
 * for each job entry. Injects it into the #experience-list div.
 * Each card gets data-animate so it fades in on scroll.
 */
class ExperienceRenderer {
  constructor(data) {
    this.data = data;
    this.container = document.getElementById('experience-list');
    if (this.container) this.render();
  }
  
  render() {
    this.container.innerHTML = this.data.map((item, i) => `
      <article class="exp-item" data-animate data-delay="${i * 100}">
        <div class="exp-item__meta">
          <span class="exp-item__period">${item.period}</span>
        </div>
        <div class="exp-item__content">
          <h3 class="exp-item__role">${item.role}</h3>
          <p class="exp-item__company">${item.company}</p>
          <p class="exp-item__desc">${item.description}</p>
        </div>
      </article>
    `).join('');
  }
}

/**
 * IntegrationRenderer — Takes my INTEGRATION_DATA array and generates
 * clickable cards for the "Elsewhere" section grid.
 * Each card links to an external platform with an icon and status text.
 */
class IntegrationRenderer {
  constructor(data) {
    this.data = data;
    this.container = document.getElementById('integrations-grid');
    if (this.container) this.render();
  }
  
  render() {
    this.container.innerHTML = this.data.map((item, i) => `
      <a href="${item.url}" target="_blank" rel="noopener" class="int-card" data-animate data-delay="${i * 75}">
        <svg class="int-card__icon" viewBox="0 0 24 24" aria-hidden="true">${item.iconSvg}</svg>
        <h3 class="int-card__name">${item.platform}</h3>
        <p class="int-card__status">${item.status}</p>
      </a>
    `).join('');
  }
}

/**
 * TextScramble — Fun hover effect on my hero name.
 * When you hover over my name, letters randomly scramble into symbols
 * then resolve back to the original text. Respects reduced-motion preference.
 */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.originalText = el.textContent;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.frame = 0;
    this.isHovering = false;
    this.init();
  }
  
  init() {
    this.el.addEventListener('mouseenter', () => {
      this.isHovering = true;
      this.scramble();
    });
    this.el.addEventListener('mouseleave', () => {
      this.isHovering = false;
      this.el.textContent = this.originalText;
    });
  }
  
  scramble() {
    if (!this.isHovering) return;
    let output = '';
    for (let i = 0; i < this.originalText.length; i++) {
      if (Math.random() < 0.28) {
        output += this.chars[Math.floor(Math.random() * this.chars.length)];
      } else {
        output += this.originalText[i];
      }
    }
    this.el.textContent = output;
    requestAnimationFrame(() => this.scramble());
  }
}

/**
 * TYPEWRITER: Cycles through an array of texts, typing each one out
 * character by character, pausing, then deleting before moving to the next.
 *
 * To add or change texts, just edit the TYPEWRITER_TEXTS array below.
 */
const TYPEWRITER_TEXTS = [
  'AI engineer',
  'technical consultant',
  'amateur graphic designer',
  'hobbyist photographer',
  'occasional content-creator',
  'writer & thinker',
  'swimmer',
  'मस्तिखोर'
];

class Typewriter {
  constructor(el, texts, speed = 80, pause = 1500, deleteSpeed = 40) {
    this.el = el;
    this.texts = texts;
    this.speed = speed;
    this.pause = pause;
    this.deleteSpeed = deleteSpeed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.tick();
  }

  tick() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    // Show the current portion of the text
    this.el.textContent = currentText.substring(0, this.charIndex);

    let delay = this.isDeleting ? this.deleteSpeed : this.speed;

    // Pause at the end of a word before deleting
    if (!this.isDeleting && this.charIndex === currentText.length) {
      delay = this.pause;
      this.isDeleting = true;
    }

    // Move to the next text after fully deleting
    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      delay = 500;
    }

    setTimeout(() => this.tick(), delay);
  }
}

/**
 * ReadingProgress — Updates the thin progress bar at the very top of the page.
 * The bar width = (how far I've scrolled) / (total scrollable height) * 100%.
 */
class ReadingProgress {
  constructor() {
    this.bar = document.querySelector('.reading-progress__bar');
    if (this.bar) this.init();
  }
  
  init() {
    window.addEventListener('scroll', throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.bar.style.width = `${progress}%`;
    }, 50));
  }
}

/**
 * BackToTop — Shows a small arrow button in the bottom-right after I scroll
 * down 600px. Clicking it smoothly scrolls back to the top of the page.
 */
class BackToTop {
  constructor() {
    this.btn = document.getElementById('back-to-top');
    if (this.btn) this.init();
  }
  
  init() {
    window.addEventListener('scroll', throttle(() => {
      this.btn.classList.toggle('visible', window.scrollY > 600);
    }, 100));
    
    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Toast — A small notification that pops up briefly (e.g. "Email copied to clipboard").
 * Shows for 2.5 seconds by default, then fades out.
 */
class Toast {
  constructor() {
    this.el = document.getElementById('toast');
  }
  
  show(message, duration = 2500) {
    if (!this.el) return;
    this.el.textContent = message;
    this.el.classList.add('show');
    setTimeout(() => this.el.classList.remove('show'), duration);
  }
}

// ============================================
// INITIALIZATION — Runs when the page finishes loading.
// Each line below starts one feature of my site.
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // DARK MODE TOGGLE: Restores saved preference, then toggles on click.
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  new SmoothScroll();        // Smooth anchor scrolling
  new ScrollAnimator();      // Fade-in elements on scroll
  new Navigation();          // Sticky nav + mobile menu
  new ExperienceRenderer(EXPERIENCE_DATA);  // Render my job cards from data above
  new IntegrationRenderer(INTEGRATION_DATA);// Render my platform cards from data above
  new ReadingProgress();     // Top progress bar
  new BackToTop();           // Back-to-top button
  
  // Text scramble effect on my hero name — hovering scrambles the letters
  const heroName = document.getElementById('hero-name');
  if (heroName && !prefersReducedMotion()) {
    new TextScramble(heroName);
  }
  
  // Typewriter effect below the name — cycles through my disciplines
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl && !prefersReducedMotion()) {
    new Typewriter(typewriterEl, TYPEWRITER_TEXTS);
  }
  
  // Click-to-copy email: clicking my email in the footer copies it to clipboard
  // and shows a toast notification. Falls back to mailto: if clipboard isn't available.
  const emailLink = document.getElementById('copy-email');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailLink.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        new Toast().show('Email copied to clipboard');
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }
  
  // Page transition fade: when I click internal links (not # anchors or http links),
  // it fades the page out before navigating. Creates a smooth page-to-page transition.
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      });
    }
  });
});
