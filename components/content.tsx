import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Content = () => {
  return (
    <div className="bg-[#222] py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
      <div className="flex gap-12 items-center tracking-wider text-base sm:text-lg md:text-xl font-medium font-mont text-white">
        <a
          href="https://ernyg.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm sm:text-base md:text-lg"
        >
          Privacy Policy
        </a>
        <a
          href="https://ernyg.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm sm:text-base md:text-lg"
        >
          Terms and Conditions
        </a>
      </div>
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
    <div className="flex justify-between items-end mb-6 sm:mb-8 md:mb-10 font-mont">
      <h1 className="text-[12vw] sm:text-[13vw] md:text-[14vw] font-medium leading-[0.8] tracking-tighter mt-6 sm:mt-8 md:mt-10 text-white">
        Ernyg
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-[#fff] tracking-wider text-wrap max-w-[200px] md:max-w-[500px]">
        Ernyg&copy;{new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-col sm:flex-row shrink-0 gap-8 sm:gap-20 md:gap-28 font-mont">
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
        <h3 className="uppercase text-[#fff] text-lg sm:text-xl md:text-2xl font-bold tracking-widest">
          Our Socials
        </h3>
        <h2 className="text-[#fff] text-base sm:text-lg md:text-xl mb-3 font-semibold">
          Reach out to us
        </h2>
        <div className="flex items-start gap-5 sm:justify-between">
          <a
            href="https://www.linkedin.com/company/ernyg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn
              size={20}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            />
          </a>
          <a
            href="https://www.instagram.com/ernygtech?igsh=MXJrNmlmOGpodW5haQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={20}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61571940507017"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF
              size={20}
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
        <h3 className="uppercase text-[#fff] text-lg sm:text-xl md:text-2xl font-bold tracking-widest">
          Contact
        </h3>
        <h2 className="text-[#fff] text-base sm:text-lg md:text-xl mb-3 font-semibold">
          Get in touch
        </h2>
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-start justify-between">
          <a
            href="mailto:contact@ernyg.com"
            className="text-[#fff] text-sm sm:text-base md:text-lg"
          >
            Email: <span className="hover:underline">contact@ernyg.com</span>
          </a>
          <a
            href="tel:+919826000000"
            className="text-[#fff] text-sm sm:text-base md:text-lg"
          >
            Phone: <span className="hover:underline">+91 63051 59274</span>
          </a>
        </div>
      </div>
    </div>
  );
};
