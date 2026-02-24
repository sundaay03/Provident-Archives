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

    // Efek hover untuk gambar bertumpuk
    const stackedImages = document.querySelectorAll('.stacked-image');
    stackedImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            // Reset transform untuk semua gambar bertumpuk
            stackedImages.forEach(img => {
                if (img !== this) {
                    img.style.zIndex = '1';
                }
            });
            // Tingkatkan z-index gambar yang sedang dihover
            this.style.zIndex = '10';
        });
    });

    // Efek hover untuk gambar gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Tambah efek visual pada gambar
            const img = this.querySelector('img');
            const overlay = this.querySelector('.image-overlay');
            
            // Animasi transisi opacity untuk overlay
            overlay.style.transition = 'opacity 0.5s ease, background 0.5s ease';
            
            // Tambah border berwarna hijau pada item
            this.style.border = '2px solid rgba(76, 175, 80, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            // Hapus border saat kursor keluar
            this.style.border = 'none';
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
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.style.backgroundColor = '#FF9800';
            this.style.color = '#0a0a0a';
        } else {
            this.innerHTML = '<i class="fas fa-adjust"></i>';
            this.style.backgroundColor = '#1a1a1a';
            this.style.color = '#FF9800';
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
        const elements = document.querySelectorAll('.gallery-item, .stat, .about-text p');
        
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
    const animatedElements = document.querySelectorAll('.gallery-item, .stat, .about-text p');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Jalankan sekali saat halaman dimuat
    animateOnScroll();
});