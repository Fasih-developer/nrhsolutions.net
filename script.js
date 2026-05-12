document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
});

function header(){
    document.addEventListener("DOMContentLoaded", () => {
    const menuOpen = document.getElementById("menu-open");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");

    const menuTl = gsap.timeline({ paused: true, reversed: true });

    menuTl.to(mobileMenu, {
        right: 0,
        duration: 0.6,
        ease: "expo.out"
    });

    menuTl.from(".mobile-nav__link", {
        x: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.3");

    menuOpen.addEventListener("click", () => menuTl.play());
    menuClose.addEventListener("click", () => menuTl.reverse());

    // Auto-close on link click
    document.querySelectorAll(".mobile-nav__link").forEach(link => {
        link.addEventListener("click", () => menuTl.reverse());
    });
});
}
function hero (){
const heroTl = gsap.timeline();

// 1. Image fade animation
heroTl.to(".hero__bg", {
    opacity: 1,
    duration: 1.5,
    ease: "power2.inOut"
})

// 2. Heading and text fade
.to(".hero__title", {
    opacity: 1,
    y: -20, // Subtle slide up
    duration: 1,
    ease: "power3.out"
}, "-=0.5") // Slight overlap with image fade

.to(".hero__description", {
    opacity: 1,
    y: -10,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")

// 3. Button fades with scaling
.to(".hero__actions", {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
}, "-=0.4");
}
function choose(){
const featureTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".features",
        start: "top 85%", 
    }
});
featureTl.from(".features__title", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

// 2. Animate cards TO visible state
featureTl.to(".feature-card", {
    autoAlpha: 1, // GSAP special property: handles both opacity and visibility
    scale: 1,
    duration: 0.8,
    stagger: 0.15, 
    ease: "back.out(1.2)",
    clearProps: "transform" // Clears GSAP styles after animation so CSS hover works perfectly
}, "-=0.4");
}
function stats(){
const statsSection = document.querySelector(".stats");
const counters = document.querySelectorAll(".stat-item__number");

const statsTl = gsap.timeline({
    scrollTrigger: {
        trigger: statsSection,
        start: "top 85%",
    }
});

counters.forEach((counter, index) => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    const isDecimal = counter.getAttribute("data-type") === "decimal";

    // Create an object to animate the value
    const obj = { value: 0 };

    statsTl.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
            // Update text based on type (integer or decimal)
            if (isDecimal) {
                counter.innerText = obj.value.toFixed(1) + suffix;
            } else {
                counter.innerText = Math.floor(obj.value) + suffix;
            }
        }
    }, index * 0.2); // This creates the "mid-way start" cycle (0.2s delay between starts)
});
}
function marquee(){
    // Add to script.js
const tickerSection = document.querySelector('.scrolling-text');

const tickerEntryTl = gsap.timeline({
    scrollTrigger: {
        trigger: tickerSection,
        start: "top 90%", // Triggers when section enters viewport
    }
});

    tickerEntryTl
    // 1. Reveal section instantly to stop blinking
    .to(tickerSection, { 
        autoAlpha: 1, 
        duration: 0.1 
    })
    // 3. Text fades and slides up mid-way through top border animation
    .from(".marquee-content span", { 
        opacity: 0, 
        y: 20,
        duration: 0.8, 
        stagger: {
            each: 0.05,
            from: "start"
        },
        ease: "power3.out"
    }, 0.4)
}
function slider(){
    document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Swiper
    const swiper = new Swiper('.services-swiper', {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false, 
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
        }
    });

    // 2. GSAP Loading Animation
    const servicesSection = document.querySelector('.services-slider');

    const servicesTl = gsap.timeline({
        scrollTrigger: {
            trigger: servicesSection,
            start: "top 80%", // Slightly earlier to ensure smooth load
        }
    });

    servicesTl
        // Instantly make the section visible (resolves the blink/FOUC)
        .set(servicesSection, { autoAlpha: 1 })
        
        // Heading
        .from(".section-header__title", {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.out"
        })
        // Line
        .from(".section-header__line", {
            width: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2")
        // Cards
        .from(".service-card", {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: {
                each: 0.1,
                from: "start"
            },
            ease: "back.out(1.2)",
            clearProps: "transform" // FIX: Strips GSAP inline styles so CSS hover works again
        }, "-=0.2")
        // CTA Button
        .from(".services-slider__cta", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "transform"
        }, "<"); // FIX: "<" forces this to start at the exact same time as the cards
});
}
function review(){
    // 1. Mobile-Only Swiper Logic
let testimonialSwiper;

const initTestimonialSwiper = () => {
    if (window.innerWidth <= 768) {
        // If mobile and Swiper isn't initialized yet, start it up
        if (!testimonialSwiper) {
            testimonialSwiper = new Swiper('.testimonials-swiper', {
                effect: 'fade', // Smooth cross-fade
                fadeEffect: {
                    crossFade: true
                },
                loop: true,
                autoHeight: true, // Adjusts height if reviews are different lengths
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                speed: 800 // Smooth transition speed
            });
        }
    } else {
        // If desktop and Swiper is running, kill it so the CSS Grid takes over
        if (testimonialSwiper) {
            testimonialSwiper.destroy(true, true);
            testimonialSwiper = undefined;
        }
    }
};

// Run on load and listen for screen resizing
initTestimonialSwiper();
window.addEventListener('resize', initTestimonialSwiper);


// 2. GSAP Loading Animation
const testSection = document.querySelector('.testimonials');

const testTl = gsap.timeline({
    scrollTrigger: {
        trigger: testSection,
        start: "top 80%",
    }
});

testTl
    // Instant reveal to kill FOUC
    .set(testSection, { autoAlpha: 1 })
    
    // Heading Fades down
    .from(".testimonials__title", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out"
    })
    
    // Subtext Fades up mid-way
    .from(".testimonials__desc", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.3")
    
    // Cards pop up with stagger
    .from(".testimonial-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: {
            each: 0.15,
            from: "start"
        },
        ease: "back.out(1.2)",
        clearProps: "transform" // Critical: Returns hover control to CSS
    }, "-=0.2");
}
function services_page(){
    const servicesPage = document.querySelector('.services-page');

if (servicesPage) { 
    gsap.set(servicesPage, { autoAlpha: 1 });

    // 2. Animate Header Elements
    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-page__header",
            start: "top 85%"
        }
    });

    headerTl
        .from(".services-page__title", {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: "power3.out"
        })
        .from([".services-page__desc", ".services-page__line"], {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4");

    gsap.from(".services-page__cta", {
        scrollTrigger: {
            trigger: ".services-page__cta",
            start: "top 90%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform"
    });
}
}
function contact(){
    // Add inside your DOMContentLoaded listener

const contactPage = document.querySelector('.contact-page');

if (contactPage) {
    // 1. Force reveal instantly to kill FOUC
    gsap.set(contactPage, { autoAlpha: 1 });

    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: contactPage,
            start: "top 85%"
        }
    });

    contactTl
        // 2. Animate Header Text (All fade)
        .from(".contact-page__title", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        })
        .from(".contact-page__desc", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.6")
        .from(".contact-page__line", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.6")
        
        // 3. Form Wrapper fades in
        .from(".contact-form__wrapper", {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut"
        }, "-=0.4")
        
        // 4. Input Fields fade in rapidly
        .from(".contact-form__group", {
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.inOut"
        }, "-=0.8")
        
        // 5. Button fades in
        .from(".contact-form__submit-wrapper", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.2");
}
}
function privacy_policy(){
    // Add inside your DOMContentLoaded listener

const privacyPage = document.querySelector('.privacy-page');

if (privacyPage) {
    // 1. Instantly reveal the section wrapper
    gsap.set(privacyPage, { autoAlpha: 1 });

    const privacyTl = gsap.timeline({
        scrollTrigger: {
            trigger: privacyPage,
            start: "top 85%"
        }
    });

    privacyTl
        // 2. Pure fade in for header
        .from(".privacy-page__header", {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut"
        })
        
        // 3. Pure fade in for the main white container
        .from(".privacy-page__content", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.6")

        // 4. Staggered fade in for each paragraph/section inside
        .from(".privacy-block", {
            opacity: 0,
            duration: 0.8,
            stagger: 0.15, // Gently fades them in one after another
            ease: "power2.inOut"
        }, "-=0.4");
}
}
function loader(){
    // --- PRELOADER ANIMATION SEQUENCE ---
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    
    if (preloader) {
        // Enforce a minimum spin time of 1 second for premium feel
        setTimeout(() => {
            const loaderTl = gsap.timeline();

            loaderTl
                // 1. Fade out the circular spinner
                .to(".preloader__spinner", { 
                    opacity: 0, 
                    duration: 0.3 
                })
                
                // 2. Make the logo wrapper visible (logo is still perfectly hidden by the box)
                .set(".preloader__logo-wrapper", { 
                    autoAlpha: 1 
                })
                
                // 3. Slide the matching background box to the right, revealing the logo!
                .to(".preloader__reveal-box", {
                    xPercent: 101, // Pushes it 100% to the right
                    duration: 1.2,
                    ease: "power3.inOut"
                })
                
                // 4. Short pause to admire the logo, then slide the whole dark background UP
                .to(".preloader", {
                    yPercent: -100, // Slides up out of view
                    duration: 1.2,
                    ease: "power4.inOut",
                    delay: 0.4 // The pause
                })
                
                // 5. Clean up: Restore scrolling and remove preloader from the DOM
                .call(() => {
                    document.body.classList.remove("loading");
                    preloader.style.display = "none";
                });

        }, 1000); // 1000ms = 1 second forced minimum loader spin
    }
});
}
function about_us(){
    // Add inside your DOMContentLoaded listener

const aboutPage = document.querySelector('.about-page');

if (aboutPage) {
    // 1. Force the section to become visible BEFORE the animation starts
    gsap.set(aboutPage, { autoAlpha: 1 });

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutPage,
            start: "top 85%" // Triggers when the section is 15% into the screen
        }
    });

    aboutTl
        // 2. Animate the NEW Main Header (ABOUT US)
        .from(".about-page__top-title", {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: "power2.out"
        })
        .from(".about-page__line", {
            width: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4")

        // 3. Animate Top Intro Text
        .from(".about-page__intro", {
            opacity: 0,
            y: 30, // Fades UP
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2")
        
        // 4. Animate the Question Heading
        .from(".about-page__title", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5") 
        
        // 5. Animate the Bottom Text
        .from(".about-page__desc", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
        
        // 6. Image Reveal (Fades in AND scales down to normal size)
        .fromTo(".about-page__image", 
            {
                opacity: 0,
                scale: 1.08 
            },
            {
                opacity: 1,
                scale: 1, 
                duration: 1.2,
                ease: "power3.out",
                clearProps: "all" // Cleans up GSAP inline styles after it finishes
            }, 
            "-=0.4"
        );
}
}
function portfolio(){
    // Add inside your DOMContentLoaded listener

const portfolioPage = document.querySelector('.portfolio-page');

if (portfolioPage) {
    // 1. Unhide Section
    gsap.set(portfolioPage, { autoAlpha: 1 });

    // --- SMART DELAY LOGIC ---
    // Protects the first row from animating blindly behind the preloader
    let isPreloading = true;
    setTimeout(() => {
        isPreloading = false;
    }, 4500); // 2.5 seconds to safely clear your loader's animation

    // 2. Animate Header Text
    const portHeaderTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".portfolio-page__header",
            start: "top 85%"
        }
    });

    // Check if we need to delay the header because the page just loaded
    const headerDelay = isPreloading ? 3.0 : 0;

    portHeaderTl
        .from(".portfolio-page__title", { 
            opacity: 0, 
            y: -30, 
            duration: 0.8, 
            delay: headerDelay, // Applies delay if preloader is running
            ease: "power3.out" 
        })
        .from([".portfolio-page__desc", ".portfolio-page__line"], { 
            opacity: 0, 
            y: 20, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out" 
        }, "-=0.4");

    // 3. Prepare Sliders for User Interaction
    const sliders = document.querySelectorAll('.before-after-slider');
    sliders.forEach(slider => {
        const input = slider.querySelector('.slider-input');
        
        input.addEventListener('input', (e) => {
            slider.style.setProperty('--position', `${e.target.value}%`);
        });
    });

    // 4. Batch Animation: Fade cards in, then AUTO-SLIDE them
    ScrollTrigger.batch(".bento-card", {
        start: "top 80%", 
        onEnter: (batch) => {
            // Check if this row is loading immediately with the page
            let cardBaseDelay = isPreloading ? 3.5 : 0;

            // First, fade the cards up
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: cardBaseDelay, // Applies delay ONLY to the first row on load
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "transform"
            });

            // Second, animate the slider input value inside those specific cards
            batch.forEach((card, index) => {
                const sliderInput = card.querySelector('.slider-input');
                const sliderContainer = card.querySelector('.before-after-slider');
                
                gsap.to(sliderInput, {
                    value: 0, 
                    duration: 1.5,
                    // Adds the smart delay + stagger time so it waits perfectly
                    delay: cardBaseDelay + 0.3 + (index * 0.1), 
                    ease: "power3.inOut",
                    onUpdate: function() {
                        sliderContainer.style.setProperty('--position', `${sliderInput.value}%`);
                    }
                });
            });
        }
    });
}
}
function unit(){
    // Add inside your DOMContentLoaded listener

const unitSection = document.querySelector('.unit-card');

if (unitSection) {
    // 1. Reveal section instantly (kill FOUC)
    gsap.set(unitSection, { autoAlpha: 1 });

    const unitTl = gsap.timeline({
        scrollTrigger: {
            trigger: unitSection,
            start: "top 85%"
        }
    });

    unitTl
        // 2. Main Heading Fades Down
        .from(".unit-card__title", {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: "power2.out"
        })
        
        // 3. The Before & After background boxes fade in
        .from(".unit-gallery-block", {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4")
        
        // 4. The Magic: Images Pop Up from the middle out!
        .from(".unit-grid img", {
            opacity: 0,
            scale: 0.5, // Start shrunken
            duration: 0.5,
            stagger: {
                each: 0.04, // Very fast cascade
                from: "center" // Animates from the middle images outwards
            },
            ease: "back.out(1.5)", // Bouncy pop effect
            clearProps: "all" // CRITICAL: Gives control back to CSS so your hover zoom works!
        }, "-=0.2")

        // 5. The "Before" and "After" text labels fade in last
        .from(".unit-label", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.2");
}

// Add this inside your DOMContentLoaded listener

const grassSection = document.querySelector('#lawn-maintenance .unit-card');

if (grassSection) {
    // Reveal section instantly
    gsap.set(grassSection, { autoAlpha: 1 });

    const grassTl = gsap.timeline({
        scrollTrigger: {
            trigger: grassSection,
            start: "top 85%"
        }
    });

    grassTl
        .from("#lawn-maintenance .unit-card__title", {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all" /* THIS FIXES THE INVISIBLE HEADING */
        })
        .from("#lawn-maintenance .unit-gallery-block", {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out",
            clearProps: "all" /* THIS FIXES THE INVISIBLE HEADING */

        }, "-=0.4")
        .from("#lawn-maintenance .unit-grid img", {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            stagger: {
                each: 0.1, // Slightly slower stagger since there are fewer images
                from: "center" 
            },
            ease: "back.out(1.5)",
            clearProps: "all"
        }, "-=0.2")
        .from("#lawn-maintenance .unit-label", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out",
           clearProps: "all" /* THIS FIXES THE INVISIBLE HEADING */

        }, "-=0.2");
}
}
header();
hero();
choose();
stats();
marquee();
slider();
review();
services_page();
contact();
privacy_policy();
loader();
about_us();
portfolio();
unit();