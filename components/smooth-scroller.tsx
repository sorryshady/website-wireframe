"use client";
import { ReactLenis } from "lenis/react";

const SmoothScroller = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        orientation: "vertical",
        wheelMultiplier: 1,
        prevent(node) {
          return (
            node.id === "blog-page" ||
            node.id === "authors-page" ||
            node.id === "author" ||
            node.id === "blog"
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroller;
