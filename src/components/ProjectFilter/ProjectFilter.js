"use client";
import { Row, Col } from "@/macros/Grids/";
import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/Container/Container";
import { Display, Body } from "@/macros/Copy/";
import FilterNavigation from "@/components/ProjectFilter/ProjectFilterNavigation";
import ProjectCard from "@/components/Cards/ProjectCard/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import PinningComponent from "@/micros/PinnedComponent/PinnedComponent";

import { useScrollPosition } from "@/utils/scrollLock";

const ProjectFilter = ({
  id,
  title,
  description,
  filters,
  filterTarget,
  filtersToShow = 5,
  items,
  showCategoriesOnCard = false,
}) => {
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(items);

  // Filter projects based on the current filter
  useEffect(() => {
    if (currentFilter === null) {
      setFilteredProjects(items);
    } else {
      const filteredProjects = items.filter((item) => {
        const filterValue = item[filterTarget];
        if (Array.isArray(filterValue)) {
          return filterValue.includes(currentFilter);
        } else {
          return filterValue === currentFilter;
        }
      });
      setFilteredProjects(filteredProjects);
    }
  }, [currentFilter, filterTarget, items]);

  const { tertiaryNavRef, navHeights } = useScrollPosition();
  const placeholderRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set the sticky staty
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
  }, [isSticky, navHeights]);

  return (
    <section id={id}>
      <Container size="md" className="py-10 lg:py-20">
        <Row className={" lg:gap-10"}>
          <Col width={40} className="relative">
            <PinningComponent desktopOnly>
              <Display size={"sm"} tag={"h2"} className={"mb-4"}>
                {title}
              </Display>
              <Body size={"md"} className={"lg:mb-10"}>
                {description}
              </Body>
              <FilterNavigation
                currentFilter={currentFilter}
                setFilter={setCurrentFilter}
                filterCategories={filters}
                filtersToShow={filtersToShow}
              />
            </PinningComponent>
          </Col>
          <Col width={60} className="">
            <AnimatePresence>
              {filteredProjects.map((item, index) => (
                <ProjectCard
                  key={`project-${index}`}
                  title={item.title}
                  description={item.description}
                  url={item.url || null} // If no URL is provided, remove hover effect
                  image={item.image}
                  categories={showCategoriesOnCard ? item.categories : []}
                />
              ))}
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectFilter;
