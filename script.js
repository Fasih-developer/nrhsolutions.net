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

header();
hero();
choose();