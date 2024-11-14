"use client";
import React, { useState, useEffect, useRef } from "react";
import { Body, Label } from "@/macros/Copy";
import { useRouter } from "next/navigation";
import { useScrollPosition } from "@/utils/scrollLock";

const SidebarNavigation = ({ title, anchors }) => {
  // TODO: Fix issue with progress bar not displaying the final section progress
  // TODO: Stop updating page hash from adding to the browser history
  const { navHeights, tertiaryNavRef } = useScrollPosition();
  const [isSticky, setIsSticky] = useState(false);
  const placeholderRef = useRef(null);

  const [sectionRefs, setSectionRefs] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setSectionRefs(
      anchors.sections.map((section) => {
        return document.getElementById(section.id);
      })
    );
  }, [anchors]);

  useEffect(() => {
    const handleScroll = () => {
      // Retrieve the top position of each section relative to the viewport
      const sectionTops = sectionRefs.map(
        (ref) => ref?.getBoundingClientRect().top || 0
      );

      // Determine the active section based on its position within the viewport
      const activeIndex = sectionTops.findIndex(
        (top) => top > window.innerHeight / 2
      );

      // Calculate the ID of the active section; if no section qualifies, set to the last section
      const activeId =
        activeIndex === -1 ? sectionRefs.length - 1 : activeIndex - 1;

      // Update active section and reset progress if a new section is active
      if (activeId !== activeSection) {
        setActiveSection(activeId);
        setProgress(0);
      } else {
        // If the last section is active, calculate progress based on the bottom of the last section
        if (activeId === sectionRefs.length - 1) {
          const lastSectionRef = sectionRefs[sectionRefs.length - 1];
          const sectionHeight = lastSectionRef.offsetHeight;
          const scrolledAmount =
            window.innerHeight / 2 - sectionTops[sectionRefs.length - 1];
          setProgress((scrolledAmount / sectionHeight) * 100);
        } else {
          // For other sections, calculate progress based on scroll amount within the section
          const currentSectionRef = sectionRefs[activeIndex - 1];
          if (currentSectionRef) {
            const sectionHeight = currentSectionRef.offsetHeight;
            const scrolledAmount =
              window.innerHeight / 2 - sectionTops[activeIndex - 1];
            setProgress((scrolledAmount / sectionHeight) * 100);
          }
        }
      }

      // Set the sticky state

      if (
        window.scrollY >=
          placeholderRef.current?.offsetTop -
            navHeights.primary -
            navHeights.secondary &&
        window.innerWidth >= 1024
      ) {
        if (!isSticky) {
          setIsSticky(true);
        }
      } else {
        if (isSticky) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [anchors, activeSection, sectionRefs, router, isSticky, navHeights]);

  const handleClick = (event, index) => {
    event.preventDefault();
    const section = sectionRefs[index];
    const offset = 180; // Adjust this value as needed
    const topPosition =
      section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        ref={placeholderRef}
        className="block w-full"
        style={{ height: isSticky ? `${navHeights.tertiary}px` : 0 }}
      />
      <nav
        ref={tertiaryNavRef}
        className={`pt-2.5 lg:py-20 z-10
          ${isSticky ? "fixed" : "relative"}
        `}
        style={{
          top: isSticky
            ? `${navHeights.primary + navHeights.secondary}px`
            : "auto",
        }}
      >
        <Body size={"sm"} className={"mb-4"}>
          On this page
        </Body>
        <Label tag={"h1"} size={"lg"} className={"mb-4"}>
          {title}
        </Label>
        <div className="w-full h-1 lg:mb-2 bg-white-weak overflow-hidden hidden lg:block">
          <div className="h-1 bg-black" style={{ width: `${progress}%` }}></div>
        </div>
        <ol>
          {anchors.sections.map((anchor, index) => {
            return (
              <li key={`sidebar-${anchor.id}`}>
                <a
                  href={`#${anchor.id}`}
                  onClick={(event) => handleClick(event, index)}
                >
                  <Body
                    size={"sm"}
                    className={`mb-3 transition-colors duration-300 text-black ${
                      activeSection === index ? "lg:text-black" : "lg:text-weak"
                    }`}
                  >
                    {anchor.title}
                  </Body>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default SidebarNavigation;
