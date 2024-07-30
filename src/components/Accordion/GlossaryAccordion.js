"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../Container/Container";
import Accordion from "@/components/Accordion/Accordion";
import { stringToId } from "@/utils/stringToId";
import { Display, Body } from "@/macros/Copy";
import HeadingWithSuperscript from "@/micros/HeadingWithSuperscript/HeadingWithSuperscript";
import { Col, Row } from "@/macros/Grids";
import Icon from "@/macros/Icons/Icon";

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
    <>
      {" "}
      <Container size="xl">
        <Row className={"py-10 lg:flex lg:gap-12 lg:items-center"}>
          <Col width={30}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-4 border rounded w-full"
            />
          </Col>
          <Col width={70}>
            <div className="flex overflow-x-scroll w-auto mx-auto gap-2 no-scrollbar">
              {alphabet.map((letter) => (
                <>
                  {groupedData[letter] && (
                    <a key={letter} href={`#${letter}`} className={`group`}>
                      <Icon
                        className={"w-auto px-9"}
                        Icon={
                          <Display size={"xs"} className={"text-black"}>
                            {letter}
                          </Display>
                        }
                        size={"lg"}
                        hover
                        HoverIcon={
                          <Display size={"xs"} className={"text-white"}>
                            {letter}
                          </Display>
                        }
                        border
                      />
                    </a>
                  )}
                </>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Container size="lg">
        {Object.keys(groupedData).map((letter, index) => (
          <Row
            key={letter}
            id={letter}
            className={"py-10 lg:py-20 lg:flex lg:gap-12"}
          >
            <Col width={20} className="lg:py-6">
              <HeadingWithSuperscript>
                <HeadingWithSuperscript.Heading>
                  <Display size={"xl"} tag={"h3"}>
                    {letter}
                  </Display>
                </HeadingWithSuperscript.Heading>
                <HeadingWithSuperscript.Superscript>
                  <Body size="sm" className={"text-right"}>
                    {index + 1}-{Object.keys(groupedData).length}
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={80}>
              {groupedData[letter].map((term, index) => (
                <Accordion
                  id={term.slug}
                  key={term.slug}
                  isOpen={accordionState[index]?.isOpen}
                  toggleAccordion={() => toggleAccordion(index, term.slug)}
                >
                  <Accordion.Header>{term.title}</Accordion.Header>
                  <Accordion.Body className="pr-16">
                    <p>{term.description}</p>
                  </Accordion.Body>
                </Accordion>
              ))}
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default GlossaryAccordion;
