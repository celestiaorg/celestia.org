"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../Container/Container";
import Accordion from "@/components/Accordion/Accordion";
import { stringToId } from "@/utils/stringToId";

const GlossaryAccordion = ({ glossaryData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(glossaryData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(glossaryData);
    } else {
      setFilteredData(
        glossaryData.filter(
          (term) =>
            term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, glossaryData]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const groupedData = alphabet.reduce((acc, letter) => {
    const terms = filteredData.filter(
      (term) => term.title[0].toUpperCase() === letter
    );
    if (terms.length > 0) {
      acc[letter] = terms;
    }
    return acc;
  }, {});

  const [accordionState, setAccordionState] = useState(
    glossaryData.map((term) => ({
      id: stringToId(term.title),
      title: term.title,
      description: term.description,
      isOpen: false,
    }))
  );

  const toggleAccordion = (index, id) => {
    setAccordionState((prevState) =>
      prevState.map((term, i) =>
        i === index ? { ...term, isOpen: !term.isOpen } : term
      )
    );
    const isOpen = !accordionState[index].isOpen;
    if (isOpen) {
      router.push(`/glossary/${id}`, undefined, { shallow: true });
    } else {
      router.push(`/glossary`, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    const { term } = searchParams;
    if (term) {
      const index = accordionState.findIndex((t) => t.id === term);
      if (index !== -1) {
        setAccordionState((prevState) =>
          prevState.map((t, i) => (i === index ? { ...t, isOpen: true } : t))
        );
        document.getElementById(term).scrollIntoView();
      }
    }
  }, [searchParams, accordionState]);

  return (
    <Container size="lg" classtitle={`py-10 lg:py-20`}>
      <div className="sticky top-0 bg-white z-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {alphabet.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className={`p-2 rounded ${
                groupedData[letter] ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {letter}
            </a>
          ))}
        </div>
      </div>
      {Object.keys(groupedData).map((letter) => (
        <div key={letter} id={letter}>
          <h2 className="text-2xl font-bold mb-4">{letter}</h2>
          {groupedData[letter].map((term, index) => (
            <Accordion
              id={term.slug}
              key={term.slug}
              isOpen={accordionState[index]?.isOpen}
              toggleAccordion={() => toggleAccordion(index, term.slug)}
            >
              <Accordion.Header>
                {term.title} - {term.id}
              </Accordion.Header>
              <Accordion.Body>
                <p>{term.description}</p>
              </Accordion.Body>
            </Accordion>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default GlossaryAccordion;
