import * as React from "react";

import { heroData } from "../datas/build/hero-data";
import { getStarted } from "../datas/build/get-started";
import { frameworks } from "../datas/build/frameworks";
import { rollups } from "../datas/build/rollups";
import { connect } from "../datas/build/connect";
import { discover } from "../datas/build/discover";
import { community } from "../datas/build/community";
import { FooterBoxes } from "../datas/build/content";
import Layout from "../components/layout";
import IconCard from "../components/modules/icon-card";

import { seoContent } from "../datas/build/seoContent";
import Seo from "../components/seo";
import FrameworkTabs from "../components/framework-tabs";
import ContactSection from "../components/sections/contact-section";
import IntegrateSection from "../components/sections/integrate-section";

const Build = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"build"}>
				<main>
					<section className='hero'>
						<div className={"container"}>
							<div className={"row justify-content-center"}>
								<div className={"col-auto"}>
									<h1 className={"text-center"}>{heroData.title}</h1>
								</div>
							</div>
						</div>
					</section>

					<section className='get-started pt-3'>
						<div className={"container"}>
							{getStarted.description && <div className={"description"}>{getStarted.description}</div>}
							<div className={"row gx-3 gy-3 pt-4 pb-3"}>
								{getStarted.items.map(function (item) {
									return (
										<IconCard
											className='icon-card-wrapper col-12 col-md min-width-33'
											key={item.id}
											content={item}
											variant={"vertical anchor no-image"}
											btnClass={`plausible-event-name=${item.title.replace(/ /g, "_")}--Developer_Portal-Hero_Section`}
										/>
									);
								})}
							</div>
						</div>
					</section>

					<FrameworkTabs content={getStarted} categories={frameworks} anchorId={0} section={"Framework"} />

					<section className='discover pt-5'>
						<div className={"container"}>
							<h2 className={"text-center"}>{discover.title}</h2>
							{discover.description && <div className={"description"}>{discover.description}</div>}
							<div className={"row gx-3 gy-3 pt-4 mt-4"}>
								{discover.items.map(function (item) {
									return (
										<IconCard
											className='icon-card-wrapper col-12 col-md min-width-33'
											key={item.id}
											content={item}
											variant={"vertical no-image"}
											btnClass={`plausible-event-name=${item.title.replace(
												/ /g,
												"_"
											)}--Developer_Portal-Developer_Resources_Section`}
										/>
									);
								})}
							</div>
						</div>
					</section>

					<IntegrateSection content={getStarted} anchorId={1} />

					<FrameworkTabs content={getStarted} categories={rollups} anchorId={2} section={"Rollups"} />

					<ContactSection />
				</main>
			</div>
		</Layout>
	);
};

export default Build;
