"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useScroll, useInView } from "framer-motion";

const ScrollNavigationCard = ({ children, setActiveSection, index }) => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, {
    margin: "-50% 0px -50% 0px",
  });
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

  const [windowHeight, setWindowHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowHeight(window.innerHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const containerHeight =
        containerRef.current.getBoundingClientRect().height;
      const offset = containerHeight - windowHeight;
      setStickyOffset(offset > 0 ? offset : 0);
    }
  }, [windowHeight]);

  useEffect(() => {
    if (inView) {
      setActiveSection(index);
    }
  }, [inView, setActiveSection]);

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

export default ScrollNavigationCard;
