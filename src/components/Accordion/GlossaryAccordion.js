"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container/Container";
import { Display, Body, Heading } from "@/macros/Copy";
import HeadingWithSuperscript from "@/micros/HeadingWithSuperscript/HeadingWithSuperscript";
import { Col, Row } from "@/macros/Grids";
import Icon from "@/macros/Icons/Icon";
import SearchInput from "@/macros/Forms/SearchInput";
import Link from "next/link";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { usePathname } from "next/navigation";

const GlossaryDirectory = ({ glossaryData }) => {
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

	const groupedTerms = alphabet.reduce((acc, letter) => {
		const terms = filteredData.filter((term) => term.title[0].toUpperCase() === letter);
		if (terms.length > 0) {
			acc[letter] = terms;
		}
		return acc;
	}, {});

	const clearSearch = () => {
		setSearchTerm("");
		router.push(`/glossary/`, {
			scroll: false,
			shallow: true,
		});
	};

	// Simplified scroll to term effect
	useEffect(() => {
		const term = pathname.split("/").filter(Boolean).pop();
		if (term) {
			setTimeout(() => {
				const element = document.getElementById(`accordion-${term}`);
				if (element) {
					const scrollIntoView = element.getBoundingClientRect().top < 0 || element.getBoundingClientRect().top > window.innerHeight;

					if (scrollIntoView) {
						element.scrollIntoView({ behavior: "smooth", block: "center" });
					}
				}
			}, 100);
		}
	}, [pathname]);

	return (
		<Container size='xl'>
			<Row className={"py-10 lg:flex lg:gap-12 lg:items-center"}>
				<Col width={searchFocus ? 50 : 30} className={"transition-all mb-10"}>
					<SearchInput
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onFocus={() => setSearchFocus(true)}
						onBlur={() => setSearchFocus(false)}
					/>
				</Col>
				<Col width={searchFocus ? 50 : 70} className={"transition-all"}>
					<div className='flex w-auto gap-2 mx-auto overflow-x-scroll no-scrollbar'>
						{alphabet.map((letter) => {
							const isDisabled = !groupedTerms[letter];
							return (
								<Link
									key={letter}
									href={`#${letter}`}
									className={`group ${isDisabled ? "opacity-30 pointer-events-none" : ""}`}
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
			<Container size='lg'>
				{Object.keys(groupedTerms).map((letter) => (
					<Row key={letter} id={letter} className={"py-10 lg:py-20 lg:flex lg:gap-12"}>
						<Col width={20} className='lg:py-6'>
							<HeadingWithSuperscript>
								<HeadingWithSuperscript.Heading>
									<Display size={"xl"} tag={"h3"}>
										{letter}
									</Display>
								</HeadingWithSuperscript.Heading>
							</HeadingWithSuperscript>
						</Col>
						<Col width={80}>
							{groupedTerms[letter].map((term) => (
								<div key={term.slug} id={`accordion-${term.slug}`} className='border-b border-black-subtle last:border-b-0'>
									<div className='py-6'>
										<Heading tag={"h3"} size={"sm"} className={"text-left mb-4"}>
											{term.title}
										</Heading>
										<Body size={"md"} className={`text-black-subtle`}>
											{term.description}
										</Body>
									</div>
								</div>
							))}
						</Col>
					</Row>
				))}

				{
					// If no results are found
					filteredData.length === 0 && (
						<Row className={"py-20"}>
							<Col width={100} className={"min-h-[30vh] flex flex-col content-center justify-center"}>
								<Display size={"sm"} tag={"h3"} className={"text-center"}>
									No results found
								</Display>
								<PrimaryButton className={"mx-auto mt-8"} type={"primary"} lightMode onClick={clearSearch}>
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

export default GlossaryDirectory;
