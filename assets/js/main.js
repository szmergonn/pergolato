gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.normalizeScroll({
  type: "touch,wheel,pointer",
  momentum: (self) => Math.min(0.6, Math.abs(self.velocityY) / 2000),
});

const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  const sections = gsap.utils.toArray(".feature__slide");
  if (!sections.length) return;

  const track = document.querySelector(".feature") || sections[0].parentElement;
  if (!track) return;

  const speedFactor = 1.6;

  const horiz = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: track,
      pin: true,
      anticipatePin: 1,
      start: "top top",
      end: () => {
        const base = Math.max((track.scrollWidth || 0) - window.innerWidth, window.innerWidth * (sections.length - 1));
        return "+=" + base * speedFactor;
      },
      scrub: 1.2,
      snap: {
        snapTo: sections.length > 1 ? 1 / (sections.length - 1) : 1,
        duration: 0.35,
        ease: "power1.out",
      },
    },
  });
});

mm.add("(max-width: 767px)", () => {
});
