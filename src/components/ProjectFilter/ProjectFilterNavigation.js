"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

const ProjectFilterNavigation = ({
  currentFilter,
  setFilter,
  filterCategories,
  filtersToShow,
}) => {
  const [filterNum, setFilterNum] = useState(filtersToShow);

  return (
    <>
      <nav className={`w-full py-6 lg:py-0`}>
        <AnimatePresence>
          {filterCategories && filterCategories.length > 0 && (
            <Container size={"lg"} className="overflow-visible" padding={false}>
              <div className="flex overflow-x-scroll w-auto mx-auto gap-2 no-scrollbar lg:flex-wrap lg:overflow-auto lg:w-full">
                <PrimaryButton
                  className="whitespace-nowrap table shrink-0"
                  hover={currentFilter}
                  lightMode={currentFilter}
                  onClick={() => setFilter(null)}
                >
                  All
                </PrimaryButton>

                {filterCategories.slice(0, filterNum).map((category, index) => (
                  <motion.div
                    key={`category-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <PrimaryButton
                      className="whitespace-nowrap table"
                      hover={currentFilter !== category}
                      lightMode={currentFilter !== category}
                      onClick={() => setFilter(category)}
                    >
                      {category}
                    </PrimaryButton>
                  </motion.div>
                ))}
                {filterNum < filterCategories.length && (
                  <div className="lg:w-full">
                    <PrimaryButton
                      className="group table whitespace-nowrap"
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
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default ProjectFilterNavigation;
