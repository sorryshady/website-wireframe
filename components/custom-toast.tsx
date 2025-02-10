import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface CustomToastProps {
  message: string;
  type: "success" | "error";
}

export const CustomToast = ({ message, type }: CustomToastProps) => {
  const toastRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate toast entry
      gsap.fromTo(
        toastRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        },
      );

      // Animate icon
      gsap.fromTo(
        ".toast-icon",
        {
          scale: 0,
          rotate: -180,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.7)",
        },
      );

      // Animate message text
      gsap.fromTo(
        ".toast-message",
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
        },
      );
    }, toastRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={toastRef}
      className="flex items-center gap-3 bg-[#222] px-6 py-4 rounded-lg border border-white/10 shadow-xl backdrop-blur-md"
    >
      {/* Icon */}
      <div className="toast-icon flex-shrink-0">
        {type === "success" ? (
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        )}
      </div>

      {/* Message */}
      <p className="toast-message text-white text-sm font-mont">{message}</p>
    </div>
  );
};

// Helper function to create toast
export const createCustomToast = (
  message: string,
  type: "success" | "error",
) => {
  return {
    duration: 5000,
    position: "bottom-center",
    style: {
      background: "transparent",
      boxShadow: "none",
    },
    icon: null,
    className: "",
    render: () => <CustomToast message={message} type={type} />,
  };
};
