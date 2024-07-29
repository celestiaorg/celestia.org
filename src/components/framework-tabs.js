import React, { useState, useEffect } from "react";
import { useLocation } from "@reach/router";
import IconCard from "./modules/icon-card";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const FrameworkTabs = ({ content, categories, anchorId, section, type }) => {
	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);
	const initialFrameworkCategory = urlParams.get("framework_category") || "All";
	const initialRollupCategory = urlParams.get("rollup_category") || "All";
	const [selectedFrameworkTab, setSelectedFrameworkTab] = useState(initialFrameworkCategory);
	const [selectedRollupTab, setSelectedRollupTab] = useState(initialRollupCategory);

	const allUniqueCategories = [...new Set(categories.items.flatMap((item) => item.category))];

	useEffect(() => {
		if (type === "framework" && initialFrameworkCategory !== selectedFrameworkTab) {
			setSelectedFrameworkTab(initialFrameworkCategory);
		}
		if (type === "rollup" && initialRollupCategory !== selectedRollupTab) {
			setSelectedRollupTab(initialRollupCategory);
		}
	}, [initialFrameworkCategory, initialRollupCategory, type]);

	const handleTabClick = (category, tabType) => {
		if (tabType === "framework") {
			setSelectedFrameworkTab(category);
		} else if (tabType === "rollup") {
			setSelectedRollupTab(category);
		}
		const newUrl = `${location.pathname.replace(/\/$/, "")}?framework_category=${
			tabType === "framework" ? category : selectedFrameworkTab
		}&rollup_category=${tabType === "rollup" ? category : selectedRollupTab}`;
		window.history.pushState({}, "", newUrl);
	};

	return (
		<section className='frameworks' id={`${content.items[anchorId].title.replace(/\s+/g, "-").toLowerCase()}`}>
			<div className={"container"}>
				<div className={"subtitle"}>{categories.subtitle}</div>
				<h2 className={"text-center"}>{categories.title}</h2>
				{categories.description && <div className={"description text-center mx-auto mt-3"}>{categories.description}</div>}

				<div className={"tabs row justify-content-center"}>
					{allUniqueCategories.map((category) => (
						<div
							key={category}
							className={`col-auto tab-item ${type === "framework" && selectedFrameworkTab === category ? "active" : ""} ${
								type === "rollup" && selectedRollupTab === category ? "active" : ""
							} plausible-event-name=${category.replace(/\s+/g, "-")}_Tab_Click--Developer_Portal-${section}_section`}
							onClick={() => handleTabClick(category, type)}
						>
							{category}
						</div>
					))}
				</div>

				<div className={""}>
					<div className={"row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-5 gy-md-3 my-2 pt-0 pt-md-4 pb-3"}>
						{categories.items
							.filter((item) => item.category.includes(type === "framework" ? selectedFrameworkTab : selectedRollupTab))
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
