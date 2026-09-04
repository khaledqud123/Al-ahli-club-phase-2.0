/* =========================================================
   AL AHLI CLUB — PHASE 2.0
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 700);
    });


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");
        document.body.classList.toggle("menu-open");

    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");
            document.body.classList.remove("menu-open");

        });

    });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

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


    /* =====================================================
       NUMBER COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = Number(counter.dataset.count);

                let current = 0;
                const duration = 1400;
                const startTime = performance.now();

                function animate(time) {

                    const progress = Math.min(
                        (time - startTime) / duration,
                        1
                    );

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    current = Math.floor(target * eased);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target;
                    }

                }

                requestAnimationFrame(animate);

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const scroll = window.scrollY;

        if (scroll < window.innerHeight) {

            const heroContent =
                hero.querySelector(".hero-content");

            if (heroContent) {
                heroContent.style.transform =
                    `translateY(${scroll * 0.12}px)`;
            }

        }

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const id =
                anchor.getAttribute("href");

            if (!id || id === "#") return;

            const target =
                document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       LANGUAGE SWITCH
    ===================================================== */

    const languageBtn =
        document.getElementById("languageBtn");

    languageBtn.addEventListener("click", () => {

        const html = document.documentElement;

        if (html.dir === "ltr") {

            html.dir = "rtl";
            html.lang = "ar";
            languageBtn.textContent = "EN";

        } else {

            html.dir = "ltr";
            html.lang = "en";
            languageBtn.textContent = "AR";

        }

    });


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    const bookingForm =
        document.getElementById("bookingForm");

    const formMessage =
        document.getElementById("formMessage");

    const bookingModal =
        document.getElementById("bookingModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalDone =
        document.getElementById("modalDone");


    bookingForm.addEventListener("submit", event => {

        event.preventDefault();

        const formData =
            new FormData(bookingForm);

        const name =
            formData.get("name");

        if (!name) return;

        formMessage.textContent =
            "Request prepared successfully.";

        bookingModal.classList.add("show");

        document.body.classList.add("menu-open");

        bookingForm.reset();

    });


    function closeModal() {

        bookingModal.classList.remove("show");
        document.body.classList.remove("menu-open");

    }

    modalClose.addEventListener("click", closeModal);
    modalDone.addEventListener("click", closeModal);


    bookingModal.addEventListener("click", event => {

        if (event.target === bookingModal) {
            closeModal();
        }

    });


    /* =====================================================
       PREVENT PAST BOOKING DATES
    ===================================================== */

    const dateInput =
        document.getElementById("date");

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;

    }


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const photoSections =
        document.querySelectorAll("[style*='background-image']");

    photoSections.forEach(section => {

        const style =
            section.getAttribute("style");

        const match =
            style.match(/url\(['"]?([^'")]+)['"]?\)/);

        if (!match) return;

        const imageUrl = match[1];

        const image =
            new Image();

        image.onload = () => {
            section.classList.add("image-loaded");
        };

        image.onerror = () => {

            section.style.backgroundImage =
                "linear-gradient(135deg,#161616,#303030)";

        };

        image.src = imageUrl;

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (bookingModal.classList.contains("show")) {
                closeModal();
            }

            if (mobileMenu.classList.contains("open")) {
                mobileMenu.classList.remove("open");
                document.body.classList.remove("menu-open");
            }

        }

    });

});
