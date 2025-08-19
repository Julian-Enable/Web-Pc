// ===== ANIMACIONES Y EFECTOS INTERACTIVOS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TOGGLE MODO DÍA/NOCHE =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Guardar preferencia
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        
        // Mostrar notificación
        const themeText = body.classList.contains('light-mode') ? 'Modo Día' : 'Modo Noche';
        showNotification(`Cambiado a ${themeText}`, 'success');
    });
    
    // ===== ANIMACIÓN DE CONTADORES =====
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
                const count = +counter.innerText.replace(/\D/g, '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc) + (counter.innerText.includes('+') ? '+' : '');
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
                }
            };
            updateCount();
        });
    }

    // ===== OBSERVER PARA ANIMACIONES AL SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animar contadores cuando la sección de stats sea visible
                if (entry.target.id === 'stats') {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.card, .feature-card, .stat-card').forEach(el => {
        observer.observe(el);
    });

    // ===== EFECTO PARALLAX EN EL HEADER =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const isLightMode = body.classList.contains('light-mode');
        
        if (scrolled > 100) {
            if (isLightMode) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(81, 21, 115, 0.3)';
            }
        } else {
            header.style.background = '';
            header.style.boxShadow = '';
        }
    });

    // ===== EFECTO HOVER EN PRODUCTOS =====
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== CARRUSEL MEJORADO =====
    const carousel = document.querySelector('#mainCarousel');
    if (carousel) {
        // Auto-play con pausa en hover
        carousel.addEventListener('mouseenter', () => {
            $(carousel).carousel('pause');
        });
        
        carousel.addEventListener('mouseleave', () => {
            $(carousel).carousel('cycle');
        });
    }

    // ===== BOTONES CON EFECTO RIPPLE =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animar elementos de entrada
        setTimeout(() => {
            document.querySelectorAll('.animate-on-load').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 100);
            });
        }, 500);
    });

    // ===== TOOLTIP PERSONALIZADO =====
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) tooltip.remove();
        });
    });

    // ===== MENÚ MÓVIL MEJORADO =====
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
            });
        });
    }

    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
});

// ===== FUNCIONES UTILITARIAS =====

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para validar formularios
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

// Función para animar números
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        }
    }, 16);
}