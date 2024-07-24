"use client";
import { Row, Col } from "@/macros/Grids/";
import Container from "@/components/Container/Container";
import { Display, Body } from "@/macros/Copy/";
import FilterNavigation from "@/components/ProjectFilter/ProjectFilterNavigation";
import ProjectCard from "@/components/Cards/ProjectCard/ProjectCard";
import { useState, useEffect } from "react";

const ProjectFilter = ({
  title,
  description,
  filters,
  filterTarget,
  items,
}) => {
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(items);

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
            />
          </Col>
          <Col width={60}>
            {/* TODO: make desktop vertical carousels */}
            {filteredProjects.map((item) => {
              return (
                <ProjectCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  url={item.url || null} // If no URL is provided, remove button + hover effect
                  image={item.image}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectFilter;
