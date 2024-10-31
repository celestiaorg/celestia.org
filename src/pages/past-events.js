import * as React from "react";
import { FooterBoxes } from "../datas/glossary/content";
import Layout from "../components/layout";
import { seoContent } from "../datas/glossary/seoContent";
import Seo from "../components/seo";
import EventList from "../components/modules/event-list";

const PastEventsPage = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"events-page"}>
				<main>
					<section className={"hero"}>
						<div className={"container"}>
							<h1 className={"main"}>Past events</h1>
						</div>
					</section>
					<section className={"community-events-section"}>
						<div className={"container"}>
							<EventList pastEvents={true} />
						</div>
					</section>
				</main>
			</div>
		</Layout>
	);
};

export default PastEventsPage;
