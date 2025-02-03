import React from "react";
import TextTrial from "./text-trial";

const Content = () => {
  return (
    <div className="bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between">
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
    <div className="flex justify-between items-end mb-10 font-mono">
      <h1 className="text-[14vw] font-medium leading-[0.8] tracking-tighter mt-10 text-white">
        Ernyg
      </h1>
      <p className="text-[#fff]">©copyright</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex shrink-0 gap-20 font-mono">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
        <TextTrial className="text-[#fff] cursor-pointer">Home</TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer">Projects</TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer">
          Our Mission
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer">Contact Us</TextTrial>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80] ">Education</h3>
        <TextTrial className="text-[#fff] cursor-pointer">News</TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer">Learn</TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer">
          Certification
        </TextTrial>
        <TextTrial className="text-[#fff] cursor-pointer">
          Publications
        </TextTrial>
      </div>
    </div>
  );
};
