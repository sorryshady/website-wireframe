import React, { useRef } from "react";

const Horizontal = () => {
  const projectsRef = useRef<[] | null>(null);
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
