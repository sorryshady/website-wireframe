"use client";
import { useRef, useState } from "react";
import Preloader from "@/components/preloader";
import Footer from "@/components/footer";
import TextTrial from "@/components/text-trial";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Projects from "@/components/projects";
import Services from "@/components/services";
import About from "@/components/about";
import { useLenis } from "lenis/react";
import Contact from "@/components/contact";
import MobileMenu from "@/components/mobile-menu";
import { useRouter } from "next/navigation";
import Blog from "@/components/blog";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textRef = useRef(null);
  const mainRef = useRef(null);
  const tagRef = useRef(null);
  const [colorMode, setColorMode] = useState(false); // false = light, true = dark
  const lenis = useLenis();
  const router = useRouter();

  const smoothScrollTo = (element: HTMLElement, duration: number) => {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + window.pageYOffset;
    const distance = target - start;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function for smooth animation
      const ease = (t: number) => t * (2 - t);

      window.scrollTo(0, start + distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const navigationHandler = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      // First close the menu if it's open
      setIsMenuOpen(false);

      // Check if we're on mobile
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // For mobile, use custom smooth scroll with longer duration
        smoothScrollTo(element, 1500); // 1.5 seconds duration
      } else {
        // For desktop, use Lenis
        lenis!.scrollTo(element, {
          offset: 0,
          duration: 1.5,
          easing: (t) => t * (2 - t),
          immediate: false,
          lock: false,
        });
      }
    }
  };
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
        trigger: ".about-section",
        start: "top 75%",
        onEnter: () => setColorMode(true),
        onLeaveBack: () => setColorMode(false),
      });
    }
  }, [isLoading]);

  return (
    <main
      className={`relative w-full min-h-[100svh] transition-colors duration-500 overflow-x-hidden ${
        colorMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      ref={mainRef}
    >
      <Preloader setIsLoading={setIsLoading} colorMode={colorMode} />

      {!isLoading && (
        <>
          <section
            className={`absolute top-0 w-full h-[100svh] overflow-x-hidden z-[1] font-mono flex flex-col justify-between items-center text-sm ${
              colorMode ? "text-white" : "text-black"
            }`}
            id="hero"
          >
            <div
              className={`w-full lg:w-[85%] mx-auto fixed top-0 left-0 right-0 flex justify-between items-center text-center p-4 md:p-6 backdrop-blur-md bg-opacity-70 bg-transparent z-50`}
            >
              <div className="text-3xl font-medium">
                <Image
                  src="/logo.svg"
                  alt="ERNYG Logo"
                  width={95}
                  height={31}
                  className={`transition-colors duration-500 ${colorMode ? "invert-0" : "invert"} cursor-pointer`}
                  onClick={() => navigationHandler("hero")}
                />
              </div>
              <div className="nav-items hidden md:flex">
                {["About", "Services", "Projects", "Blog", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      className={`no-underline text-[16px] leading-[20px] px-6 lg:px-16 uppercase ${colorMode ? "text-white" : "text-black"}`}
                      onClick={() => navigationHandler(item.toLowerCase())}
                    >
                      <TextTrial
                        className={colorMode ? "text-white" : "text-black"}
                      >
                        {item}
                      </TextTrial>
                    </button>
                  ),
                )}
              </div>
              <MobileMenu
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                colorMode={colorMode}
                navigationHandler={navigationHandler}
              />
            </div>
            <div
              className={`absolute w-full top-[25%] left-1/2 transform -translate-x-1/2 text-base sm:text-lg md:text-xl font-medium leading-none p-4 overflow-hidden ${
                colorMode ? "text-white" : "text-black"
              }`}
            >
              <div className="text-center" ref={tagRef}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl  tracking-wider font-mont font-medium">
                  Design.Develop.Simplify
                </h2>
              </div>
            </div>
            <div
              className={`w-[90%] absolute bottom-[35%] md:bottom-[30%] lg:bottom-[25%] left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-[5vw] font-medium leading-none tracking-tighter p-4 overflow-hidden ${
                colorMode ? "text-white" : "text-black"
              }`}
            >
              <div
                className="flex flex-col items-center gap-6 md:gap-8"
                ref={textRef}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl md:mb-7 tracking-normal text-center font-mont font-medium">
                  Where design and art meets code.
                </h1>
                <button
                  className={`px-6 py-3 md:px-8 md:py-4 text-base sm:text-lg md:text-xl rounded-full transition-colors duration-500 uppercase tracking-wider font-mont font-medium ${
                    colorMode
                      ? "bg-white text-black hover:bg-gray-300"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigationHandler("contact");
                  }}
                >
                  Let&apos;s Create Together
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[85%] mx-auto absolute bottom-0 left-0 right-0 flex justify-between items-start text-center p-8 text-xs sm:text-sm md:text-base uppercase font-mont">
              <p className="w-1/2 sm:w-1/3 text-left tracking-tighter flex flex-col lg:flex-row gap-1">
                <span>Born in India.</span>
                <span>Built for the Globe.</span>
              </p>
              <p className="hidden sm:block w-1/3 mx-auto tracking-tighter">
                UI/UX DESIGN <span className="mx-2 font-semibold">|</span> FULL
                STACK DEVELOPMENT <span className="mx-2 font-semibold">|</span>
                ILLUSTRATIONS
              </p>
              <p className="w-1/2 sm:w-1/3 text-right tracking-tighter">
                Ernyg © {new Date().getFullYear()}
              </p>
            </div>
          </section>
          <section className="relative" id="about">
            <About />
          </section>
          <section className="relative" id="services">
            <Services />
          </section>
          <section
            className="w-full h-screen flex flex-nowrap items-center projects-container"
            id="projects"
          >
            <Projects />
          </section>
          <section className="relative" id="blog">
            <Blog />
          </section>
          <section className="relative" id="contact">
            <Contact />
          </section>
          <Footer />
        </>
      )}
    </main>
  );
}
