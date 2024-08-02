"use client";
import { Row, Col } from "@/macros/Grids/";
import Container from "@/components/Container/Container";
import { Display, Body } from "@/macros/Copy/";
import FilterNavigation from "@/components/ProjectFilter/ProjectFilterNavigation";
import ProjectCard from "@/components/Cards/ProjectCard/ProjectCard";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "@/app/styles/embla.css";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";

const ProjectFilter = ({
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

  return (
    <section>
      <Container size="md">
        <Row className={"py-10 lg:py-20 lg:gap-10"}>
          <Col width={40} className="overflow-hidden">
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
          </Col>
          <Col width={60}>
            <AnimatePresence>
              <EmblaCarousel
                options={{ loop: false, axis: "y", slidesToScroll: 5 }}
              >
                {/* TODO: make desktop vertical carousels */}
                {filteredProjects.map((item, index) => (
                  <div
                    className=""
                    key={`project-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ height: 100 }}
                  >
                    <ProjectCard
                      title={item.title}
                      description={item.description}
                      url={item.url || null} // If no URL is provided, remove hover effect
                      image={item.image}
                      categories={showCategoriesOnCard ? item.categories : []}
                    />
                  </div>
                ))}
              </EmblaCarousel>
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectFilter;
