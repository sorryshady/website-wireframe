"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const text =
    "Elevate your digital presence with precision and care. From business websites and institutional apps to personal portfolios, we craft solutions that blend functionality with aesthetics. Leave the complexity to us—we transform ideas into reality, seamlessly and efficiently.";

  const splitWords = (phrase: string) => {
    return phrase.split(" ").map((word, i) => (
      <span
        key={i}
        ref={(el) => {
          refs.current.push(el);
        }}
        className="inline-block opacity-20 transition-colors duration-300 hover:text-purple-400"
      >
        {word}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  useGSAP(() => {
    // Animate title
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Animate text
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
        start: "top center",
        end: `+=${window.innerHeight / 3}`,
      },
      opacity: 1,
      stagger: 0.1,
      ease: "none",
    });

    // Continuous bounce animation for scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      className="about-section min-h-screen bg-black text-white flex flex-col justify-center items-center py-10 sm:py-20 relative"
      ref={containerRef}
    >
      <div className="max-w-[90vw] xl:max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-10 sm:mb-16 md:mb-20 text-center"
        >
          About Us
        </h2>

        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-loose sm:leading-loose md:leading-loose lg:leading-loose tracking-wider mb-20 sm:mb-24">
          {splitWords(text)}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60
         transition-opacity duration-300 mb-safe"
      >
        <span className="text-sm sm:text-base font-medium tracking-wider">
          KEEP SCROLLING
        </span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default About;
