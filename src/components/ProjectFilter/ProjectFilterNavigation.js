"use client";
import React from "react";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { useState } from "react";

const ProjectFilterNavigation = ({
  currentFilter,
  setFilter,
  filterCategories,
  filtersToShow,
}) => {
  const [filterNum, setFilterNum] = useState(filtersToShow);

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
          {filterCategories.slice(0, filterNum).map((category, index) => (
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
          {filterNum < filterCategories.length && (
            <div className="lg:w-full">
              <PrimaryButton
                className={"group table whitespace-nowrap"}
                lightMode
                noBorder
                size={"md"}
                onClick={() => setFilterNum(filterCategories.length)}
              >
                Show More
              </PrimaryButton>
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default ProjectFilterNavigation;
