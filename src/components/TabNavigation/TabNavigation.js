"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useScrollPosition } from "@/utils/scrollLock";

const TabNavigation = ({ navigation }) => {
  const pathname = usePathname();
  const { navHeights, secondaryNavRef } = useScrollPosition();
  const [isSticky, setIsSticky] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);
  const placeholderRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const tab = Object.keys(navigation).find(
      (tab) => navigation[tab].replace(/\/$/, "") === pathname
    );

    setCurrentTab(tab);
  }, [pathname, navigation]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY >=
        placeholderRef.current?.offsetTop - navHeights.primary
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

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navHeights, isSticky, secondaryNavRef]);

  useEffect(() => {
    // Scroll the active tab into view
    const activeTab = document.querySelector(".active-tab");
    if (activeTab && navRef.current) {
      const navOffset = 8;
      navRef.current.scroll({
        left: activeTab.offsetLeft - navOffset,
        behavior: "smooth",
      });
    }
  }, [currentTab]);

  const handleNavScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    handleNavScroll();
    if (navRef.current) {
      navRef.current.addEventListener("scroll", handleNavScroll);
    }
    return () => {
      if (navRef.current) {
        navRef.current.removeEventListener("scroll", handleNavScroll);
      }
    };
  }, []);

  return (
    <>
      {/* Replace the nav when stick with an empty block to prevent vertical jump */}
      <div
        ref={placeholderRef}
        className="block w-full"
        style={{ height: isSticky ? `${navHeights.secondary}px` : 0 }}
      />

      <nav
        className={`w-full border-b border-black bg-white-weak z-30
      ${isSticky ? "fixed" : "relative"}
        `}
        style={{ top: isSticky ? `${navHeights.primary}px` : "auto" }}
        ref={secondaryNavRef}
      >
        <Container size={"lg"} className="overflow-visible" padding={false}>
          <div className="relative">
            {/* Left Gradient */}
            {/* {showLeftGradient && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            )} */}
            {/* Right Gradient */}
            {showRightGradient && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white-weak to-transparent pointer-events-none z-10" />
            )}
            <div
              ref={navRef}
              className="flex overflow-x-scroll w-auto mx-auto gap-2 p-4 no-scrollbar"
            >
              {Object.keys(navigation).map((tab, index) => (
                <div
                  class={"overflow-hidden table shrink-0 rounded-full"}
                  key={`tab-${index}`}
                >
                  {currentTab === tab ? (
                    <PrimaryButton
                      className={"relative whitespace-nowrap active-tab"}
                      hover={false}
                    >
                      {tab}
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      href={navigation[tab]}
                      lightMode
                      className={"relative whitespace-nowrap"}
                    >
                      {tab}
                    </PrimaryButton>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default TabNavigation;
