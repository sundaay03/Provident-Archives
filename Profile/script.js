// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
    
    // Setup event listeners
    setupEventListeners();
    
    // Generate members and gallery items
    generateMembers();
    generateGallery();
    
    // Setup animations
    setupAnimations();
});

// Initialize website
function initWebsite() {
    console.log('Website Profil Angkatan siap!');
    
    // Set current year in footer if needed
    // document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Setup event listeners
function setupEventListeners() {
    // Back button functionality
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.history.back();
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
            // Show success message
            alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Load more members button
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show all members
            const hiddenMembers = document.querySelectorAll('.member-card.hidden');
            hiddenMembers.forEach(member => {
                member.classList.remove('hidden');
                member.style.display = 'block';
            });
            
            // Hide the button after showing all
            this.style.display = 'none';
            
            // Animate the newly shown members
            setTimeout(() => {
                hiddenMembers.forEach(member => {
                    member.classList.add('animate');
                });
            }, 100);
        });
    }
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        // Create observer for stats section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start counting for each stat
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        const duration = 1500; // 1.5 seconds
                        const step = target / (duration / 16); // 60fps
                        let current = 0;
                        
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current);
                        }, 16);
                    });
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the about section
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }
}

// Generate member cards
function generateMembers() {
    const membersGrid = document.querySelector('.members-grid');
    if (!membersGrid) return;
    
    const members = [
        { name: 'Ahmad Rizki', role: 'Ketua Angkatan', icon: '👨‍💻', desc: 'Bertanggung jawab atas koordinasi kegiatan angkatan' },
        { name: 'Siti Nurhaliza', role: 'Wakil Ketua', icon: '👩‍🎓', desc: 'Membantu ketua dalam mengelola kegiatan' },
        { name: 'Budi Santoso', role: 'Sekretaris', icon: '📝', desc: 'Mengurus administrasi dan dokumentasi' },
        { name: 'Dewi Lestari', role: 'Bendahara', icon: '💰', desc: 'Mengelola keuangan dan dana angkatan' },
        { name: 'Fajar Pratama', role: 'Koordinator Acara', icon: '🎉', desc: 'Merencanakan dan melaksanakan kegiatan' },
        { name: 'Maya Indah', role: 'Koordinator Media', icon: '📱', desc: 'Mengelola media sosial dan publikasi' },
        { name: 'Rizki Ramadhan', role: 'Koordinator Akademik', icon: '📚', desc: 'Mengkoordinasikan kegiatan akademik' },
        { name: 'Lina Hartati', role: 'Koordinator Sosial', icon: '🤝', desc: 'Mengatur kegiatan sosial dan bakti sosial' }
    ];
    
    // Clear any existing content
    membersGrid.innerHTML = '';
    
    // Create member cards
    members.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card ${index >= 4 ? 'hidden' : ''}`;
        memberCard.style.animationDelay = `${index * 0.1}s`;
        
        memberCard.innerHTML = `
            <div class="member-img">
                <span class="member-icon">${member.icon}</span>
            </div>
            <div class="member-info">
                <h4>${member.name}</h4>
                <p class="member-role">${member.role}</p>
                <p class="member-desc">${member.desc}</p>
            </div>
        `;
        
        membersGrid.appendChild(memberCard);
    });
    
    // Animate the visible cards after a short delay
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.member-card:not(.hidden)');
        visibleCards.forEach(card => {
            card.classList.add('animate');
        });
    }, 300);
}

// Generate gallery items
function generateGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    const galleryItems = [
        { icon: '🎓', title: 'Wisuda' },
        { icon: '👨‍💻', title: 'Workshop' },
        { icon: '🏫', title: 'Kampus' },
        { icon: '🎉', title: 'Acara' },
        { icon: '🏆', title: 'Penghargaan' },
        { icon: '🤝', title: 'Kerjasama' }
    ];
    
    // Clear any existing content
    galleryGrid.innerHTML = '';
    
    // Create gallery items
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        
        galleryItem.innerHTML = `
            <div class="gallery-content">
                <div class="gallery-icon">${item.icon}</div>
                <p class="gallery-title">${item.title}</p>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Animate gallery items after a short delay
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.classList.add('animate');
        });
    }, 500);
}

// Setup animations on scroll
function setupAnimations() {
    // Create intersection observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class based on element type
                if (entry.target.classList.contains('member-card')) {
                    entry.target.classList.add('animate');
                } else if (entry.target.classList.contains('gallery-item')) {
                    entry.target.classList.add('animate');
                } else {
                    // For other elements, add a general fade-in class
                    entry.target.classList.add('animate-fade-in');
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe member cards
    document.querySelectorAll('.member-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe other sections for animation
    document.querySelectorAll('.about-text, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});