"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useEffect, useState, useRef } from "react";
import { useScrollPosition } from "@/utils/scrollLock";

const TabNavigation = ({ navigation }) => {
  const pathname = usePathname();
  const { navHeights, secondaryNavRef } = useScrollPosition();
  const [isSticky, setIsSticky] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const placeholderRef = useRef(null);

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

  // TODO: make right side of overflow visible
  // TODO: make overflow scroll to active tab

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
          <div className="flex overflow-x-scroll w-auto mx-auto gap-2 p-4 no-scrollbar">
            {Object.keys(navigation).map((tab, index) => (
              <React.Fragment key={`tab-${index}`}>
                {currentTab === tab ? (
                  <PrimaryButton
                    className={"whitespace-nowrap table"}
                    hover={false}
                  >
                    {tab}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    href={navigation[tab]}
                    lightMode
                    className={"shrink-0 inline-block whitespace-nowrap"}
                  >
                    {tab}
                  </PrimaryButton>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </nav>
    </>
  );
};

export default TabNavigation;
