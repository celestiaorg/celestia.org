"use client";
import React from "react";
import { useState, useRef } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import ScrollNavigationCard from "./ScrollNavigationCard";
import ScrollControls from "./ScrollControls";

const ScrollNavigation = ({ children, sectionDetails }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-50% 0px -75% 0px",
  });
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div ref={containerRef} className={"block overflow-visible"}>
      {React.Children.map(children, (child, index) => {
        return (
          <ScrollNavigationCard
            key={index}
            setActiveSection={setActiveSection}
            index={index}
          >
            {child}
          </ScrollNavigationCard>
        );
      })}
      {sectionDetails && (
        <AnimatePresence>
          {isInView && (
            <ScrollControls
              sectionDetails={sectionDetails}
              activeSection={activeSection}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ScrollNavigation;
