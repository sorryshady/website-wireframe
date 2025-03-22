"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface BackButtonProps {
  currentPage: "authors" | "blog";
}
const BackButton = ({ currentPage }: BackButtonProps) => {
  return (
    <button
      onClick={() => window.history.back()}
      className={`${currentPage === "authors" ? "inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-geist" : "inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-900 hover:bg-gray-200 hover:border-gray-900 rounded-full transition-colors text-gray-900 font-geist text-sm"} `}
    >
      <ArrowLeft
        className={`${currentPage === "authors" ? "w-4 h-4" : "w-3 h-3"}`}
      />
      Back
    </button>
  );
};

export default BackButton;
