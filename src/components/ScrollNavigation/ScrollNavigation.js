"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { motion, useAnimation, useInView, useScroll } from "framer-motion";

const ScrollNavigation = ({ children }) => {
  const sectionsRef = useRef([]);
  const controls = useAnimation();
  const [activeSection, setActiveSection] = useState(0);
  const [windowHeight, setWindowHeight] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  //   const scrollSection = (direction) => {
  //     const newIndex = activeSection + direction;
  //     if (newIndex < 0 || newIndex >= sectionsRef.current.length) return;

  //     window.scrollTo({
  //       top: sectionsRef.current[newIndex].getBoundingClientRect().top,
  //       behavior: "smooth",
  //     });
  //     setActiveSection(newIndex);
  //   };

  return (
    <div className="relative">
      <motion.div
        className="flex flex-col"
        animate={controls}
        initial={{ y: 0 }}
      >
        {React.Children.map(children, (child, index) => {
          return (
            <>
              {windowHeight && (
                <ScrollNavigationCard key={index} windowHeight={windowHeight}>
                  {child}
                </ScrollNavigationCard>
              )}
            </>
          );
        })}
      </motion.div>
      {/* <div className="fixed bottom-10 right-10 flex flex-col space-y-2">
        <button
          className={`p-2 ${
            activeSection === 0 ? "bg-gray-300" : "bg-blue-500"
          }`}
          onClick={() => scrollSection(-1)}
          disabled={activeSection === 0}
        >
          Up
        </button>
        <button
          className={`p-2 ${
            activeSection === sectionsRef.current.length - 1
              ? "bg-gray-300"
              : "bg-blue-500"
          }`}
          onClick={() => scrollSection(1)}
          disabled={activeSection === sectionsRef.current.length - 1}
        >
          Down
        </button>
      </div> */}
    </div>
  );
};

const ScrollNavigationCard = ({ children, windowHeight }) => {
  const containerRef = useRef(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const vertMargin = 86;

  const [dynamicStyle, setDefaultStyle] = useState({
    scale: 1,
    filter: 0,
  });

  const { scrollY } = useScroll({
    target: containerRef,
  });

  const isInView = useInView(containerRef, {
    margin: `0px 0px -${windowHeight - vertMargin}px 0px`,
    once: true,
  });

  scrollY.on("change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    setDefaultStyle({
      scale: animationValue,
      filter: (1 - animationValue) * 100,
    });
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="sticky"
      style={{
        top: vertMargin + "px",
        scale: dynamicStyle.scale,
        filter: `blur(${dynamicStyle.filter}px)`,
      }}
    >
      {maxScrollY} - {children}
    </div>
  );
};

export default ScrollNavigation;
