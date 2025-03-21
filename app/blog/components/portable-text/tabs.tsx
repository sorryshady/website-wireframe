"use client";

import { useState } from "react";
import { PortableTextBlock } from "next-sanity";
import { PortableText } from "@portabletext/react";

interface Tab {
  title: string;
  content: PortableTextBlock[];
}

interface TabsProps {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-8">
      <div className="flex border-b border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 flex-1 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <PortableText value={tabs[activeTab].content} />
      </div>
    </div>
  );
}
