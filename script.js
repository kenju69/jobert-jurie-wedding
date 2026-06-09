document.addEventListener('DOMContentLoaded', () => {
    const openInviteBtn = document.getElementById('btnOpenInvite');
    const rsvpForm = document.getElementById('weddingRsvpForm');

    // 1. Interactive Sparkle Particles Engine (recreates the floating embers in image_79f923.png)
    const canvas = document.getElementById('sparkleCanvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 60;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = -(Math.random() * 0.4 + 0.2);
            this.speedX = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            // Loop from bottom if it flies out of the top viewport
            if (this.y < -10) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Cream gold glowing gradient style
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#C5A059';
            ctx.fill();
            ctx.restore();
        }
    }

    const initParticles = () => {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
            // Pre-fill canvas height so particles start distributed on-screen
            particles[i].y = Math.random() * canvas.height;
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();

    // 2. Smooth Scroll Opening
    if (openInviteBtn) {
        openInviteBtn.addEventListener('click', () => {
            const contentSection = document.getElementById('main-content');
            if (contentSection) {
                contentSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 3. Elegant Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run initially to check visible items

    // 4. Wedding Live Countdown Engine
    const weddingDate = new Date('December 12, 2026 15:30:00').getTime();
    
    const runCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').innerHTML = "<p style='font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-gold);'>Today is the Day!</p>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('mins').innerText = String(minutes).padStart(2, '0');
        document.getElementById('secs').innerText = String(seconds).padStart(2, '0');
    };
    
    const countdownInterval = setInterval(runCountdown, 1000);
    runCountdown(); // First tick

    // 5. Client-side Submission Engine with Elegant Modal Popup (Replacing legacy Alert dialogues)
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const name = document.getElementById('guestName').value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const notes = document.getElementById('dietaryNotes').value;

            // Form payload validation (ready for API binding)
            console.log("RSVP Record Created:", { name, attendance, notes });
            
            // Generate elegant double-bordered custom modal
            const customModal = document.createElement('div');
            customModal.style.position = 'fixed';
            customModal.style.top = '0';
            customModal.style.left = '0';
            customModal.style.width = '100%';
            customModal.style.height = '100%';
            customModal.style.backgroundColor = 'rgba(3, 28, 21, 0.7)';
            customModal.style.backdropFilter = 'blur(10px)';
            customModal.style.webkitBackdropFilter = 'blur(10px)';
            customModal.style.display = 'flex';
            customModal.style.justifyContent = 'center';
            customModal.style.alignItems = 'center';
            customModal.style.zIndex = '9999';
            customModal.style.opacity = '0';
            customModal.style.transition = 'opacity 0.4s ease';

            const modalContent = document.createElement('div');
            modalContent.style.backgroundColor = '#092d24';
            modalContent.style.padding = '50px 40px';
            modalContent.style.textAlign = 'center';
            modalContent.style.maxWidth = '450px';
            modalContent.style.width = '90%';
            modalContent.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)';
            modalContent.style.border = '1px solid rgba(250, 249, 246, 0.15)';
            modalContent.style.borderRadius = '24px';
            modalContent.style.position = 'relative';
            modalContent.style.transform = 'translateY(20px)';
            modalContent.style.transition = 'transform 0.4s ease';

            // Fine gold inner lining
            const innerBorder = document.createElement('div');
            innerBorder.style.position = 'absolute';
            innerBorder.style.top = '6px';
            innerBorder.style.left = '6px';
            innerBorder.style.right = '6px';
            innerBorder.style.bottom = '6px';
            innerBorder.style.border = '1px solid #C5A059';
            innerBorder.style.pointerEvents = 'none';
            innerBorder.style.opacity = '0.35';
            innerBorder.style.borderRadius = '20px';
            modalContent.appendChild(innerBorder);

            const heading = document.createElement('h3');
            heading.innerText = 'Thank You!';
            heading.style.fontFamily = 'Cormorant Garamond, serif';
            heading.style.fontSize = '2.4rem';
            heading.style.fontWeight = '300';
            heading.style.letterSpacing = '2px';
            heading.style.marginBottom = '15px';
            heading.style.color = '#C5A059';

            const message = document.createElement('p');
            message.innerText = `Your RSVP response has been successfully sent, ${name}. We look forward to celebrating with you!`;
            message.style.fontFamily = 'Montserrat, sans-serif';
            message.style.fontSize = '0.95rem';
            message.style.fontWeight = '300';
            message.style.marginBottom = '30px';
            message.style.lineHeight = '1.6';
            message.style.color = '#FAF9F6';

            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close';
            closeButton.style.backgroundColor = '#094F3C';
            closeButton.style.color = '#FFFFFF';
            closeButton.style.border = '1px solid #C5A059';
            closeButton.style.padding = '12px 35px';
            closeButton.style.fontFamily = 'Montserrat, sans-serif';
            closeButton.style.textTransform = 'uppercase';
            closeButton.style.fontSize = '0.8rem';
            closeButton.style.letterSpacing = '2px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.borderRadius = '30px';
            closeButton.style.transition = 'all 0.3s';

            closeButton.addEventListener('mouseenter', () => {
                closeButton.style.backgroundColor = '#C5A059';
                closeButton.style.color = '#094F3C';
            });
            closeButton.addEventListener('mouseleave', () => {
                closeButton.style.backgroundColor = '#094F3C';
                closeButton.style.color = '#FFFFFF';
            });

            closeButton.addEventListener('click', () => {
                customModal.style.opacity = '0';
                modalContent.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    document.body.removeChild(customModal);
                }, 400);
            });

            modalContent.appendChild(heading);
            modalContent.appendChild(message);
            modalContent.appendChild(closeButton);
            customModal.appendChild(modalContent);
            document.body.appendChild(customModal);

            // Fade in animations
            setTimeout(() => {
                customModal.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 50);

            rsvpForm.reset();
        });
    }
});