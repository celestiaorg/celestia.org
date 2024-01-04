import * as React from "react";
import { ecosystemCategories } from "../datas/ecosystem/ecosystems";
import { FooterBoxes } from "../datas/ecosystem/content";
import Layout from "../components/layout";
import { useState } from "react";
import Ecosystem from "../components/ecosystem";

import { seoContent } from "../datas/ecosystem/seoContent";
import Seo from "../components/seo";

const EcosystemPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [search, setSearch] = useState(false);
	const [open, setOpen] = useState(false);
	var ecosystems = [];
	const searchInputRef = React.useRef(null);

	const allUniqueCategories = [...new Set(ecosystemCategories.flatMap((item) => item.category))];

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
	}

	ecosystemCategories.forEach(function (ecosystem) {
		ecosystems.push({ details: ecosystem, category: ecosystem.category });
	});

	function sortByKey(array, key) {
		return array.sort(function (a, b) {
			var x = a.details[key];
			var y = b.details[key];
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}

	sortByKey(ecosystems, "title");

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

						<div className={"row my-2 pt-2 pt-lg-5 my-lg-5 pb-3"}>
							<div className={"col-12 col-lg-4"}>
								<div className={"category-selector"}>
									<div className={`category-selector-box ${open ? "opened" : ""}`}>
										<ul>
											<li className={`${selectedCategory === "all" ? "selected" : ""}`}>
												<div
													onClick={() => openCategorySelector("all")}
													onKeyDown={(e) => {
														if (e.key === "Enter") openCategorySelector("all");
													}}
													tabIndex={0}
													role='button'
												>
													All
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
											{allUniqueCategories.map(function (category) {
												return (
													<li className={`${selectedCategory === category ? "selected" : ""}`}>
														<div
															onClick={() => openCategorySelector(category)}
															onKeyDown={(e) => {
																if (e.key === "Enter") openCategorySelector(category);
															}}
															tabIndex={0}
															role='button'
														>
															{category}
															{selectedCategory === category && (
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
												);
											})}
										</ul>
									</div>
								</div>
								<div className={"fake"}>&nbsp;</div>
							</div>
							<div className={"col-12 col-lg-8"}>
								<div className={"row"}>
									<div className={"col-12 px-1"}>
										<div className={"search-input"}>
											<input ref={searchInputRef} type='text' id={"search"} placeholder={"Search app"} onKeyUp={searchApp} />
										</div>
									</div>
								</div>
								<div className={"row"}>
									{ecosystemCategories
										.filter(
											(item) =>
												(selectedCategory === "all" || item.category.includes(selectedCategory)) &&
												(!search || item.title.toLowerCase().includes(search))
										)
										.sort((a, b) => a.title.localeCompare(b.title)) // Add this line
										.map((item, index) => (
											<div className={"col-12 col-sm-6 col-lg-6 col-xl-4 p-1"} key={index}>
												<Ecosystem category={item.category} ecosystem={item} />
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
