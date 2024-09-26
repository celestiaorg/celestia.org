import * as React from "react";
import { FooterBoxes } from "../datas/glossary/content";
import Layout from "../components/layout";
import { seoContent } from "../datas/glossary/seoContent";
import Seo from "../components/seo";
import EventList from "../components/modules/event-list";
import CommunityEventList from "../components/modules/community-event-list";
import { submitButton } from "../datas/events/event-data";

const PastEventsPage = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"events-page"}>
				<main>
					<section className={"hero"}>
						<div className={"container"}>
							<h1 className={"main"}>Past events</h1>
							<p class='text'>
								Join the collective powering an open internet. Run a light node on Celestia to secure your assets and become
								sovereign.
							</p>
						</div>
					</section>
					<section className={"community-events-section"}>
						<div className={"container"}>
							<div className={"event-section-tiltle"}>
								<h2 className={"event-title"}>Celestia events</h2>
								{/* <a
									href={submitButton.url}
									target='_blank'
									rel='noreferrer'
									className='button button-external submit-event-button mt-3 mt-md-0'
									aria-label={submitButton.label}
								>
									{submitButton.label}
									<i className='icon-external-link'></i>
								</a> */}
							</div>
							<EventList />
						</div>
					</section>
					<section className={"community-events-section"}>
						<div className={"container"}>
							<div className={"event-section-tiltle"}>
								<h2 className={"event-title"}>Community events</h2>
								{/* <a
									href={submitButton.url}
									target='_blank'
									rel='noreferrer'
									className='button button-external submit-event-button mt-3 mt-md-0'
									aria-label={submitButton.label}
								>
									{submitButton.label}
									<i className='icon-external-link'></i>
								</a> */}
							</div>
							<CommunityEventList />
						</div>
					</section>
				</main>
			</div>
		</Layout>
	);
};

export default PastEventsPage;
