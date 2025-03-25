import Image from "next/image";
import Link from "next/link";
import React from "react";

const LegalNavbar = () => {
  return (
    <div
      className={`w-full lg:w-[85%] mx-auto fixed top-0 left-0 right-0 flex justify-between items-center text-center p-4 md:p-6 backdrop-blur-md bg-opacity-70 bg-transparent z-50`}
    >
      <Link href="/" className="text-3xl font-medium">
        <Image
          src="/logo.svg"
          alt="ERNYG Logo"
          width={95}
          height={31}
          className={`cursor-pointer`}
        />
      </Link>
    </div>
  );
};

export default LegalNavbar;
