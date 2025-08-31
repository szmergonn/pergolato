gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.defaults({ markers: true });

ScrollTrigger.normalizeScroll(true);

const mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
  const sections = gsap.utils.toArray(".feature__slide");
  if (sections.length < 2) return;

  const horiz = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".feature",
      pin: true,         
      scrub: 0.35,                      
      snap: 1 / (sections.length - 1),
      end: () => "+=" + (window.innerWidth * (sections.length - 1)),
      invalidateOnRefresh: true
    }
  });

  sections.forEach((panel, i) => {
    const inner = panel.querySelector(".inner");
    if (!inner) return;

    gsap.timeline({
      scrollTrigger: {
        containerAnimation: horiz,
        trigger: panel,
        start: () => (i / (sections.length - 1)) * 100 + "% center",
        end:   () => ((i + 0.5) / (sections.length - 1)) * 100 + "% center",
        toggleActions: "play none none reverse"
      }
    }).to(inner, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 0);
  });
});
