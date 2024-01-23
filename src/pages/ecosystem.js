import * as React from "react";
import { ecosystemItems, ecosystemCategories } from "../datas/ecosystem/ecosystems";
import { FooterBoxes } from "../datas/ecosystem/content";
import Layout from "../components/layout";
import { useState } from "react";
import Ecosystem from "../components/ecosystem";

import { seoContent } from "../datas/ecosystem/seoContent";
import Seo from "../components/seo";

const EcosystemPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);
	const searchInputRef = React.useRef(null);
	const scrollToRef = React.useRef(null);

	function searchApp(e) {
		e.preventDefault();
		setSearch(e.target.value.toLowerCase());
		setSelectedCategory("all");
	}

	function openCategorySelector(category) {
		setOpen(!open);
		setSelectedCategory(category);
		setSearch(false);
		if (!open && searchInputRef.current) {
			searchInputRef.current.value = "";
		}

		// Perform the scroll after the state has been updated
		setTimeout(() => {
			if (scrollToRef.current) {
				const top = scrollToRef.current.offsetTop - 40;
				window.scrollTo({ top, behavior: "smooth" });
			}
		}, 0); // Timeout ensures this runs after the state updates
	}

	// Map each ecosystem item to its categories
	const itemsWithCategories = ecosystemItems.map((item) => {
		const categories = ecosystemCategories.categories.filter((category) => category.items.includes(item.title)).map((category) => category.name);
		return { ...item, categories };
	});

	// Sort categories based on the order property
	let sortedCategories = [...ecosystemCategories.categories];
	if (ecosystemCategories.order === "asc") {
		sortedCategories.sort((a, b) => a.name.localeCompare(b.name));
	} else if (ecosystemCategories.order === "desc") {
		sortedCategories.sort((a, b) => b.name.localeCompare(a.name));
	}

	// React.useEffect(() => {
	// 	if (scrollToRef.current) {
	// 		const top = scrollToRef.current.offsetTop - 40;
	// 		window.scrollTo({ top, behavior: "smooth" });
	// 	}
	// }, [selectedCategory]);
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"ecosystem-page"}>
				<main>
					<div className={"hero container"}>
						<h1 className={"main mb-3 mb-md-5"}>Celestia Ecosystem</h1>
						<div className={"row"}>
							<div className={"col-auto"}>
								<div className={"text"}>Discover a wide range of apps and services built in the Celestia ecosystem.</div>
							</div>
						</div>

						<div ref={scrollToRef} className={"row my-2 pt-2 pt-lg-5 my-lg-5 pb-3"}>
							<div className={"col-12"}>
								<div className={"row"}>
									<div className='col-12 col-md-8'>
										<div className={"category-selector"}>
											<div className={`category-selector-box ${open ? "opened" : ""}`}>
												<ul className='category-list'>
													<li className={`position-relative ${selectedCategory === "all" ? "selected" : ""}`}>
														<div
															className={"click-target"}
															onClick={() => openCategorySelector("all")}
															onKeyDown={(e) => {
																if (e.key === "Enter") openCategorySelector("all");
															}}
															tabIndex={0}
															role='button'
														>
															<span>All</span>
															{selectedCategory === "all" && (
																<svg
																	id={"mobile-category"}
																	viewBox='0 0 22 22'
																	version='1.1'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
																		<g transform='translate(-485.000000, -1044.000000)'>
																			<g transform='translate(227.000000, 410.000000)'>
																				<g transform='translate(269.000000, 645.000000) rotate(-90.000000) translate(-269.000000, -645.000000) translate(258.000000, 634.000000)'>
																					<rect fill='#EDEDED' x='0' y='0' width='22' height='22' rx='4' />
																					<polyline
																						stroke='#000000'
																						strokeWidth='1.5'
																						strokeLinecap='round'
																						transform='translate(10.694444, 11.152778) rotate(-270.000000) translate(-10.694444, -11.152778) '
																						points='7.94444444 9.77777778 10.6944444 12.5277778 13.4444444 9.77777778'
																					/>
																				</g>
																			</g>
																		</g>
																	</g>
																</svg>
															)}
														</div>
													</li>
													{sortedCategories.map(function (category) {
														return (
															<li
																className={`position-relative ${
																	selectedCategory === category.name ? "selected" : ""
																}`}
															>
																<div
																	className='click-target'
																	onClick={() => openCategorySelector(category.name)}
																	onKeyDown={(e) => {
																		if (e.key === "Enter") openCategorySelector(category.name);
																	}}
																	tabIndex={0}
																	role='button'
																>
																	<span>{category.name}</span>
																	{selectedCategory === category.name && (
																		<svg
																			id={"mobile-category"}
																			viewBox='0 0 22 22'
																			version='1.1'
																			xmlns='http://www.w3.org/2000/svg'
																		>
																			<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
																				<g transform='translate(-485.000000, -1044.000000)'>
																					<g transform='translate(227.000000, 410.000000)'>
																						<g transform='translate(269.000000, 645.000000) rotate(-90.000000) translate(-269.000000, -645.000000) translate(258.000000, 634.000000)'>
																							<rect
																								fill='#EDEDED'
																								x='0'
																								y='0'
																								width='22'
																								height='22'
																								rx='4'
																							/>
																							<polyline
																								stroke='#000000'
																								strokeWidth='1.5'
																								strokeLinecap='round'
																								transform='translate(10.694444, 11.152778) rotate(-270.000000) translate(-10.694444, -11.152778) '
																								points='7.94444444 9.77777778 10.6944444 12.5277778 13.4444444 9.77777778'
																							/>
																						</g>
																					</g>
																				</g>
																			</g>
																		</svg>
																	)}
																</div>
															</li>
														);
													})}
												</ul>
											</div>
										</div>
									</div>
									<div className={"col-12 col-md-4"}>
										<div className={"search-input"}>
											<input
												ref={searchInputRef}
												type='text'
												id={"search"}
												placeholder={"Search app"}
												onKeyUp={searchApp}
												onClick={() => {
													if (scrollToRef.current) {
														const top = scrollToRef.current.offsetTop - 40;
														window.scrollTo({ top, behavior: "smooth" });
													}
												}}
											/>
										</div>
									</div>
								</div>
								<div className={"row px-2 mt-5"}>
									{itemsWithCategories
										.filter(
											(ecosystem) =>
												(selectedCategory === "all" || ecosystem.categories.includes(selectedCategory)) &&
												(!search || ecosystem.title.toLowerCase().includes(search))
										)
										.sort((a, b) => a.title.localeCompare(b.title))
										.map((ecosystem, index) => (
											<div className={"col-12 col-sm-6 col-lg-6 col-xl-4 p-1"} key={index}>
												<Ecosystem ecosystem={ecosystem} />
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Layout>
	);
};

export default EcosystemPage;
