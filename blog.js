/**
 * MY BLOG APP — Blog Page ("marginalia")
 * Compiled from TypeScript. I use this file directly since I don't have TS set up.
 */

// ============================================
// DATA — I edit this array to add/modify posts
// ============================================

const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'The Invisible Craft of Branding',
    slug: 'invisible-craft-branding',
    date: '2026-07-10',
    tags: ['design', 'strategy'],
    excerpt: 'Why the best brands feel inevitable, not designed. A deep dive into the subconscious signals that make identity stick.',
    content: `
      <p>The best brands don't feel designed. They feel <strong>inevitable</strong>—as if they always existed, waiting to be discovered rather than created.</p>
      <p>I've spent the last decade obsessing over this paradox. How do you intentionally create something that feels unintentional? The answer, I've found, lies in what I call <em>invisible craft</em>—the thousand micro-decisions that viewers never notice but absolutely feel.</p>
      <h3>The Weight of a Glyph</h3>
      <p>Take typography. Most people can't articulate why one typeface feels "right" and another feels "off." But their nervous system knows. The tension in a curve, the rhythm of spacing, the way letters breathe together—these subliminal signals build trust before a single word is read.</p>
      <p>When we redesigned [Client Name]'s wordmark, we tested 47 variations of the letter "a" alone. Not because the client would notice, but because their customers would feel the difference.</p>
      <h3>Designing for the Unconscious</h3>
      <p>The most powerful design happens below the threshold of awareness. It's the warmth of a color temperature. The confidence of generous whitespace. The subtle asymmetry that makes a layout feel alive rather than calculated.</p>
      <p>My job isn't to make things look good. It's to make things feel true.</p>
    `,
    readingTime: 5,
    featured: true
  },
  {
    id: 'post-2',
    title: 'Why I Switched to TypeScript',
    slug: 'why-typescript',
    date: '2026-06-28',
    tags: ['code'],
    excerpt: 'After years of vanilla JS, the type system finally clicked. Here is what changed my mind—and my workflow.',
    content: `<p>I was skeptical for a long time. Types felt like bureaucracy—unnecessary ceremony that slowed down the creative process.</p><p>I was wrong.</p>`,
    readingTime: 4,
    featured: false
  },
  {
    id: 'post-3',
    title: 'Designing for Emotion',
    slug: 'designing-for-emotion',
    date: '2026-06-15',
    tags: ['design'],
    excerpt: 'Interface design is emotional design. Here is how to build products that resonate on a human level.',
    content: `<p>Every pixel is an emotional signal. The question is whether you are sending the ones you intend.</p>`,
    readingTime: 6,
    featured: false
  },
  {
    id: 'post-4',
    title: 'A Month Without Social Media',
    slug: 'month-without-social',
    date: '2026-05-22',
    tags: ['culture', 'notes'],
    excerpt: 'I deleted everything for 30 days. Here is what happened to my creativity, anxiety, and attention span.',
    content: `<p>The first week was withdrawal. The second week was clarity. The third week was boredom. The fourth week was freedom.</p>`,
    readingTime: 8,
    featured: false
  },
  {
    id: 'post-5',
    title: 'The Perfect Type Scale',
    slug: 'perfect-type-scale',
    date: '2026-05-08',
    tags: ['design', 'code'],
    excerpt: 'A mathematical approach to typography that scales beautifully across every breakpoint.',
    content: `<p>Stop guessing at font sizes. Start with a ratio and let math do the work.</p>`,
    readingTime: 3,
    featured: false
  },
  {
    id: 'post-6',
    title: 'Reading List: Summer 2026',
    slug: 'reading-list-summer-2026',
    date: '2026-04-30',
    tags: ['culture'],
    excerpt: 'The books, essays, and longreads shaping my thinking this season.',
    content: `<p>A mix of design theory, fiction, and philosophy. The throughline: how we construct meaning.</p>`,
    readingTime: 4,
    featured: false
  }
];

// ============================================
// UTILITIES — Helper functions for my blog
// ============================================

const prefersReducedMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// CLASSES — Each class handles one feature of my blog
// ============================================

class BlogManager {
  constructor(posts) {
    this.posts = posts;
    this.filteredPosts = [...posts];
    this.grid = document.getElementById('blog-grid');
    this.empty = document.getElementById('blog-empty');
    this.searchInput = document.getElementById('blog-search');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.activeFilter = 'all';
    this.searchQuery = '';
    
    this.init();
  }
  
  init() {
    this.renderPosts(this.posts);
    this.setupFilters();
    this.setupSearch();
  }
  
  setupFilters() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.activeFilter = filter;
        
        // Update active state
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.applyFilters();
      });
    });
  }
  
  setupSearch() {
    if (!this.searchInput) return;
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.applyFilters();
    });
  }
  
  applyFilters() {
    let result = this.posts;
    
    // Tag filter
    if (this.activeFilter !== 'all') {
      result = result.filter(p => p.tags.includes(this.activeFilter));
    }
    
    // Search filter
    if (this.searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.excerpt.toLowerCase().includes(this.searchQuery) ||
        p.tags.some(t => t.toLowerCase().includes(this.searchQuery))
      );
    }
    
    this.filteredPosts = result;
    this.renderPosts(result);
  }
  
  renderPosts(posts) {
    if (!this.grid) return;
    
    if (posts.length === 0) {
      this.grid.style.display = 'none';
      this.empty.style.display = 'block';
      return;
    }
    
    this.grid.style.display = 'grid';
    this.empty.style.display = 'none';
    
    this.grid.innerHTML = posts.map((post, i) => this.createCard(post, i)).join('');
    
    // Re-attach click handlers
    this.grid.querySelectorAll('.blog-card').forEach((card, i) => {
      card.addEventListener('click', () => {
        window.blogModal.open(posts[i]);
      });
      card.style.animationDelay = `${i * 80}ms`;
    });
  }
  
  createCard(post, index) {
    const featuredClass = post.featured ? 'blog-card--featured' : '';
    const date = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    
    return `
      <article class="blog-card ${featuredClass}" data-animate style="animation-delay: ${index * 80}ms">
        <div class="blog-card__image">
          <!-- MY BLOG IMAGES: I add blog post images here -->
          <!-- <img src="assets/images/blog/${post.slug}.jpg" alt="${post.title}" loading="lazy"> -->
        </div>
        <div class="blog-card__body">
          <div class="blog-card__meta">
            <time>${date}</time>
            <span>${post.readingTime} min read</span>
          </div>
          <h3 class="blog-card__title">${post.title}</h3>
          <p class="blog-card__excerpt">${post.excerpt}</p>
          <div class="blog-card__tags">
            ${post.tags.map(tag => `<span class="blog-card__tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }
}

class BlogModal {
  constructor() {
    this.overlay = document.getElementById('modal-overlay');
    this.closeBtn = document.getElementById('modal-close');
    this.title = document.getElementById('modal-title');
    this.date = document.getElementById('modal-date');
    this.readingTime = document.getElementById('modal-reading-time');
    this.tags = document.getElementById('modal-tags');
    this.content = document.getElementById('modal-content');
    
    this.init();
  }
  
  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }
  
  open(post) {
    if (!this.overlay) return;
    
    const dateStr = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    
    this.title.textContent = post.title;
    this.date.textContent = dateStr;
    this.readingTime.textContent = `${post.readingTime} min read`;
    this.tags.innerHTML = post.tags.map(t => `<span class="modal__tag">${t}</span>`).join('');
    this.content.innerHTML = post.content;
    
    this.overlay.classList.add('active');
    this.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    this.overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// ============================================
// INITIALIZATION — Runs when my blog page finishes loading.
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

  // Scroll animations for my blog cards
  if (!prefersReducedMotion()) {
    const animated = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animated.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });
  }
  
  // Reading progress bar at the top of my blog page
  const progressBar = document.querySelector('.reading-progress__bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    });
  }
  
  // Back-to-top button for my blog page
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Mobile menu for my blog page
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Initialize my blog manager and modal
  window.blogModal = new BlogModal();
  new BlogManager(BLOG_POSTS);
});