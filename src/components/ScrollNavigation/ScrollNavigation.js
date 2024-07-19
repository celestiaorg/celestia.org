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

    // Listen for resize events
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
  const [stickyOffset, setStickyOffset] = useState(0);
  const vertMargin = 86;
  const [isInView, setIsInView] = useState(false);

  const [dynamicStyle, setDynamicStyle] = useState({
    scale: 1,
    filter: 0,
  });

  const { scrollY } = useScroll({
    target: containerRef,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const containerHeight =
        containerRef.current.getBoundingClientRect().height;
      const offset = containerHeight - windowHeight;
      setStickyOffset(offset > 0 ? offset : 0);
    }
  }, [windowHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const inView =
          rect.top <= (stickyOffset - vertMargin) * -1 &&
          rect.bottom >= vertMargin;
        setIsInView(inView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowHeight, stickyOffset, vertMargin]);

  scrollY.on("change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    setDynamicStyle({
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
        top: stickyOffset > 0 ? -stickyOffset : vertMargin,
        transform: `scale(${dynamicStyle.scale})`,
        filter: `blur(${dynamicStyle.filter}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollNavigation;
