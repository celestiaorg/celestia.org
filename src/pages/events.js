import * as React from "react";
import { Link } from "gatsby";
import { FooterBoxes } from "../datas/glossary/content";
import Layout from "../components/layout";
import { seoContent } from "../datas/events/seoContent";
import Seo from "../components/seo";
import FeaturedEvent from "../components/modules/featured-event";
import EventList from "../components/modules/event-list";
import { submitButton, viewAllButton } from "../datas/events/event-data";

const EventsPage = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"events-page"}>
				<main>
					<section className={"hero"}>
						<div className={"container"}>
							<h1 className={"main"}>Events</h1>
							<p class='text'>Hangout with the Celestia community IRL or online.</p>
						</div>
					</section>
					<section className={"featured-event"}>
						<div className={"container"}>
							<FeaturedEvent />
						</div>
					</section>
					<section className={"event-list"}>
						<div className={"container"}>
							<EventList hasEventType={"celestia"} isNotFeatured={true} />
						</div>
					</section>
					<section className={"community-events-section"}>
						<div className={"container"}>
							<div className={"event-section-tiltle"}>
								<h2 className={"event-title"}>Community events</h2>
								<a
									href={submitButton.url}
									target='_blank'
									rel='noreferrer'
									className='button button-external submit-event-button mt-3 mt-md-0'
									aria-label={submitButton.label}
								>
									{submitButton.label}
									<i className='icon-external-link'></i>
								</a>
							</div>
							<EventList hasEventType={"community"} isNotFeatured={true} />
							<div className={"mt-5 d-flex justify-content-center"}>
								<Link
									to={viewAllButton.url}
									className='button button-external submit-event-button mt-3 mt-md-0'
									aria-label={submitButton.label}
								>
									{viewAllButton.label}
									<i className='icon-external-link'></i>
								</Link>
							</div>
						</div>
					</section>
				</main>
			</div>
		</Layout>
	);
};

export default EventsPage;
