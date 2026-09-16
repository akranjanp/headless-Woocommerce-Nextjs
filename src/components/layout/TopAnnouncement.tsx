"use client";

import React, { useState, useEffect } from "react";
import { zelevationConfig } from "@/../zelevation.config";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function TopAnnouncement() {
  const announcements = zelevationConfig.announcements;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible || !announcements || announcements.length === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground text-xs font-medium tracking-wider uppercase py-2 px-4 relative flex items-center justify-between border-b border-white/10 z-50">
      <div className="flex-1 text-center truncate">
        <span className="inline-block transition-all duration-500 ease-in-out">
          {announcements[currentIndex]}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 ml-4">
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1))
          }
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % announcements.length)
          }
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded transition-colors ml-2"
          aria-label="Close announcement bar"
        >
          <X className="w-3.5 h-3.5 text-white/70 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
