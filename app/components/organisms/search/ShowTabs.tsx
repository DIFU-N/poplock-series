"use client";

import { ReactNode, useState } from "react";

export interface ShowTab {
  num: string;
  label: string;
  content: ReactNode;
}

export default function ShowTabs({ tabs }: { tabs: ShowTab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-1.5 font-mono text-[13px]">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`border px-3.5 py-2 transition-colors cursor-pointer ${
              i === active
                ? "border-cyan bg-cyan text-ink"
                : "border-line text-dim hover:border-paper hover:text-paper"
            }`}
          >
            <span
              className={i === active ? "opacity-70" : "mr-1.5 text-yellow"}
            >
              {i === active ? "" : tab.num + " "}
            </span>
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}
