import React from "react";
import Content from "./content";

const Footer = () => {
  return (
    <div
      className="relative h-[600px] sm:h-[700px] md:h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[600px] sm:h-[700px] md:h-[800px]">
        <Content />
      </div>
    </div>
  );
};

export default Footer;
