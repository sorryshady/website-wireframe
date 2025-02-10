"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function NotFound() {
  const router = useRouter();
  const numberRef = useRef(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate the 404 number with a float effect
    gsap.to(numberRef.current, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Fade in text elements with stagger
    gsap.from(
      textRef.current?.children ? Array.from(textRef.current.children) : [],
      {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
    );

    // Animate the circle
    gsap.to(".circle", {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Subtle pulse animation for the background
    gsap.to(".bg-pulse", {
      scale: 1.1,
      opacity: 0.15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-mont">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="white"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="bg-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-purple-500 rounded-full opacity-10 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="z-10 text-center px-4" ref={textRef}>
        <h1
          ref={numberRef}
          className="text-[15vw] font-bold leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
        >
          404
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 opacity-80">
          Page not found
        </p>
        <p className="text-base sm:text-lg md:text-xl mb-12 max-w-md mx-auto opacity-60">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-4 bg-white text-black rounded-full font-medium
          hover:bg-gray-200 transition-colors duration-300 uppercase tracking-wider"
        >
          Back to Home
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-15"></div>
      <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 bg-white rounded-full animate-bounce opacity-10"></div>
    </div>
  );
}
