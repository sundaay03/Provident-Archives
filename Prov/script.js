// Inisialisasi ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi tombol kembali
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', function() {
        // Animasi tombol
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Aksi tombol kembali (contoh: kembali ke halaman sebelumnya)
        window.history.back();
        // Atau bisa diganti dengan: window.location.href = 'index.html';
    });
    
    // Fungsi navigasi antar halaman
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus kelas aktif dari semua link
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Tambah kelas aktif ke link yang diklik
            this.classList.add('active');
            
            // Ambil target halaman dari href
            const targetId = this.getAttribute('href').substring(1);
            
            // Sembunyikan semua halaman
            pages.forEach(page => {
                page.classList.remove('active-page');
            });
            
            // Tampilkan halaman target
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active-page');
                
                // Scroll ke atas halaman
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tombol "Lihat Struktur Organisasi" di home
    const viewStructureBtn = document.getElementById('view-structure-btn');
    if (viewStructureBtn) {
        viewStructureBtn.addEventListener('click', function() {
            // Aktifkan link struktur
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#structure') {
                    link.classList.add('active');
                }
            });
            
            // Sembunyikan semua halaman
            pages.forEach(page => {
                page.classList.remove('active-page');
            });
            
            // Tampilkan halaman struktur
            const structurePage = document.getElementById('structure');
            if (structurePage) {
                structurePage.classList.add('active-page');
                
                // Scroll ke atas halaman
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Animasi kartu saat scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Terapkan animasi pada semua kartu departemen
    const departmentCards = document.querySelectorAll('.department-card');
    departmentCards.forEach(card => {
        observer.observe(card);
    });
    
    // Terapkan animasi pada kartu fitur
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Terapkan animasi pada kartu nilai
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        observer.observe(item);
    });
    
    // Tambahkan efek hover pada semua kartu
    const allCards = document.querySelectorAll('.card, .chief-card, .department-card, .feature-card, .value-item');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Modal untuk gambar
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.modal-close');
    
    // Buka modal saat gambar diklik
    const allImages = document.querySelectorAll('.card-img img, .hero-image img, .about-image img');
    allImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.innerHTML = this.alt;
            
            // Tambahkan efek animasi saat modal terbuka
            modal.style.animation = 'fadeIn 0.3s ease-out';
        });
    });
    
    // Tutup modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Tutup modal saat klik di luar gambar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Efek parallax sederhana pada header saat scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (scrolled > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.padding = '0.8rem 0';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Tambahkan kelas animasi untuk efek masuk
    setTimeout(() => {
        const sections = document.querySelectorAll('.page');
        sections.forEach(section => {
            if (section.classList.contains('active-page')) {
                section.classList.add('animated');
            }
        });
    }, 100);
    
    // Tambahkan efek ripple pada tombol
    backBtn.addEventListener('click', function(e) {
        // Buat elemen ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(46, 125, 50, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
        `;
        
        this.appendChild(ripple);
        
        // Hapus ripple setelah animasi selesai
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Tambahkan efek ripple pada tombol primary
    if (viewStructureBtn) {
        viewStructureBtn.addEventListener('click', function(e) {
            // Buat elemen ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                overflow: hidden;
            `;
            
            this.appendChild(ripple);
            
            // Hapus ripple setelah animasi selesai
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Tambahkan style untuk ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-primary {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Animasi counter untuk statistik
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    };
    
    // Jalankan animasi counter ketika halaman home aktif
    const homePage = document.getElementById('home');
    if (homePage && homePage.classList.contains('active-page')) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (!isNaN(target)) {
                animateCounter(stat, target);
            }
        });
    }
    
    // Jalankan animasi counter ketika halaman home diakses melalui navigasi
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.addEventListener('click', function() {
            setTimeout(() => {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
            }, 500);
        });
    }
});