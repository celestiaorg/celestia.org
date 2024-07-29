"use client";
import { useEffect, useContext, createContext, useState, useRef } from "react";
import { usePathname } from "next/navigation";

// Providing a default value matching the context type
const ScrollPositionContext = createContext(undefined);

export const ScrollPositionProvider = ({ children }) => {
  const scrollY = useRef(0);
  const setScrollY = (position) => {
    scrollY.current = position;
  };
  const [scrollIsLocked, setScrollIsLocked] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (scrollIsLocked) {
      // Save the current scroll position and apply styles to lock scroll
      const currentY = window.scrollY;
      setScrollY(currentY);
      document.body.style.cssText += `position: fixed; top: -${currentY}px; width: 100%; overflow: hidden;`;
    } else {
      // Reset styles and scroll to the saved position
      const bodyStyle = document.body.style;
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.overflow = "";

      // Temporarily disable smooth scroll if necessary
      const htmlStyle = document.documentElement.style;
      const previousScrollBehavior = htmlStyle.scrollBehavior;
      htmlStyle.scrollBehavior = "auto";

      window.scrollTo(0, scrollY.current);

      // Re-enable smooth scroll after a tick
      setTimeout(() => {
        htmlStyle.scrollBehavior = previousScrollBehavior;
      }, 0);
    }
  }, [scrollIsLocked]);

  useEffect(() => {
    // Reset styles and scroll to the saved position
    const bodyStyle = document.body.style;
    bodyStyle.position = "";
    bodyStyle.top = "";
    bodyStyle.overflow = "";

    // Temporarily disable smooth scroll if necessary
    const htmlStyle = document.documentElement.style;
    htmlStyle.scrollBehavior = "auto";

    window.scrollTo(0, 0);

    setMenuIsOpen(false);
  }, [pathname]);

  return (
    <ScrollPositionContext.Provider
      value={{
        scrollY,
        setScrollY,
        scrollIsLocked,
        setScrollIsLocked,
        menuIsOpen,
        setMenuIsOpen,
      }}
    >
      {children}
    </ScrollPositionContext.Provider>
  );
};

export const useScrollPosition = () => {
  const context = useContext(ScrollPositionContext);
  if (context === undefined) {
    throw new Error(
      "useScrollPosition must be used within a ScrollPositionProvider"
    );
  }
  return context;
};

export default ScrollPositionProvider;
