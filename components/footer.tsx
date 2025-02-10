import React from "react";
import Content from "./content";

const Footer = () => {
  return (
    <div
      className="relative h-[500px] sm:h-[600px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[500px] sm:h-[600px]">
        <Content />
      </div>
    </div>
  );
};

export default Footer;
