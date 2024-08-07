import React, { useState, useEffect } from "react";
import IconCard from "./modules/icon-card";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import queryString from "query-string";

const FrameworkTabs = ({ content, categories, anchorId, section }) => {
	const [selectedTab, setSelectedTab] = useState("All");

	useEffect(() => {
		// Function to get URL parameters
		const getUrlParameter = (name) => {
			if (typeof window !== "undefined") {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
				var results = regex.exec(window.location.search);
				return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}
			return "";
		};

		// Set the selected tab based on URL parameter
		const paramName = section.toLowerCase() + "_category";
		const categoryFromUrl = getUrlParameter(paramName);
		if (categoryFromUrl && categories.items.some((item) => item.category.includes(categoryFromUrl))) {
			setSelectedTab(categoryFromUrl);
		}
	}, [section, categories.items]);

	const allUniqueCategories = ["All", ...new Set(categories.items.flatMap((item) => item.category))];

	return (
		<section className='frameworks' id={`${content.items[anchorId].title.replace(/\s+/g, "-").toLowerCase()}`}>
			<div className={"container"}>
				<div className={"subtitle"}>{categories.subtitle}</div>
				<h2 className={"text-center"}>{categories.title}</h2>
				{categories.description && <div className={"description text-center mx-auto mt-3"}>{categories.description}</div>}

				<div className={"tabs row justify-content-center"}>
					{allUniqueCategories.map(function (category) {
						return (
							<div
								key={category}
								className={`col-auto tab-item ${selectedTab === category && "active"} plausible-event-name=${category.replace(
									/\s+/g,
									"-"
								)}_Tab_Click--Developer_Portal-${section}_section`}
								onClick={() => setSelectedTab(category)}
							>
								{category}
							</div>
						);
					})}
				</div>

				<div className={""}>
					<div className={"row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-5 gy-md-3 my-2 pt-0 pt-md-4 pb-3"}>
						{categories.items
							.filter((item) => item.category.includes(selectedTab))
							.map((item) => (
								<IconCard
									className='icon-card-wrapper col'
									key={item.id}
									content={item}
									variant={"vertical"}
									btnClass={
										"plausible-event-name=" +
										section +
										"_Click_" +
										item.title.replace(/\s/g, "+") +
										"--Developer_Portal_Page-" +
										section +
										"_section"
									}
								/>
							))}
					</div>
				</div>

				{anchorId === 0 && (
					<AnchorLink className='link' to={`/build#${content.items[2].title.replace(/\s+/g, "-").toLowerCase()}`} stripHash>
						<div className={"button button-simple mx-auto d-table mt-4"}>Integrate with Celestia</div>
					</AnchorLink>
				)}
			</div>
		</section>
	);
};

export default FrameworkTabs;
