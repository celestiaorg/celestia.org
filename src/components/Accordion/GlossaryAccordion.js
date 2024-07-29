"use client";
import React, { useState } from "react";
import Container from "../Container/Container";
import Accordion from "@/components/Accordion/Accordion";
import { stringToId } from "@/utils/stringToId";

// TODO: update url params with FAQ id for easy sharing of specific FAQ

const GlossaryAccordion = ({ glossaryData }) => {
  // Store the glossaryData and an isOpen state (default to false) as state
  const [accordionState, setAccordionState] = useState(
    glossaryData.map((term) => ({
      id: stringToId(term.title),
      title: term.title,
      description: term.description,
      isOpen: false,
    }))
  );

  const toggleAccordion = (index) => {
    setAccordionState((prevState) =>
      prevState.map((term, i) =>
        i === index ? { ...term, isOpen: !term.isOpen } : term
      )
    );
  };

  return (
    <Container size="lg" classtitle={`py-10 lg:py-20`}>
      {accordionState.map((term, index) => (
        <Accordion
          id={term.id}
          key={term.id}
          isOpen={term.isOpen}
          toggleAccordion={() => toggleAccordion(index)}
        >
          <Accordion.Header>{term.title}</Accordion.Header>
          <Accordion.Body>
            <p>{term.description}</p>
          </Accordion.Body>
        </Accordion>
      ))}
    </Container>
  );
};

export default GlossaryAccordion;
