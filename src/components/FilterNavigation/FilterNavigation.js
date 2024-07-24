"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useEffect, useState } from "react";
import Link from "next/link";

const FilterNavigation = ({ filterCategories }) => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const tab = Object.keys(filterCategories).find(
      (tab) => filterCategories[tab].replace(/\/$/, "") === pathname
    );

    setCurrentTab(tab);
  }, [pathname, filterCategories]);

  return (
    <nav className={`w-full py-6 lg:py-0`}>
      <Container size={"lg"} className="overflow-visible" padding={false}>
        <div className="flex overflow-x-scroll w-auto mx-auto gap-2 no-scrollbar lg:flex-wrap lg:overflow-auto lg:w-full">
          {Object.keys(filterCategories).map((tab, index) => (
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
                  href={filterCategories[tab]}
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

export default FilterNavigation;
