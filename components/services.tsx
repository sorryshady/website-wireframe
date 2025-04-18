"use client";
import React, { useRef } from "react";
import { services } from "@/data/services";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const iconsRef = useRef<HTMLDivElement[]>([]);
  const scrollIndicatorRef = useRef(null);

  useGSAP(() => {
    // Initial animation for the heading
    gsap.from(".services-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-title",
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".services-description", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-description",
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    // Animate cards when they come into view
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.2,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Hover animations
    cardsRef.current.forEach((card, index) => {
      const icon = iconsRef.current[index];

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(icon, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
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
      className="services-section min-h-[100svh] bg-black text-white py-24 relative"
      ref={containerRef}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="services-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center font-mont">
            Services
          </h2>
          <p className="services-description text-xl sm:text-2xl text-gray-400 font-mont">
            Comprehensive solutions for your digital needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6">
          {/* First two - equal size */}
          <div
            key={services[0].id}
            ref={(el) => {
              if (el) cardsRef.current[0] = el;
            }}
            className="group relative overflow-hidden rounded-3xl bg-black border border-white/20 p-6 sm:p-8
              transition-all duration-300 hover:border-white/40 md:col-span-3"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div
                className="mb-4"
                ref={(el) => {
                  if (el) iconsRef.current[0] = el;
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                  rounded-2xl bg-white/5 text-white"
                >
                  {services[0].icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {services[0].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow">
                {services[0].description}
              </p>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10
              transition-all duration-500"
            />
          </div>
          <div
            key={services[1].id}
            ref={(el) => {
              if (el) cardsRef.current[1] = el;
            }}
            className="group relative overflow-hidden rounded-3xl bg-black border border-white/20 p-6 sm:p-8
              transition-all duration-300 hover:border-white/40 md:col-span-3"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div
                className="mb-4"
                ref={(el) => {
                  if (el) iconsRef.current[1] = el;
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                  rounded-2xl bg-white/5 text-white"
                >
                  {services[1].icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {services[1].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow">
                {services[1].description}
              </p>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10
              transition-all duration-500"
            />
          </div>

          {/* Middle two - uneven (2:4 split) */}
          <div
            key={services[2].id}
            ref={(el) => {
              if (el) cardsRef.current[2] = el;
            }}
            className="group relative overflow-hidden rounded-3xl bg-black border border-white/20 p-6 sm:p-8
              transition-all duration-300 hover:border-white/40 md:col-span-2"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div
                className="mb-4"
                ref={(el) => {
                  if (el) iconsRef.current[2] = el;
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                  rounded-2xl bg-white/5 text-white"
                >
                  {services[2].icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {services[2].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow">
                {services[2].description}
              </p>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10
              transition-all duration-500"
            />
          </div>
          <div
            key={services[3].id}
            ref={(el) => {
              if (el) cardsRef.current[3] = el;
            }}
            className="group relative overflow-hidden rounded-3xl bg-black border border-white/20 p-6 sm:p-8
              transition-all duration-300 hover:border-white/40 md:col-span-4"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div
                className="mb-4"
                ref={(el) => {
                  if (el) iconsRef.current[3] = el;
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                  rounded-2xl bg-white/5 text-white"
                >
                  {services[3].icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {services[3].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow">
                {services[3].description}
              </p>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10
              transition-all duration-500"
            />
          </div>

          {/* Last two - uneven (4:2 split) */}
          <div
            key={services[4].id}
            ref={(el) => {
              if (el) cardsRef.current[4] = el;
            }}
            className="group relative overflow-hidden rounded-3xl bg-black border border-white/20 p-6 sm:p-8
              transition-all duration-300 hover:border-white/40 md:col-span-4"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div
                className="mb-4"
                ref={(el) => {
                  if (el) iconsRef.current[4] = el;
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                  rounded-2xl bg-white/5 text-white"
                >
                  {services[4].icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {services[4].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow">
                {services[4].description}
              </p>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10
              transition-all duration-500"
            />
          </div>
          <div
            key={services[5].id}
            ref={(el) => {
              if (el) cardsRef.current[5] = el;
            }}
            className="group relative overflow-hidden rounded-3xl bg-black border border-white/20 p-6 sm:p-8
              transition-all duration-300 hover:border-white/40 md:col-span-2"
          >
            <div className="relative z-10 h-full flex flex-col">
              <div
                className="mb-4"
                ref={(el) => {
                  if (el) iconsRef.current[5] = el;
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                  rounded-2xl bg-white/5 text-white"
                >
                  {services[5].icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                {services[5].title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow">
                {services[5].description}
              </p>
            </div>

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent
              group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10
              transition-all duration-500"
            />
          </div>
        </div>
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

export default Services;
