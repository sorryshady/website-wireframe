"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Preloader = ({
  setIsLoading,
}: {
  setIsLoading: (value: boolean) => void;
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from([topRef.current, bottomRef.current], {
        duration: 2,
        delay: 1,
        height: "50vh",
        ease: "power4.inOut",
      });
      gsap.to(".marquee", {
        duration: 3.5,
        delay: 0.75,
        top: "50%",
        ease: "power4.inOut",
      });
      gsap.from(
        [
          topRef.current?.querySelector(".marquee"),
          bottomRef.current?.querySelector(".marquee"),
        ],
        {
          duration: 5,
          delay: 1,
          left: "100%",
          ease: "power3.inOut",
        },
      );
      gsap.from([centerRef.current?.querySelector(".marquee")], {
        duration: 5,
        delay: 1,
        left: "-50%",
        ease: "power3.inOut",
      });
      gsap.to([topRef.current], {
        duration: 2,
        delay: 6,
        clipPath: "inset(0 0 100% 0)",
        ease: "power4.inOut",
      });
      gsap.to([bottomRef.current], {
        duration: 2,
        delay: 6,
        clipPath: "inset(100% 0 0 0)",
        ease: "power4.inOut",
      });
      gsap.to(
        [
          topRef.current?.querySelector(".marquee"),
          bottomRef.current?.querySelector(".marquee"),
          centerRef.current?.querySelectorAll("span"),
        ],
        {
          duration: 1,
          delay: 6,
          opacity: 0,
          ease: "power2.inOut",
        },
      );
      gsap.to([centerRef.current?.querySelector(".marquee-container")], {
        duration: 1,
        delay: 6.5,
        scale: 1.5,
        y: -100, // Move up by 100 pixels
        ease: "power2.inOut",
        onComplete: () => setIsLoading(false),
      });
    },
    { scope: loaderRef },
  );
  return (
    <div className="loader w-screen h-screen" ref={loaderRef}>
      <div
        className=" absolute top-0 w-full h-1/3 overflow-clip z-[10000] bg-black clip-path-[inset(0_0_0_0)]"
        ref={topRef}
      >
        <div className="marquee absolute top-[200%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] text-white mix-blend-difference text-[10vw]">
          <div className="marquee-container w-full pt-[0.2em] flex justify-between items-center">
            <span>Ernyg®</span>
            <span>Ernyg®</span>
            Ernyg®
            <span>Ernyg®</span>
            <span>Ernyg®</span>
          </div>
        </div>
      </div>
      <div
        className="top-1/3 w-full h-1/3 overflow-hidden relative bg-white"
        ref={centerRef}
      >
        <div className="marquee absolute top-[200%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] text-white mix-blend-difference text-[10vw]">
          <div className="marquee-container w-full pt-[0.2em] flex justify-between items-center">
            <span>Ernyg®</span>
            <span>Ernyg®</span>
            Ernyg®
            <span>Ernyg®</span>
            <span>Ernyg®</span>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full h-1/3 overflow-clip z-[10000] bg-black clip-path-[inset(0_0_0_0)]"
        ref={bottomRef}
      >
        <div className="marquee absolute top-[200%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] text-white mix-blend-difference text-[10vw]">
          <div className="marquee-container w-full pt-[0.2em] flex justify-between items-center">
            <span>Ernyg®</span>
            <span>Ernyg®</span>
            Ernyg®
            <span>Ernyg®</span>
            <span>Ernyg®</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
