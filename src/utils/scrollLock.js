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

  // Get the height of each navigation section
  const primaryNavRef = useRef(null);
  const secondaryNavRef = useRef(null);
  const tertiaryNavRef = useRef(null);

  const [navHeights, setNavHeights] = useState({
    primary: 0,
    secondary: 0,
    tertiary: 0,
  });

  // Update primary nav height
  useEffect(() => {
    const updatePrimaryHeight = () => {
      setNavHeights((prevHeights) => ({
        ...prevHeights,
        primary: primaryNavRef.current?.offsetHeight || 0,
      }));
    };
    updatePrimaryHeight();
    window.addEventListener("resize", updatePrimaryHeight);
    return () => window.removeEventListener("resize", updatePrimaryHeight);
  }, [primaryNavRef]);

  // Update secondary nav height
  useEffect(() => {
    const updateSecondaryHeight = () => {
      setNavHeights((prevHeights) => ({
        ...prevHeights,
        secondary: secondaryNavRef.current?.offsetHeight || 0,
      }));
    };
    updateSecondaryHeight();
    window.addEventListener("resize", updateSecondaryHeight);
    return () => window.removeEventListener("resize", updateSecondaryHeight);
  }, [secondaryNavRef]);

  // Update tertiary nav height
  useEffect(() => {
    const updateTertiaryHeight = () => {
      setNavHeights((prevHeights) => ({
        ...prevHeights,
        tertiary: tertiaryNavRef.current?.offsetHeight || 0,
      }));
    };
    updateTertiaryHeight();
    window.addEventListener("resize", updateTertiaryHeight);
    return () => window.removeEventListener("resize", updateTertiaryHeight);
  }, [tertiaryNavRef]);

  // Reset nav heights when the component is unmounted or the page changes
  useEffect(() => {
    const resetNavHeights = () => {
      setNavHeights((prevHeights) => ({
        primary: primaryNavRef.current?.offsetHeight || 0,
        secondary: secondaryNavRef.current
          ? secondaryNavRef.current.offsetHeight
          : 0,
        tertiary: tertiaryNavRef.current
          ? tertiaryNavRef.current.offsetHeight
          : 0,
      }));
    };

    resetNavHeights();
  }, [pathname]);

  // Adjust scroll position to consider sticky nav heights for anchor links on click
  useEffect(() => {
    const handleAnchorLinkClick = (event) => {
      event.preventDefault(); // Prevent default behavior for anchor link clicks

      // Get the href of the currentTarget, which will always be the anchor (`<a>`).
      const targetId = event.currentTarget.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        const element = document.querySelector(targetId);
        if (element) {
          const yOffset = -(navHeights.primary + navHeights.secondary); // Offset for sticky navs
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    // Add click event listener to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", handleAnchorLinkClick);
    });

    // Cleanup event listeners on unmount
    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", handleAnchorLinkClick);
      });
    };
  }, [navHeights]);

  // Handle hash links when visiting the site with an anchor link in the URL
  useEffect(() => {
    if (window.location.hash) {
      const handleHashLinkOnLoad = () => {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          const yOffset = -(navHeights.primary + navHeights.secondary);
          const y =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          // Use a timeout to wait for the rest of the page to load before scrolling
          setTimeout(() => {
            window.scrollTo({ top: y, behavior: "smooth" });
          }, 100);
        }
      };

      handleHashLinkOnLoad();
    }
  }, [pathname, navHeights]);

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
      htmlStyle.scrollBehavior = "auto";
      window.scrollTo(0, scrollY.current);

      // Re-enable smooth scroll after a tick
      setTimeout(() => {
        htmlStyle.scrollBehavior = "smooth";
      }, 10);
    }
  }, [scrollIsLocked]);

  useEffect(() => {
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
