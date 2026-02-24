// Inisialisasi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efek hover untuk gambar gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(230, 126, 34, 0.2)';
            
            const img = this.querySelector('img');
            const overlay = this.querySelector('.image-overlay');
            const imageInfo = this.querySelector('.image-info');
            
            if (img && overlay && imageInfo) {
                img.style.transform = 'scale(1.1)';
                overlay.style.opacity = '1';
                imageInfo.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(74, 44, 42, 0.1)';
            
            const img = this.querySelector('img');
            const overlay = this.querySelector('.image-overlay');
            const imageInfo = this.querySelector('.image-info');
            
            if (img && overlay && imageInfo) {
                img.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
                imageInfo.style.transform = 'translateY(20px)';
            }
        });
    });

    // Modal untuk gambar
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    
    // Buka modal saat gambar gallery diklik
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            const caption = this.querySelector('h3').textContent;
            
            modalImage.src = imgSrc;
            modalImage.alt = imgAlt;
            modalCaption.textContent = caption;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Mencegah scroll di background
        });
    });
    
    // Tutup modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Tutup modal saat klik di luar konten
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Toggle tema (hanya efek visual tambahan)
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.style.backgroundColor = '#4A2C2A';
            this.style.color = '#FF9800';
            
            // Ubah ke tema gelap
            document.documentElement.style.setProperty('--cream', '#1A0F0E');
            document.documentElement.style.setProperty('--light-cream', '#2C1B19');
            document.documentElement.style.setProperty('--dark-cream', '#3D2926');
            document.documentElement.style.setProperty('--brown', '#E0D7D5');
            document.documentElement.style.setProperty('--light-brown', '#B8A9A6');
            document.documentElement.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.2)');
        } else {
            this.innerHTML = '<i class="fas fa-adjust"></i>';
            this.style.backgroundColor = '#F5E9D9';
            this.style.color = '#E67E22';
            
            // Kembali ke tema asli
            document.documentElement.style.setProperty('--cream', '#FFF8F0');
            document.documentElement.style.setProperty('--light-cream', '#FFFDFA');
            document.documentElement.style.setProperty('--dark-cream', '#F5E9D9');
            document.documentElement.style.setProperty('--brown', '#4A2C2A');
            document.documentElement.style.setProperty('--light-brown', '#7A5C4A');
            document.documentElement.style.setProperty('--shadow', 'rgba(74, 44, 42, 0.1)');
        }
    });

    // Efek scroll untuk header
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scroll ke bawah
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll ke atas
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Highlight menu aktif berdasarkan scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollTop >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animasi masuk untuk elemen saat scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.gallery-item, .feature, .timeline-item, .about-text p');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Setel animasi awal
    const animatedElements = document.querySelectorAll('.gallery-item, .feature, .timeline-item, .about-text p');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Jalankan sekali saat halaman dimuat
    animateOnScroll();
});