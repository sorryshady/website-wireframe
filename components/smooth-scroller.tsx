"use client";
import { ReactLenis } from "lenis/react";

const SmoothScroller = ({ children }: { children: React.ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroller;
