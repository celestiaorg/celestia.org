"use client";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface ScrollNavigationCardProps {
  children: React.ReactNode;
  setActiveSection: (index: number) => void;
  index: number;
}

const ScrollNavigationCard = ({ children, setActiveSection, index }: ScrollNavigationCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, {
    margin: "-50% 0px -50% 0px",
  });

  // Set active section when in view (passes to parent for controls)
  useEffect(() => {
    if (!setActiveSection) return;

    if (inView) {
      setActiveSection(index);
    }
  }, [inView, setActiveSection]);

  return (
    <div ref={containerRef} className="sticky">
      {children}
    </div>
  );
};

export default ScrollNavigationCard;
