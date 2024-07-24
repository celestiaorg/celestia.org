"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useEffect, useState } from "react";

const ProjectFilterNavigation = ({
  currentFilter,
  setFilter,
  filterCategories,
}) => {
  return (
    <nav className={`w-full py-6 lg:py-0`}>
      <Container size={"lg"} className="overflow-visible" padding={false}>
        <div className="flex overflow-x-scroll w-auto mx-auto gap-2 no-scrollbar lg:flex-wrap lg:overflow-auto lg:w-full">
          <PrimaryButton
            className={"whitespace-nowrap table"}
            hover={currentFilter}
            lightMode={currentFilter}
            onClick={() => setFilter(null)}
          >
            All
          </PrimaryButton>
          {filterCategories.map((category, index) => (
            <React.Fragment key={`category-${index}`}>
              <PrimaryButton
                className={"whitespace-nowrap table"}
                hover={currentFilter !== category}
                lightMode={currentFilter !== category}
                onClick={() => setFilter(category)}
              >
                {category}
              </PrimaryButton>
            </React.Fragment>
          ))}
        </div>
      </Container>
    </nav>
  );
};

export default ProjectFilterNavigation;
