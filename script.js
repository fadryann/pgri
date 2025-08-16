/* 
===========================================
JAVASCRIPT UNTUK WEBSITE SMA NEGERI 1 LEBAKWANGI
===========================================
*/

// DOM Content Loaded - Pastikan HTML sudah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website SMA Negeri 1 Lebakwangi siap!');
    
    // Inisialisasi semua fungsi
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScrollEffect();
    initScrollAnimations();
    initTypingEffect();
});

/* 
===========================================
SMOOTH SCROLLING NAVIGATION
===========================================
*/
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Tutup mobile menu setelah klik (jika terbuka)
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.remove('active');
            }
        });
    });
}

/* 
===========================================
MOBILE MENU TOGGLE
===========================================
*/
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animasi hamburger menu
            this.classList.toggle('active');
        });

        // Tutup menu jika klik di luar
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

/* 
===========================================
HEADER SCROLL EFFECT
===========================================
*/
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Ubah background header saat scroll
        if (currentScrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
            header.style.backdropFilter = 'none';
        }
        
        // Hide/show header saat scroll (opsional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

/* 
===========================================
SCROLL ANIMATIONS
===========================================
*/
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe semua elemen yang ingin dianimasi
    const animatedElements = document.querySelectorAll('.card, .news-item, .section h3');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

/* 
===========================================
TYPING EFFECT UNTUK HERO SECTION
===========================================
*/
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #f39c12';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Hapus cursor setelah selesai
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Mulai typing effect setelah delay
        setTimeout(typeWriter, 1000);
    }
}

/* 
===========================================
UTILITY FUNCTIONS
===========================================
*/

// Fungsi untuk scroll ke atas
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Fungsi untuk validasi form (jika ada)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Fungsi untuk format tanggal Indonesia
function formatDateIndonesian(date) {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* 
===========================================
LOGO LOADING ANIMATION
===========================================
*/
function initLogoAnimation() {
    const logo = document.querySelector('.logo-img');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
            this.style.transition = 'all 0.5s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
}

/* 
===========================================
LAZY LOADING IMAGES (Jika ada gambar)
===========================================
*/
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* 
===========================================
COUNTER ANIMATION (untuk statistik)
===========================================
*/
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

/* 
===========================================
DARK MODE TOGGLE (Opsional)
===========================================
*/
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Cek preferensi user dari localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isNowDark = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isNowDark);
        });
    }
}

/* 
===========================================
SEARCH FUNCTIONALITY (Jika ada search bar)
===========================================
*/
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.toLowerCase().trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length > 2) {
                    performSearch(query);
                } else {
                    clearSearchResults();
                }
            }, 300);
        });
    }
}

function performSearch(query) {
    // Implementasi pencarian sederhana
    const searchableElements = document.querySelectorAll('[data-searchable]');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            results.push({
                title: element.getAttribute('data-title') || 'Hasil Pencarian',
                content: element.textContent.substring(0, 100) + '...',
                element: element
            });
        }
    });
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>Tidak ada hasil ditemukan</p>';
    } else {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            resultElement.innerHTML = `
                <h4>${result.title}</h4>
                <p>${result.content}</p>
            `;
            resultElement.addEventListener('click', () => {
                result.element.scrollIntoView({ behavior: 'smooth' });
                clearSearchResults();
            });
            searchResults.appendChild(resultElement);
        });
    }
    
    searchResults.style.display = 'block';
}

function clearSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
        searchResults.innerHTML = '';
    }
}

/* 
===========================================
CONTACT FORM HANDLER
===========================================
*/
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Simulasi pengiriman form
                showNotification('Pesan berhasil dikirim! Terima kasih.', 'success');
                this.reset();
            } else {
                showNotification('Mohon lengkapi semua field yang diperlukan.', 'error');
            }
        });
    }
}

/* 
===========================================
NOTIFICATION SYSTEM
===========================================
*/
function showNotification(message, type = 'info') {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Event listener untuk tombol close
    notification.querySelector('.close-notification').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/* 
===========================================
BACK TO TOP BUTTON
===========================================
*/
function initBackToTop() {
    // Buat tombol back to top
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Kembali ke atas';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide berdasarkan scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Event listener untuk klik
    backToTopBtn.addEventListener('click', scrollToTop);
}

/* 
===========================================
PARALAX EFFECT (Opsional)
===========================================
*/
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

/* 
===========================================
COOKIE CONSENT (Opsional)
===========================================
*/
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.id = 'cookie-consent';
        consentBanner.innerHTML = `
            <div class="cookie-content">
                <p>Website ini menggunakan cookie untuk meningkatkan pengalaman Anda.</p>
                <div class="cookie-buttons">
                    <button id="accept-cookies">Terima</button>
                    <button id="reject-cookies">Tolak</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        document.getElementById('accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.remove();
        });
        
        document.getElementById('reject-cookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            consentBanner.remove();
        });
    }
}

/* 
===========================================
PERFORMANCE MONITORING
===========================================
*/
function initPerformanceMonitoring() {
    // Log loading time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Website loaded in ${loadTime.toFixed(2)}ms`);
        
        // Analytics tracking (jika menggunakan Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime)
            });
        }
    });
}

/* 
===========================================
ERROR HANDLING
===========================================
*/
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Log error untuk debugging (dalam production, kirim ke server)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'javascript_error', {
            error_message: e.message,
            error_filename: e.filename,
            error_lineno: e.lineno
        });
    }
});

/* 
===========================================
INITIALIZATION COMPLETE
===========================================
*/
// Jalankan fungsi tambahan setelah DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Jalankan fungsi-fungsi opsional
    initLogoAnimation();
    initLazyLoading();
    initContactForm();
    initBackToTop();
    initPerformanceMonitoring();
    
    // Uncomment jika ingin menggunakan fitur-fitur ini:
    // initDarkMode();
    // initSearch();
    // initParallax();
    // initCookieConsent();
    
    console.log('Semua fungsi JavaScript berhasil diinisialisasi!');
});

/* 
===========================================
EXPORT FUNCTIONS (Jika menggunakan modules)
===========================================
*/
// Jika menggunakan ES6 modules, uncomment baris di bawah:
// export { scrollToTop, showNotification, validateForm, formatDateIndonesian };