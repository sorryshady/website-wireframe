"use client";
import { useRef, useState } from "react";
import Preloader from "@/components/preloader";
import Footer from "@/components/footer";
import TextTrial from "@/components/text-trial";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextGradient from "@/components/text-gradient";
import Image from "next/image";
import Horizontal from "@/components/horizontal";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const textRef = useRef(null);
  const mainRef = useRef(null);
  const tagRef = useRef(null);
  const [colorMode, setColorMode] = useState(false); // false = light, true = dark

  useGSAP(() => {
    if (!isLoading) {
      // Text animation
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: -100,
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          delay: 0.5,
        },
      );

      gsap.fromTo(
        tagRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          delay: 0.5,
        },
      );

      // Universal color change triggers
      ScrollTrigger.create({
        trigger: ".second-section",
        start: "top 75%",
        onEnter: () => setColorMode(true),
        onLeaveBack: () => setColorMode(false),
      });

      ScrollTrigger.create({
        trigger: ".third-section",
        start: "top 75%",
        onEnter: () => setColorMode(false),
        onLeaveBack: () => setColorMode(true),
      });
      ScrollTrigger.create({
        trigger: ".fourth-section",
        start: "top 75%",
        onEnter: () => setColorMode(true),
        onLeaveBack: () => setColorMode(false),
      });
    }
  }, [isLoading]);

  return (
    <main
      className={`relative w-full min-h-screen transition-colors duration-500 overflow-x-hidden ${
        colorMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      ref={mainRef}
    >
      <Preloader setIsLoading={setIsLoading} colorMode={colorMode} />

      {!isLoading && (
        <>
          <div
            className={`absolute top-0 w-full min-h-screen overflow-x-hidden z-[1] font-mono flex uppercase flex-col justify-between items-center text-sm ${
              colorMode ? "text-white" : "text-black"
            }`}
          >
            <div
              className={`w-full fixed top-0 left-0 flex justify-between items-center text-center p-4 backdrop-blur-md bg-opacity-70 ${colorMode ? "bg-black" : "bg-white"} z-50`}
            >
              <div className="text-3xl font-medium">
                <Image
                  src="/logo.svg"
                  alt="ERNYG Logo"
                  width={95}
                  height={31}
                  className={`transition-colors duration-500 ${colorMode ? "invert-0" : "invert"}`}
                />
              </div>
              <div className="nav-items">
                <a
                  href="#"
                  className={`no-underline pr-16 ${colorMode ? "text-white" : "text-black"}`}
                >
                  <TextTrial
                    className={colorMode ? "text-white" : "text-black"}
                  >
                    About
                  </TextTrial>
                </a>
                <a
                  href="#"
                  className={`no-underline pr-16 ${colorMode ? "text-white" : "text-black"}`}
                >
                  <TextTrial
                    className={colorMode ? "text-white" : "text-black"}
                  >
                    Services
                  </TextTrial>
                </a>
                <a
                  href="#"
                  className={`no-underline pr-16 ${colorMode ? "text-white" : "text-black"}`}
                >
                  <TextTrial
                    className={colorMode ? "text-white" : "text-black"}
                  >
                    Projects
                  </TextTrial>
                </a>
                <a
                  href="#"
                  className={`no-underline ${colorMode ? "text-white" : "text-black"}`}
                >
                  <TextTrial
                    className={colorMode ? "text-white" : "text-black"}
                  >
                    Contact
                  </TextTrial>
                </a>
              </div>
            </div>
            <div
              className={`absolute w-full top-[25%] left-1/2 transform -translate-x-1/2 text-[1.5vw] font-medium leading-none p-4 overflow-hidden ${
                colorMode ? "text-white" : "text-black"
              }`}
            >
              <div className="text-center" ref={tagRef}>
                <h2 className="text-4xl tracking-wider font-bold">
                  Design.Develop.Simplify
                </h2>
              </div>
            </div>
            <div
              className={`absolute bottom-[35%] md:bottom-[30%] lg:bottom-[25%] left-1/2 transform -translate-x-1/2  text-[5vw] font-medium leading-none tracking-tighter p-4 overflow-hidden ${
                colorMode ? "text-white" : "text-black"
              }`}
            >
              <div className="flex flex-col items-center gap-8" ref={textRef}>
                <h1 className="text-4xl tracking-normal font-bold">
                  BRINGING IDEAS TO LIFE
                </h1>
                <button
                  className={`px-8 py-4 text-xl rounded-full transition-colors duration-500 uppercase tracking-wider ${
                    colorMode
                      ? "bg-white text-black hover:bg-gray-300"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Let&apos;s Create Together
                </button>
              </div>
            </div>
            <div className="w-full absolute bottom-0 left-0 flex justify-between items-center text-center p-4">
              <p>Full Stack Development</p>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <p>Based in India</p>
              </div>
              <p>Ernyg © {new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="w-full h-screen flex flex-col justify-center items-center second-section">
            <div className="text-4xl">Random</div>
          </div>
          <div className="w-full h-screen flex flex-col justify-center items-center third-section">
            <div className="text-4xl">Third Random</div>
          </div>
          <div className="fourth-section">
            <TextGradient text="This is some long ass random text message to see if this shit works. Hopefully it works. Coz if it does it will be nice else it will suck. But alas what can i do?" />
          </div>
          <section className="w-full h-screen flex flex-nowrap items-center projects-container">
            <Horizontal />
          </section>
          <Footer />
        </>
      )}
    </main>
  );
}
