import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TextGradient = ({ text }: { text: string }) => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef = useRef(null);
  const containerRef = useRef(null);

  const splitWords = (phrase: string) => {
    const body: React.ReactElement[] = [];

    phrase.split(" ").forEach((word, i) => {
      const letters = splitLetters(word);

      body.push(
        <p
          className="text-[max(2rem,3.5vw)] m-0 mr-[1.5vw] font-bold"
          key={word + "_" + i}
        >
          {letters}
        </p>,
      );
    });

    return body;
  };
  const splitLetters = (word: string) => {
    const letters: React.ReactElement[] = [];

    word.split("").forEach((letter, i) => {
      letters.push(
        <span
          key={letter + "_" + i}
          ref={(el) => {
            refs.current.push(el);
          }}
          className="opacity-20"
        >
          {letter}
        </span>,
      );
    });

    return letters;
  };

  useGSAP(() => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
        start: "top",
        end: `+=${window.innerHeight / 3}`,
      },
      opacity: 1,
      ease: "none",
      stagger: 0.1,
    });
  });
  return (
    <div
      className="w-full h-screen bg-black flex justify-center items-center text-[rgb(211,211,211)]"
      ref={containerRef}
    >
      <div
        ref={bodyRef}
        className="w-[90%] flex flex-wrap justify-center text-center"
      >
        {splitWords(text)}
      </div>
    </div>
  );
};

export default TextGradient;
