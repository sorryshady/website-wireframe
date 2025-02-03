"use client";
import { useRef, useState } from "react";
import Preloader from "@/components/preloader";
import Footer from "@/components/footer";
import TextTrial from "@/components/text-trial";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextGradient from "@/components/text-gradient";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const textRef = useRef(null);
  const mainRef = useRef(null);

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

      // Improved color change animation
      gsap.to(".second-section", {
        scrollTrigger: {
          trigger: ".second-section",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        backgroundColor: "#000000",
        color: "#ffffff",
        duration: 0.5,
      });
      gsap.to(".third-section", {
        scrollTrigger: {
          trigger: ".third-section",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        backgroundColor: "#ffffff",
        color: "#000000",
        duration: 0.5,
      });
    }
  }, [isLoading]);

  return (
    <main
      className="relative w-full min-h-screen transition-colors duration-500 overflow-x-hidden"
      ref={mainRef}
    >
      <Preloader setIsLoading={setIsLoading} />

      {!isLoading && (
        <>
          <div className="absolute top-0 w-full min-h-screen overflow-x-hidden z-[1] font-['PP_Neue_Montreal'] uppercase flex flex-col justify-between items-center text-sm">
            <div className="w-full flex justify-between items-center text-center p-4">
              <div className="text-3xl font-medium">
                <TextTrial className="text-black" disableHover={true}>
                  ERNYG
                </TextTrial>
              </div>
              <div className="nav-items">
                <a href="#" className="no-underline text-black pr-16">
                  <TextTrial className="text-black">About</TextTrial>
                </a>
                <a href="#" className="no-underline text-black pr-16">
                  <TextTrial className="text-black">Services</TextTrial>
                </a>
                <a href="#" className="no-underline text-black pr-16">
                  <TextTrial className="text-black">Projects</TextTrial>
                </a>
                <a href="#" className="no-underline text-black">
                  <TextTrial className="text-black">Contact</TextTrial>
                </a>
              </div>
            </div>
            <div className=" absolute bottom-[35%] md:bottom-[30%] lg:bottom-[25%] left-1/2 transform -translate-x-1/2 text-black text-[5vw] font-medium leading-none tracking-tighter p-4 overflow-hidden">
              <div className="flex flex-col items-center gap-8" ref={textRef}>
                <h1 className="text-4xl tracking-normal font-bold">
                  BRINGING IDEAS TO LIFE
                </h1>
                <button className="px-8 py-4 text-xl bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wider">
                  Let&apos;s Create Together
                </button>
              </div>
            </div>
            <div className="w-full flex justify-between items-center text-center p-4">
              <p>Full Stack Development</p>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <p>Based in India</p>
              </div>
              <p>Ernyg © 2025</p>
            </div>
          </div>
          <TextGradient text="This is some long ass random text message to see if this shit works. Hopefully it works. Coz if it does it will be nice else it will suck. But alas what can i do?" />
          <div className="w-full h-screen bg-white flex flex-col justify-center items-center second-section">
            <div className=" text-4xl">Random</div>
          </div>
          <div className="w-full h-screen flex flex-col bg-black justify-center items-center third-section">
            <div className=" text-4xl">Third Random</div>
          </div>

          <Footer />
        </>
      )}
    </main>
  );
}
