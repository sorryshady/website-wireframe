import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Horizontal = () => {
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.to(projectsRef.current, {
      xPercent: -100 * (projectsRef.current.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-container",
        pin: true,
        start: "top top",
        end: () =>
          `+=${
            (document.querySelector(".projects-container") as HTMLDivElement)
              .offsetWidth
          }`,
        scrub: 1,
        snap: 1 / (projectsRef.current.length - 1),
      },
    });
  });

  return (
    <>
      {[
        { bg: "bg-red-300", section: 1 },
        { bg: "bg-blue-300", section: 2 },
        { bg: "bg-green-300", section: 3 },
        { bg: "bg-yellow-300", section: 4 },
      ].map((item, index) => (
        <div
          key={index}
          className="w-full h-screen overflow-hidden shrink-0 rounded-md"
          ref={(ref) => {
            if (ref) {
              projectsRef.current[index] = ref;
            }
          }}
        >
          <div className={`w-full h-full ${item.bg} text-4xl`}>
            Section {item.section}
          </div>
        </div>
      ))}
    </>
  );
};

export default Horizontal;
