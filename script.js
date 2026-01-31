// =============================================
// LANDING PAGE - CASAMENTO NATALY & JOÃO
// JavaScript com Animações Avançadas
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initCustomCursor();
    initParticles();
    initCountdown();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initAOS();
    initMagneticButtons();
    init3DHover();
    initCardGlow();
    initFormValidation();
    initTimelineProgress();
    initParallax();
    initNumberCountUp();
});

// =============================================
// LOADER
// =============================================
function initLoader() {
    const loader = document.getElementById('loader');
    document.body.classList.add('loading');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 2000);
    });

    // Fallback se a página demorar muito
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 5000);
}

// =============================================
// CUSTOM CURSOR
// =============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    if (!cursor || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor principal - mais responsivo
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower - mais suave
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .gallery-item, .info-card, .gift-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// =============================================
// PARTICLES
// =============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 10;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
}

// =============================================
// COUNTDOWN TIMER
// =============================================
function initCountdown() {
    // Data do casamento: 02 de Maio de 2026 às 16:00
    const weddingDate = new Date('2026-05-02T16:00:00').getTime();

    const elements = {
        months: document.getElementById('months'),
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    let previousValues = {
        months: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    };

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = `
                <div class="countdown-message">
                    <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--color-primary);">
                        O grande dia chegou!
                    </h3>
                </div>
            `;
            return;
        }

        // Cálculos
        const values = {
            months: Math.floor(distance / (1000 * 60 * 60 * 24 * 30)),
            days: Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };

        // Atualizar DOM com animação de flip
        Object.keys(values).forEach(key => {
            if (elements[key] && values[key] !== previousValues[key]) {
                updateElement(elements[key], values[key]);
                previousValues[key] = values[key];
            }
        });
    }

    function updateElement(element, value) {
        element.classList.add('flip');
        element.textContent = value.toString().padStart(2, '0');

        setTimeout(() => {
            element.classList.remove('flip');
        }, 300);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// =============================================
// MOBILE MENU
// =============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// =============================================
// SMOOTH SCROLL
// =============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
function initScrollAnimations() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Header scroll effect
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// =============================================
// AOS (Animate On Scroll) - Custom Implementation
// =============================================
function initAOS() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        // Set transition duration and timing
        const duration = el.dataset.aosDuration || '800';
        el.style.transitionDuration = duration + 'ms';
        el.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Also observe section titles
    document.querySelectorAll('.section-title').forEach(el => {
        observer.observe(el);
        el.addEventListener('aos-in', () => {
            el.classList.add('in-view');
        });
    });
}

// =============================================
// MAGNETIC BUTTONS
// =============================================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// =============================================
// 3D HOVER EFFECT
// =============================================
function init3DHover() {
    const cards = document.querySelectorAll('.hover-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            const inner = this.querySelector('.card-inner, .image-wrapper');
            if (inner) {
                inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            const inner = this.querySelector('.card-inner, .image-wrapper');
            if (inner) {
                inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            }
        });
    });
}

// =============================================
// CARD GLOW EFFECT
// =============================================
function initCardGlow() {
    const cards = document.querySelectorAll('.info-card, .gift-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// =============================================
// FORM VALIDATION & SUBMISSION
// =============================================
function initFormValidation() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxk3AawfXFnQakEME9siSYG7fGI05WVDXpSMExujwnmPFJ_RnkBi56Ll3OcR9iy9RQsWw/exec';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            nome: formData.get('name') || '',
            telefone: formData.get('phone') || '',
            acompanhantes: formData.get('guests') || '',
            presenca: formData.get('attendance') === 'yes' ? 'Sim' : 'Não',
            mensagem: formData.get('message') || ''
        };

        // Validar campos obrigatórios
        if (!data.nome || !formData.get('attendance')) {
            showToast('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Mostrar loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Enviar para Google Sheets
        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            // Esconder formulário e mostrar mensagem de sucesso
            const successMsg = document.getElementById('rsvpSuccess');
            form.style.display = 'none';
            successMsg.style.display = 'block';

            // Scroll suave para a mensagem de sucesso
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch((error) => {
            console.error('Erro:', error);
            showToast('Erro ao enviar. Tente novamente.');
        })
        .finally(() => {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    // Floating label animations
    form.querySelectorAll('.form-group.floating input, .form-group.floating textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').classList.remove('focused');
            }
        });
    });
}

// =============================================
// TOAST NOTIFICATIONS
// =============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// =============================================
// COPY PIX KEY
// =============================================
function copyPix() {
    const pixKey = document.getElementById('pixKey').textContent;

    navigator.clipboard.writeText(pixKey).then(() => {
        showToast('Chave PIX copiada!');
    }).catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Chave PIX copiada!');
    });
}

// Tornar função global
window.copyPix = copyPix;

// =============================================
// SELECT GIFT
// =============================================
function selectGift(giftName, giftValue) {
    const pixKey = document.getElementById('pixKey').textContent;
    const formattedValue = giftValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Copiar chave PIX
    navigator.clipboard.writeText(pixKey).then(() => {
        showToast(`${giftName} selecionado! Chave PIX copiada. Valor: ${formattedValue}`);

        // Scroll suave para a seção do PIX
        const pixSection = document.querySelector('.pix-section');
        if (pixSection) {
            setTimeout(() => {
                pixSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }).catch(() => {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = pixKey;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`${giftName} selecionado! Chave PIX copiada. Valor: ${formattedValue}`);
    });
}

// Tornar função global
window.selectGift = selectGift;

// =============================================
// TIMELINE PROGRESS
// =============================================
function initTimelineProgress() {
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineSection = document.querySelector('.timeline-section');

    if (!timelineProgress || !timelineSection) return;

    window.addEventListener('scroll', function() {
        const rect = timelineSection.getBoundingClientRect();
        const sectionHeight = timelineSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calcular progresso baseado na posição do scroll na seção
        let progress = 0;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrolledInSection = windowHeight - rect.top;
            const totalScrollable = sectionHeight + windowHeight;
            progress = Math.min(Math.max((scrolledInSection / totalScrollable) * 100, 0), 100);
        } else if (rect.bottom <= 0) {
            progress = 100;
        }

        timelineProgress.style.height = progress + '%';
    });
}

// =============================================
// PARALLAX EFFECT
// =============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const rect = el.parentElement.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// =============================================
// NUMBER COUNT UP ANIMATION
// =============================================
function initNumberCountUp() {
    const dateNumbers = document.querySelectorAll('.date-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.dataset.count);
                animateValue(target, 0, endValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    dateNumbers.forEach(num => observer.observe(num));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * easeOut);

        element.textContent = current.toString().padStart(end.toString().length, '0');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// =============================================
// REVEAL ANIMATIONS ON SCROLL
// =============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.title-reveal, .date-reveal, .phrase-reveal');

    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            el.style.animationPlayState = 'running';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run on load

// =============================================
// SMOOTH SCROLL REVEAL
// =============================================
(function() {
    const smoothReveal = () => {
        const elements = document.querySelectorAll('.section-subtitle');

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.style.animationPlayState = 'running';
            }
        });
    };

    window.addEventListener('scroll', smoothReveal);
    smoothReveal();
})();
