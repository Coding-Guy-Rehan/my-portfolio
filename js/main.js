// Main script for portfolio interactions
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio initialized.');

  // ==========================================
  // Mobile Menu Logic
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (mobileMenuBtn && mobileMenu) {
    let isMenuOpen = false;
    const lines = mobileMenuBtn.querySelectorAll('span');

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        // Show menu
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'hidden';
        
        // Animate burger to X
        lines[0].style.transform = 'translateY(3.75px) rotate(45deg)';
        lines[1].style.transform = 'translateY(-3.75px) rotate(-45deg)';
      } else {
        // Hide menu
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
        
        // Animate X back to burger
        lines[0].style.transform = 'none';
        lines[1].style.transform = 'none';
      }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking any link
    mobileLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // Testimonial Data (Verified Fiverr Reviews)
  const testimonials = [
    {
      text: "It was my first time working with Rehan, and I’m really glad I chose him. While others were charging unreasonable prices, Rehan offered a fair rate and completed the job promptly. I’m very satisfied with his work — excellent job, sir!",
      author: "ibrahimmahboab",
      role: "🇨🇦 Canada • 5.0 Star Rating",
      initials: "IM"
    },
    {
      text: "Rehan went over and above as usual, providing the fix and changes I needed to my website with pure efficiency and speed. This is my second time with him, and I will continue to return to him for developer work. Highly recommended!",
      author: "ldnshaun",
      role: "🇬🇧 United Kingdom • Repeat Client",
      initials: "LS"
    },
    {
      text: "Absolutely brilliant work. This developer expertly solved a very complex issue involving a multi-platform integration between Shop and Cloudflare. They quickly diagnosed a persistent 401 and 404 error with signed URLs/API. His deep expertise in Liquid, Cloudflare Workers, and API security was invaluable.",
      author: "nlteplan",
      role: "🇬🇧 United Kingdom • 5.0 Star Rating",
      initials: "NP"
    },
    {
      text: "This is the second time I've worked with Rehan, and I'm once again very satisfied with his work. He's super friendly and very professional. I'd be happy to work with him again.",
      author: "lukas127",
      role: "🇩🇪 Germany • Repeat Client",
      initials: "LK"
    },
    {
      text: "He immediately understood connections and was able to help me with things that weren’t even his tasks. Always happy to work with him again!",
      author: "lukas127",
      role: "🇩🇪 Germany • Repeat Client",
      initials: "LK"
    }
  ];

  let currentIndex = 0;

  // DOM Elements
  const textEl = document.getElementById('testimonial-text');
  const authorEl = document.getElementById('testimonial-author');
  const roleEl = document.getElementById('testimonial-role');
  const avatarEl = document.getElementById('testimonial-avatar');
  const countEl = document.getElementById('testimonial-count');
  const cardEl = document.getElementById('testimonial-card');
  const dotsContainer = document.getElementById('testimonial-dots');

  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = (i === currentIndex)
        ? "w-6 h-1.5 rounded-full bg-[#A0ED70] transition-all duration-300 cursor-pointer"
        : "w-1.5 h-1.5 rounded-full bg-[#717D74] transition-all duration-300 cursor-pointer";
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateTestimonial(currentIndex);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateTestimonial(index) {
    if (!cardEl) return;
    // Add fade out effect
    cardEl.style.opacity = '0.4';
    cardEl.style.transform = 'translateY(6px)';
    
    setTimeout(() => {
      // Update content
      if (textEl) textEl.textContent = testimonials[index].text;
      if (authorEl) authorEl.textContent = testimonials[index].author;
      if (roleEl) roleEl.textContent = testimonials[index].role;
      if (avatarEl) avatarEl.textContent = testimonials[index].initials;
      if (countEl) countEl.textContent = ` 0${index + 1} / 0${testimonials.length}`;
      
      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('div');
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.className = "w-6 h-1.5 rounded-full bg-[#A0ED70] transition-all duration-300 cursor-pointer";
          } else {
            dot.className = "w-1.5 h-1.5 rounded-full bg-[#717D74] transition-all duration-300 cursor-pointer";
          }
        });
      }

      // Restore opacity
      cardEl.style.opacity = '1';
      cardEl.style.transform = 'translateY(0)';
    }, 150);
  }

  // Initialize dots
  renderDots();

  // Event Listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
      updateTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
      updateTestimonial(currentIndex);
    });
  }

  // Form submission handling (AJAX to Web3Forms)
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    const captchaError = document.getElementById('captcha-error');

    function showError(input, errorEl) {
      input.classList.remove('border-[#2A352D]', 'focus:border-[#A0ED70]');
      input.classList.add('border-red-500', 'focus:border-red-500');
      errorEl.classList.remove('hidden');
    }

    function clearError(input, errorEl) {
      input.classList.remove('border-red-500', 'focus:border-red-500');
      input.classList.add('border-[#2A352D]', 'focus:border-[#A0ED70]');
      errorEl.classList.add('hidden');
    }

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let isValid = true;
      const formData = new FormData(contactForm);
      
      // Name validation
      if (!nameInput.value.trim()) {
        showError(nameInput, nameError);
        isValid = false;
      } else {
        clearError(nameInput, nameError);
      }

      // Email validation
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        showError(emailInput, emailError);
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }

      // Message validation
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError);
        isValid = false;
      } else {
        clearError(messageInput, messageError);
      }
      
      // Captcha validation
      const captchaResponse = formData.get('h-captcha-response');
      if (captchaError) {
        if (!captchaResponse) {
          captchaError.classList.remove('hidden');
          isValid = false;
        } else {
          captchaError.classList.add('hidden');
        }
      }

      if (!isValid) return;

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="font-medium text-[15px] text-[#10200D]">Sending...</span>`;
      
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });
        
        const result = await response.json();
        
        if (response.ok) {
          btn.innerHTML = `<span class="font-medium text-[15px] text-[#10200D]">Sent successfully!</span>`;
          contactForm.reset();
        } else {
          console.error('Web3Forms Error:', result);
          btn.innerHTML = `<span class="font-medium text-[15px] text-[#10200D]">Something went wrong</span>`;
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        btn.innerHTML = `<span class="font-medium text-[15px] text-[#10200D]">Something went wrong</span>`;
      }

      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 3000);
    });

    // Clear errors on input
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));
  }

  // ==========================================
  // Service CTAs -> Form Auto-select
  // ==========================================
  document.querySelectorAll('.service-cta').forEach(cta => {
    cta.addEventListener('click', () => {
      const targetService = cta.getAttribute('data-service');
      const radio = document.querySelector(`input[name="project_type"][value="${targetService}"]`);
      if (radio) {
        radio.checked = true;
      }
    });
  });

  // ==========================================
  // GSAP Animations
  // ==========================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Load Animations
    const tl = gsap.timeline();
    
    // Header slides down
    tl.from('header', { y: -50, opacity: 0, duration: 0.8, ease: 'power3.out' });
    
    // Hero Section elements slide up
    const heroElements = document.querySelectorAll('section:nth-of-type(1) > div, section:nth-of-type(1) > h1, section:nth-of-type(1) > p');
    if (heroElements.length) {
      tl.from(heroElements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, "-=0.4");
    }

    // Tech Stack Banner fades in
    if (document.getElementById('tech-stack')) {
      gsap.from('#tech-stack', {
        scrollTrigger: {
          trigger: '#tech-stack',
          start: 'top 95%'
        },
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });
    }

    // 2. Continuous Floating Animations
    const floatingPortrait = document.querySelector('.floating-portrait');
    if (floatingPortrait) {
      gsap.to(floatingPortrait, {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    const floatingCode = document.querySelector('.floating-code');
    if (floatingCode) {
      gsap.to(floatingCode, {
        y: 8,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });
    }

    const floatingBadge = document.querySelector('.floating-badge');
    if (floatingBadge) {
      gsap.to(floatingBadge, {
        y: -6,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });
    }

    // 3. Scroll Animations for Sections
    const sections = document.querySelectorAll('section');
    sections.forEach((sec, i) => {
      if (i === 0) return; // Skip hero
      
      // Animate section headings and intro text
      const headers = sec.querySelectorAll('h2, h3, p.max-w-2xl');
      if (headers.length) {
        gsap.fromTo(headers, 
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sec,
              start: 'top 95%', // Very forgiving trigger point
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          }
        );
      }

      // Animate grid cards (Services, Projects)
      const gridCards = sec.querySelectorAll('.grid > div');
      if (gridCards.length) {
        gsap.fromTo(gridCards,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sec.querySelector('.grid'),
              start: 'top 95%', 
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
          }
        );
      }
    });

    // Contact Form
    const contactFormContainer = document.querySelector('form');
    if (contactFormContainer) {
      gsap.fromTo(contactFormContainer,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contactFormContainer,
            start: 'top 98%' // Extremely forgiving for elements near the very bottom
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }
    
    // Refresh ScrollTrigger to ensure calculations are correct after rendering
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }
});
