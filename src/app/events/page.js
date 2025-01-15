import * as React from "react";
import meta from "@/components/Meta/Meta";
import seo from "@/data/events/seo";
import { eventData } from "@/data/events/event";
import EventCard from "@/components/EventList/EventCard";
import Container from "@/components/Container/Container";
import { Row, Col } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";

export const metadata = meta(seo);

const EventsPage = () => {
	const upcomingEvents = eventData
		.filter((event) => {
			// Filter out invalid entries (like the empty comma in the data)
			if (!event?.id) return false;

			// Handle date-based events
			try {
				if (!event.startDate.includes("-")) return true;
				const eventDate = new Date(event.startDate);
				return eventDate >= new Date();
			} catch (e) {
				console.error("Invalid date format:", event.startDate);
				return false;
			}
		})
		.sort((a, b) => {
			try {
				if (!a.startDate.includes("-")) return -1;
				if (!b.startDate.includes("-")) return 1;
				return new Date(a.startDate) - new Date(b.startDate);
			} catch (e) {
				return 0;
			}
		});

	return (
		<section className={`bg-white-weak relative flex flex-col-reverse md:block content-center`}>
			<Container size={`lg`} className='flex flex-col pb-16 pt-36 lg:pt-56 lg:pb-28 lg:w-3/4 xl:w-2/3'>
				<Row className='mb-[70px] flex flex-col lg:flex-row gap-3 lg:items-center'>
					<Col width={50}>
						<Display size='md' tag='h1'>
							Events
						</Display>
					</Col>
					<Col width={50}>
						<Body
							size='md'
							className={"max-w-[502px] lg:text-[18px] lg:leading-[26px] lg:tracking-[0.225px] lg:font-normal lg:text-[#17141A]"}
						>
							Join the collective powering an open internet. Run a light node on Celestia to secure your assets and become sovereign.
						</Body>
					</Col>
				</Row>
				<Row>
					<Col width={100}>
						<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
							{upcomingEvents.map((event) => (
								<EventCard
									key={event.id}
									title={event.title}
									startDate={event.startDate}
									endDate={event.endDate}
									location={event.location}
									url={event.url}
									image={event.image}
									featured={event.featured}
									category={event.category}
								/>
							))}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default EventsPage;
