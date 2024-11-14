"use client";
import { useEffect, useContext, createContext, useState, useRef } from "react";
import { usePathname } from "next/navigation";

// Providing a default value matching the context type
const ScrollPositionContext = createContext(undefined);

export const ScrollPositionProvider = ({ children }) => {
  const pathname = usePathname();
  const scrollY = useRef(0);
  const setScrollY = (position) => {
    scrollY.current = position;
  };
  const [scrollIsLocked, setScrollIsLocked] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Lock scroll when the menu is open
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
      }, 10);
    }
  }, [scrollIsLocked]);

  useEffect(() => {
    setMenuIsOpen(false);

    // TODO: create logic that will prevent scrolling to top on glossary or faw pages
    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 10);
  }, [pathname]);

  // Get the height of each navigation section
  const primaryNavRef = useRef(null);
  const secondaryNavRef = useRef(null);
  const tertiaryNavRef = useRef(null);

  const [navHeights, setNavHeights] = useState({
    primary: 0,
    secondary: 0,
    tertiary: 0,
  });

  useEffect(() => {
    const updateNavHeights = () => {
      setNavHeights({
        primary: primaryNavRef.current?.offsetHeight || 0,
        secondary: secondaryNavRef.current?.offsetHeight || 0,
        tertiary: tertiaryNavRef.current?.offsetHeight || 0,
      });
    };
    updateNavHeights();
    window.addEventListener("resize", updateNavHeights);
    return () => window.removeEventListener("resize", updateNavHeights);
  }, [primaryNavRef, secondaryNavRef, tertiaryNavRef]);

  return (
    <ScrollPositionContext.Provider
      value={{
        scrollY,
        setScrollY,
        scrollIsLocked,
        setScrollIsLocked,
        menuIsOpen,
        setMenuIsOpen,
        primaryNavRef,
        secondaryNavRef,
        tertiaryNavRef,
        navHeights,
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
