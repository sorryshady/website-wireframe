import React from "react";
import TextTrial from "./text-trial";

const Content = () => {
  return (
    <div className="bg-[#4E4E5A] py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
      <Section2 />
    </div>
  );
};

export default Content;

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="flex justify-between items-end mb-6 sm:mb-8 md:mb-10 font-mono">
      <h1 className="text-[12vw] sm:text-[13vw] md:text-[14vw] font-medium leading-[0.8] tracking-tighter mt-6 sm:mt-8 md:mt-10 text-white">
        Ernyg
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-[#fff]">©copyright</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-col sm:flex-row shrink-0 gap-8 sm:gap-12 md:gap-20 font-mono">
      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
        <h3 className="mb-1 sm:mb-1.5 md:mb-2 uppercase text-[#ffffff80] text-sm sm:text-base md:text-lg">
          About
        </h3>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Home
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Projects
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Our Mission
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Contact Us
        </TextTrial>
      </div>
      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
        <h3 className="mb-1 sm:mb-1.5 md:mb-2 uppercase text-[#ffffff80] text-sm sm:text-base md:text-lg">
          Education
        </h3>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          News
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Learn
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Certification
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer text-sm sm:text-base md:text-lg">
          Publications
        </TextTrial>
      </div>
    </div>
  );
};
