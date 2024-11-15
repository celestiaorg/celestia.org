"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "../Container/Container";
import Accordion from "@/components/Accordion/Accordion";
import { Display, Body, Heading } from "@/macros/Copy";
import HeadingWithSuperscript from "@/micros/HeadingWithSuperscript/HeadingWithSuperscript";
import { Col, Row } from "@/macros/Grids";
import Icon from "@/macros/Icons/Icon";
import SearchInput from "@/macros/Forms/SearchInput";
import Link from "next/link";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import FacebookSVG from "@/macros/SVGs/FacebookSVG";
import XTwitterSVG from "@/macros/SVGs/XTwitterSVG";
import EmailAltSVG from "@/macros/SVGs/EmailAltSVG";
import CopySVG from "@/macros/SVGs/CopySVG";
import { usePathname } from "next/navigation";

const GlossaryAccordion = ({ glossaryData }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
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

  // Group glossary data by the first letter of each term's title
  const groupedData = alphabet.reduce((acc, letter) => {
    const terms = filteredData.filter(
      (term) => term.title[0].toUpperCase() === letter
    );
    if (terms.length > 0) {
      acc[letter] = terms;
    }
    return acc;
  }, {});

  // Initialize accordion state with unique IDs and open/close status
  const [accordionState, setAccordionState] = useState(
    glossaryData.reduce((acc, term) => {
      acc[term.slug] = { ...term, isOpen: false };
      return acc;
    }, {})
  );

  const toggleAccordion = (id) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        isOpen: !prevState[id].isOpen,
      },
    }));

    const isOpen = !accordionState[id].isOpen;
    if (isOpen) {
      router.push(`/glossary/${id}`, {
        scroll: false,
        shallow: true,
      });
    } else {
      router.push(`/glossary`, { scroll: false, shallow: true });
    }
  };
  const clearSearch = () => {
    setSearchTerm("");
    router.push(`/glossary`, {
      scroll: false,
      shallow: true,
    });
  };

  // Initial load effect to open and scroll to the term from URL if present
  useEffect(() => {
    const term = pathname.split("/").pop();
    if (term && accordionState[term]) {
      // Open the specified accordion
      setAccordionState((prevState) => ({
        ...prevState,
        [term]: { ...prevState[term], isOpen: true },
      }));

      // Scroll to the accordion element smoothly
      setTimeout(() => {
        const element = document.getElementById(`accordion-${term}`);
        const scrollIntoView =
          element?.getBoundingClientRect().top < 0 ||
          element?.getBoundingClientRect().top > window.innerHeight;

        // if element is not in view, scroll to it
        if (scrollIntoView) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100); // Delay to ensure DOM is fully ready
    }
  }, [pathname]);

  return (
    <Container size="xl">
      <Row className={"py-10 lg:flex lg:gap-12 lg:items-center"}>
        <Col width={searchFocus ? 50 : 30} className={"transition-all"}>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </Col>
        <Col width={searchFocus ? 50 : 70} className={"transition-all"}>
          <div className="flex overflow-x-scroll w-auto mx-auto gap-2 no-scrollbar">
            {alphabet.map((letter) => {
              const isDisabled = !groupedData[letter];
              return (
                <Link
                  key={letter}
                  href={`#${letter}`}
                  className={`group ${
                    isDisabled ? "opacity-30 pointer-events-none" : ""
                  }`}
                  disabled={isDisabled}
                >
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
                </Link>
              );
            })}
          </div>
        </Col>
      </Row>
      <Container size="lg">
        {Object.keys(groupedData).map((letter, letterIndex) => (
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
                    {letterIndex + 1}-{Object.keys(groupedData).length}
                  </Body>
                </HeadingWithSuperscript.Superscript>
              </HeadingWithSuperscript>
            </Col>
            <Col width={80}>
              {groupedData[letter].map((term) => {
                const isOpen = accordionState[term.slug]?.isOpen;
                return (
                  <Accordion
                    id={term.slug}
                    key={term.slug}
                    isOpen={isOpen}
                    toggleAccordion={() => toggleAccordion(term.slug)}
                  >
                    <Accordion.Header>
                      <Heading tag={"h3"} size={"sm"}>
                        {term.title}
                      </Heading>
                    </Accordion.Header>
                    <Accordion.Body className="pr-16 pb-6">
                      <Body
                        size={"md"}
                        className={`text-black-subtle mb-4
                        ${isOpen ? "-mt-2" : "mt-0"}
                        `}
                      >
                        {term.description}
                      </Body>
                      <ShareIcons slug={term.slug} />
                    </Accordion.Body>
                  </Accordion>
                );
              })}
            </Col>
          </Row>
        ))}

        {
          // If no results are found
          filteredData.length === 0 && (
            <Row className={"py-20"}>
              <Col
                width={100}
                className={
                  "min-h-[30vh] flex flex-col content-center justify-center"
                }
              >
                <Display size={"sm"} tag={"h3"} className={"text-center"}>
                  No results found
                </Display>
                <PrimaryButton
                  className={"mx-auto mt-8"}
                  type={"primary"}
                  lightMode
                  onClick={clearSearch}
                >
                  Clear search
                </PrimaryButton>
              </Col>
            </Row>
          )
        }
      </Container>
    </Container>
  );
};

const ShareIcons = ({ slug }) => {
  const socialLinks = [
    {
      url: `https://twitter.com/intent/tweet?url=https://celestia.org/glossary/${slug}`,
      Icon: <XTwitterSVG className="w-5" />,
      IconHover: <XTwitterSVG dark className="w-6" />,
      text: "Share on Twitter/X",
    },
    {
      url: `mailto:?subject=Check out Celestia&body=Check out Celestia: https://celestia.org/glossary/${slug}`,
      Icon: <EmailAltSVG className="w-6" />,
      IconHover: <EmailAltSVG dark className="w-7 h-7" />,
      text: "Share via Email",
    },
    {
      url: `https://www.facebook.com/sharer/sharer.php?u=https://celestia.org/glossary/${slug}`,
      Icon: <FacebookSVG className="w-6" />,
      IconHover: <FacebookSVG dark className="w-7 h-7" />,
      text: "Share on Facebook",
    },
    {
      onClick: () => {
        navigator.clipboard.writeText(`https://celestia.org/glossary/${slug}`);
      },
      Icon: <CopySVG className="w-7 h-7" />,
      IconHover: <CopySVG dark className="w-8 h-8" />,
      text: "Copy link",
    },
  ];

  return (
    <div className="flex">
      {socialLinks.map((link, index) => {
        const Tag = link.url ? "a" : "button";

        return (
          <Tag
            key={index}
            href={link.url}
            onClick={link.onClick}
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <Icon
              Icon={link.Icon}
              hover
              dark={false}
              border={false}
              HoverIcon={link.IconHover}
              size={40}
              transparentBg={false}
            />
          </Tag>
        );
      })}
    </div>
  );
};

export default GlossaryAccordion;
