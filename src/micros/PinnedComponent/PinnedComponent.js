"use client";
import React, { useEffect, useRef, useState } from "react";

const PinningComponent = ({ children, desktopOnly = true }) => {
  const pinRef = useRef(null);
  const [pinState, setPinState] = useState("unpinned"); // 'unpinned', 'pinnedTop', 'pinnedBottom'
  const [isDesktop, setIsDesktop] = useState(true);

  // Determine if the screen size is desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Customize the breakpoint if needed
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll event listener to manage pinning states
  useEffect(() => {
    if (!isDesktop && desktopOnly) return;

    const handleScroll = () => {
      const pinElement = pinRef.current;
      if (!pinElement) return;

      const rect = pinElement.getBoundingClientRect();
      const parentRect = pinElement.parentElement.getBoundingClientRect();

      // Determine the pin state

      console.log("parentRect.top", parentRect.top);
      if (parentRect.top > 0) {
        setPinState("unpinned");
      } else if (
        parentRect.top <= 0 &&
        parentRect.bottom < window.innerHeight
      ) {
        setPinState("pinnedBottom");
      } else if (rect.top <= 0 && parentRect.bottom > rect.height) {
        setPinState("pinnedTop");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop, desktopOnly]);

  const getStyles = () => {
    switch (pinState) {
      case "unpinned":
        return {
          position: "relative",
          top: "unset",
          bottom: "unset",
        };
      case "pinnedTop":
        return {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        };
      case "pinnedBottom":
        return {
          position: "absolute",
          top: "unset",
          bottom: 0,
          left: 0,
          width: "100%",
        };
      default:
        return {};
    }
  };

  return (
    <div ref={pinRef} className="pinning-container" style={getStyles()}>
      {children}
    </div>
  );
};

export default PinningComponent;
