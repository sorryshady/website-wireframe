import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import Image from "next/image";

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
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="w-full h-screen overflow-hidden shrink-0 px-4 md:px-8 lg:px-16"
          ref={(ref) => {
            if (ref) {
              projectsRef.current[index] = ref;
            }
          }}
        >
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative rounded-2xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.projectName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 space-y-6 max-w-xl">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-medium opacity-70">
                  {project.client}
                </h3>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {project.projectName}
                </h2>
              </div>

              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm border border-white opacity-70"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 rounded-full border border-white bg-black text-white
                         hover:bg-white hover:text-black transition-all duration-300"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Horizontal;
