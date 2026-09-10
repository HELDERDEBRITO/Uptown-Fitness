// =========================================
// UPTOWN FITNESS - WEBSITE INTERACTIONS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    
        const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    // =========================================
    // 1. SMOOTH SCROLL
    // =========================================

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: scrollBehavior,
                    block: "start"
                });

            }

        });

    });


    // =========================================
    // 2. SCROLL REVEAL ANIMATIONS
    // =========================================

    const revealElements = document.querySelectorAll(
        ".section-label, .section h2, .about-layout, .training-card, .amenity-card, .membership-card, .coach-card, .testimonial-card, .gallery-item, .contact-content"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // =========================================
    // 3. HEADER ON SCROLL
    // =========================================

    const header = document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {

                header.classList.add("header-scrolled");

            } else {

                header.classList.remove("header-scrolled");

            }

        });

    }


    // =========================================
    // 4. BACK TO TOP
    // =========================================

    const backToTop = document.querySelector('a[href="#home"]');

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 700) {

                backToTop.classList.add("back-to-top-visible");

            } else {

                backToTop.classList.remove("back-to-top-visible");

            }

        });

    }


    // =========================================
    // 5. GALLERY LIGHTBOX
    // =========================================

    const galleryImages = document.querySelectorAll(".gallery-item img");

    if (galleryImages.length > 0) {

        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close image">
                &times;
            </button>

            <img class="lightbox-image" src="" alt="">
        `;

        document.body.appendChild(lightbox);


        const lightboxImage = lightbox.querySelector(".lightbox-image");
        const lightboxClose = lightbox.querySelector(".lightbox-close");


        galleryImages.forEach(image => {

            image.addEventListener("click", () => {

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.classList.add("lightbox-active");

                document.body.classList.add("lightbox-open");

            });

        });


        const closeLightbox = () => {

            lightbox.classList.remove("lightbox-active");

            document.body.classList.remove("lightbox-open");

        };


        lightboxClose.addEventListener("click", closeLightbox);


        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });


        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeLightbox();

            }

        });

    }


});