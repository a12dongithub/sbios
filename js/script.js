document.addEventListener('DOMContentLoaded', function() {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        offset: 100,   // Offset (in px) from the original trigger point
        once: true,    // Whether animation should happen only once - while scrolling down
        easing: 'ease-in-out', // Default easing
    });

    // --- START OF TYPING EFFECT CODE ---
    const typingTarget = document.getElementById('typing-target');
    if (typingTarget) {
        const phrases = [
            "Bioinformatics Consultation", // Example phrases
            "Spatial Transcriptomics",
            "Equitable Biomarkers",
            "Data Analysis"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBeforeNextPhrase = 1500;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            typingTarget.classList.add('blinking-cursor');

            if (isDeleting) {
                // Deleting
                typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeEffect, typingSpeed);
                } else {
                    setTimeout(typeEffect, deletingSpeed);
                }
            } else {
                // Typing
                typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, delayBeforeNextPhrase);
                } else {
                    setTimeout(typeEffect, typingSpeed);
                }
            }
        }
        setTimeout(typeEffect, 500); // Start after delay
    }
    // --- END OF TYPING EFFECT CODE ---


    // --- START OF JS LOGO SLIDER CODE ---
    const sliderContainer = document.querySelector('.logo-slider-container');
    const sliderTrack = document.querySelector('.logo-slider-track');

    if (sliderContainer && sliderTrack && sliderTrack.children.length > 0) {
        let scrollAmount = 0;
        let animationFrameId = null;
        let isPaused = false;
        const scrollSpeed = 0.5; // Adjust speed (pixels per frame, lower is slower)
        let originalWidth = 0;
        let cloneCount = 2; // How many times to clone the set (2 means 3 sets total)

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Function to clone logos
        const cloneLogos = () => {
            const logos = sliderTrack.querySelectorAll('.logo-slide');
            for (let i = 0; i < cloneCount; i++) {
                logos.forEach(logo => {
                    const clone = logo.cloneNode(true);
                    sliderTrack.appendChild(clone);
                });
            }
        };

        // Function to calculate width of the original set
        const calculateOriginalWidth = () => {
            let width = 0;
            const originalLogos = sliderTrack.querySelectorAll('.logo-slide');
            // Calculate based on initial number of logos before cloning
            const originalCount = originalLogos.length / (cloneCount + 1);
            for(let i = 0; i < originalCount; i++) {
                if (originalLogos[i]) {
                     width += originalLogos[i].offsetWidth;
                }
            }
            return width;
        };

        // Animation step function
        const step = () => {
            if (isPaused || prefersReducedMotion) { // Also pause if reduced motion is preferred
                animationFrameId = requestAnimationFrame(step);
                return;
            }

            scrollAmount -= scrollSpeed;
            if (Math.abs(scrollAmount) >= originalWidth) {
                scrollAmount += originalWidth; // Reset position seamlessly using addition
            }

            sliderTrack.style.transform = `translateX(${scrollAmount}px)`;
            animationFrameId = requestAnimationFrame(step);
        };

        // Function to initialize and start the slider
        const initSlider = () => {
            stopSlider(); // Stop any previous instance
            cloneLogos(); // Clone the logos

            // Delay calculation slightly to allow layout to settle
            setTimeout(() => {
                originalWidth = calculateOriginalWidth();
                if (originalWidth > 0 && !prefersReducedMotion) { // Only animate if width is valid and motion is ok
                    scrollAmount = 0; // Reset scroll position
                    sliderTrack.style.transform = `translateX(0px)`;
                    animationFrameId = requestAnimationFrame(step);
                } else if (originalWidth <= 0) {
                    console.error("Logo slider original width calculation failed.");
                }
            }, 150); // Increased delay slightly
        };

        // Function to stop the slider animation
        const stopSlider = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        // Event listeners for pausing
        sliderContainer.addEventListener('mouseenter', () => isPaused = true);
        sliderContainer.addEventListener('mouseleave', () => isPaused = false);
        sliderContainer.addEventListener('touchstart', () => isPaused = true, { passive: true });
        sliderContainer.addEventListener('touchend', () => isPaused = false);
        sliderContainer.addEventListener('touchcancel', () => isPaused = false);

        // Initialize the slider
        initSlider();

        // Re-initialize on resize (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            stopSlider();
            // Recalculate width without re-cloning (assuming DOM hasn't changed drastically)
            originalWidth = calculateOriginalWidth();
            scrollAmount = 0; // Reset scroll position visually
            sliderTrack.style.transform = `translateX(0px)`;

            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (originalWidth > 0 && !prefersReducedMotion) {
                     animationFrameId = requestAnimationFrame(step); // Restart animation
                } else if (originalWidth <= 0) {
                     console.error("Logo slider width recalculation failed on resize.");
                }
            }, 250);
        });

    } else {
        if (!sliderContainer) console.error("Slider container not found.");
        if (!sliderTrack) console.error("Slider track not found.");
        if (sliderTrack && sliderTrack.children.length === 0) console.warn("Slider track has no logos.");
    }
    // --- END OF JS LOGO SLIDER CODE ---


    // --- START OF SMOOTH SCROLL CODE ---
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .hero-section a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            try {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                } else {
                     console.warn(`Smooth scroll target element not found for selector: ${targetId}`);
                }
            } catch(error) {
                 console.error(`Error finding smooth scroll target: ${targetId}`, error);
            }
        });
    });
    // --- END OF SMOOTH SCROLL CODE ---


    // --- START OF CONTACT FORM CODE ---
    // No specific JS needed here for basic Formspree submission.
    // The HTML form action/method attributes handle it.
    // If you needed AJAX submission with custom feedback later, you would uncomment
    // and modify the event listener, making sure to PREVENT default submission.
    const contactForm = document.getElementById('contact-form');
     if (contactForm) {
        // console.log("Contact form found. Using HTML/Formspree submission.");
        // NO LISTENER NEEDED FOR STANDARD SUBMIT
     }
    // --- END OF CONTACT FORM CODE ---

}); // End DOMContentLoaded