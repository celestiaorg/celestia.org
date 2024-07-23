"use client";
import React, { useState, useEffect } from "react";
import { Body, Label } from "@/macros/Copy";
import { useRouter } from "next/navigation";

const SidebarNavigation = ({ title, anchors }) => {
  // TODO: Fix issue with progress bar not displaying the final section progress
  // TODO: Stop updtaing page hash from adding to the browser history

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
      const sectionTops = sectionRefs.map(
        (ref) => ref?.getBoundingClientRect().top || 0
      );
      const activeIndex = sectionTops.findIndex(
        (top) => top > window.innerHeight / 2
      );
      const activeId = activeIndex < 0 ? sectionRefs.length : activeIndex - 1;

      if (activeId !== activeSection) {
        setActiveSection(activeId);
        setProgress(0);
        if (anchors.sections[activeId]) {
          router.push(`#${anchors.sections[activeId].id}`, { scroll: false });
        }
      } else {
        const currentSectionRef = sectionRefs[activeIndex - 1];
        if (currentSectionRef) {
          const sectionHeight = currentSectionRef.offsetHeight;
          const scrolledAmount =
            window.innerHeight / 2 - sectionTops[activeIndex - 1];
          setProgress((scrolledAmount / sectionHeight) * 100);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [anchors, activeSection, sectionRefs, router]);

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
    </>
  );
};

export default SidebarNavigation;
