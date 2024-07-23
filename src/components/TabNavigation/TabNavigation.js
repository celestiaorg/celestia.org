"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useEffect, useState } from "react";
import Link from "next/link";

const TabNavigation = ({ navigation }) => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const tab = Object.keys(navigation).find(
      (tab) => navigation[tab].replace(/\/$/, "") === pathname
    );
    console.log(tab);
    console.log(navigation);
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
                <Link
                  href={navigation[tab]}
                  className={"inline-block"}
                  prefetch
                >
                  <PrimaryButton lightMode className={"whitespace-nowrap"}>
                    {tab}
                  </PrimaryButton>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default TabNavigation;
