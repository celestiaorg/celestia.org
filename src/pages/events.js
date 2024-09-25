import * as React from "react";
import { FooterBoxes } from "../datas/glossary/content";
import Layout from "../components/layout";
import { seoContent } from "../datas/glossary/seoContent";
import Seo from "../components/seo";
import FeaturedEvent from "../components/modules/featured-event";
import EventList from "../components/modules/event-list";

const EventsPage = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"events-page"}>
				<main>
					<section className={"hero"}>
						<div className={"container"}>
							<h1 className={"main"}>Events</h1>
							<p class='text'>
								Join the collective powering an open internet. Run a light node on Celestia to secure your assets and become
								sovereign.
							</p>
						</div>
					</section>
					<section className={"featured-event"}>
						<div className={"container"}>
							<FeaturedEvent />
						</div>
					</section>
					<section className={"event-list"}>
						<div className={"container"}>
							<EventList />
						</div>
					</section>
				</main>
			</div>
		</Layout>
	);
};

export default EventsPage;
