// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading
    setTimeout(() => {
        loadingProgress.style.width = '100%';
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Start typewriter animation
            startTypewriter();
            
            // Initialize scroll animations
            initScrollAnimations();
            
            // Initialize glitch effect for logo
            initGlitchEffect();
        }, 500);
    }, 1500);
    
    // Typewriter Effect
    function startTypewriter() {
        const titleElement = document.getElementById('main-title');
        const titleText = "PROVIDENT";
        let charIndex = 0;
        
        function typeCharacter() {
            if (charIndex < titleText.length) {
                titleElement.textContent += titleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, 300);
            }
        }
        
        // Start typing after a brief delay
        setTimeout(typeCharacter, 300);
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const fadeSections = document.querySelectorAll('.fade-in-section');
        
        function checkScroll() {
            fadeSections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.85) {
                    section.classList.add('visible');
                }
            });
        }
        
        // Initial check
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
    }
    
    // Glitch Effect for Logo
    function initGlitchEffect() {
        const glitchLayers = document.querySelectorAll('.glitch-layer');
        
        // Random glitch effect every 3 seconds
        setInterval(() => {
            glitchLayers.forEach(layer => {
                // Random position shifts
                const xShift = Math.random() * 10 - 5;
                const yShift = Math.random() * 10 - 5;
                
                layer.style.transform = `translate(${xShift}px, ${yShift}px)`;
                
                // Random opacity
                layer.style.opacity = Math.random() * 0.7;
                
                // Reset after a short time
                setTimeout(() => {
                    layer.style.transform = 'translate(0, 0)';
                    layer.style.opacity = '0';
                }, 200);
            });
        }, 3000);
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Organization Card Hover Effect
    const orgCards = document.querySelectorAll('.org-card');
    
    orgCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.org-image img');
            image.style.opacity = '0.4';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.org-image img');
            image.style.opacity = '1';
        });
    });
    
    // Clickable Events
    const clickableEvents = document.querySelectorAll('.clickable-event');
    
    clickableEvents.forEach(event => {
        event.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            // In a real implementation, this would navigate to the link
            // For demo, we'll show an alert
            //alert(`Navigating to: ${link}\n\nIn a real implementation, this would open the ${link} page.`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Clickable Contributors
    const clickableContributors = document.querySelectorAll('.clickable-contributor');
    
    clickableContributors.forEach(contributor => {
        contributor.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            // In a real implementation, this would navigate to the link
            // For demo, we'll show an alert
            //alert(`Navigating to: ${link}\n\nIn a real implementation, this would open the ${link} page.`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for "Visit Us" button if it has a hash
            if (this.classList.contains('visit-btn') && this.getAttribute('href') === '#quotes') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to quotes section
                const quotesSection = document.getElementById('quotes');
                quotesSection.scrollIntoView({ behavior: 'smooth' });
            } else if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // CTA Button Animation
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('i');
            arrow.style.transform = 'translateY(-5px) scale(1.2)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('i');
            arrow.style.transform = '';
        });
    }
    
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(10deg) scale(1.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = '';
        });
    });
    
    // Parallax effect on hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
});