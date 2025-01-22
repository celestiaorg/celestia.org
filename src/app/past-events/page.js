import * as React from "react";
import meta from "@/components/Meta/Meta";
import seo from "@/data/events/past-events-seo";
import { eventData } from "@/data/events/event";
import EventCard from "@/components/EventList/EventCard";
import Container from "@/components/Container/Container";
import { Row, Col } from "@/macros/Grids";
import { Display, Body } from "@/macros/Copy";

export const metadata = meta(seo);

const PastEventsPage = () => {
	const pastEvents = eventData
		.filter((event) => {
			// Filter out invalid entries
			if (!event?.id) return false;

			// Handle date-based events
			try {
				if (!event.startDate.includes("-")) return false;
				return new Date(event.startDate) < new Date();
			} catch (e) {
				console.error("Invalid date format:", event.startDate);
				return false;
			}
		})
		.sort((a, b) => {
			try {
				// Sort in reverse chronological order (newest to oldest)
				return new Date(b.startDate) - new Date(a.startDate);
			} catch (e) {
				return 0;
			}
		});

	return (
		<section className={`bg-white-weak relative flex flex-col-reverse md:block content-center`}>
			<Container size={`lg`} className='flex flex-col pb-16 pt-36 lg:pt-56 lg:pb-28 lg:w-3/4 xl:w-2/3'>
				<Row className='mb-[4.375rem] flex flex-col lg:flex-row gap-3 lg:items-center'>
					<Col width={50}>
						<Display size='md' tag='h1'>
							Past Events
						</Display>
					</Col>
					<Col width={50}>
						<Body
							size='md'
							className={
								"max-w-[31.375rem] lg:text-[1.125rem] lg:leading-[1.625rem] lg:tracking-[.0141rem] lg:font-normal lg:text-[#17141A]"
							}
						>
							Explore past Celestia community events and gatherings.
						</Body>
					</Col>
				</Row>

				{/* Past Events Grid */}
				<Row>
					<Col width={100}>
						<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
							{pastEvents.length > 0 ? (
								pastEvents.map((event) => (
									<EventCard
										key={event.id}
										title={event.title}
										startDate={event.startDate}
										endDate={event.endDate}
										location={event.location}
										url={event.url}
										image={event.image}
										featured={false}
										category={event.category}
									/>
								))
							) : (
								<div className='col-span-2 py-8 text-center'>
									<Body size='md'>No past events to display.</Body>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default PastEventsPage;
