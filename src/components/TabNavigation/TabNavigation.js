"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useEffect, useState } from "react";

const TabNavigation = ({ navigation }) => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const tab = Object.keys(navigation).find(
      (tab) => navigation[tab].replace(/\/$/, "") === pathname
    );

    setCurrentTab(tab);
  }, [pathname, navigation]);

  // TODO: make right side of overflow visible
  // TODO: make overflow scroll to active tab

  return (
    <nav
      className={`w-full border-b border-black sticky top-[84px] bg-white z-30`}
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
                  className={"inline-block whitespace-nowrap"}
                >
                  {tab}
                </PrimaryButton>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default TabNavigation;
