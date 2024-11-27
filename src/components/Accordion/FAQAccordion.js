"use client";
import React, { useState } from "react";
import Container from "@/components/Container/Container";
import Accordion from "@/components/Accordion/Accordion";
import { stringToId } from "@/utils/stringToId";

const FAQAccordion = ({ faqData }) => {
  // Store the faqData and an isOpen state (default to false) as state
  const [accordionState, setAccordionState] = useState(
    faqData.map((faq) => ({
      id: stringToId(faq.question),
      question: faq.question,
      answer: faq.answer,
      isOpen: false,
    }))
  );

  const toggleAccordion = (index) => {
    setAccordionState((prevState) =>
      prevState.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : faq
      )
    );
  };

  return (
    <Container size="lg" className={`py-10 lg:py-20`}>
      {accordionState.map((faq, index) => (
        <Accordion
          id={faq.id}
          key={faq.id}
          isOpen={faq.isOpen}
          toggleAccordion={() => toggleAccordion(index)}
        >
          <Accordion.Header>{faq.question}</Accordion.Header>
          <Accordion.Body>
            <p>{faq.answer}</p>
          </Accordion.Body>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQAccordion;
