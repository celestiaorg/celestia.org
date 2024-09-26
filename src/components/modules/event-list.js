import React from "react";
import EventCard from "./event-card";
import { eventData } from "../../datas/events/event-data";

const EventList = ({ eventsNumber }) => {
	const getNotFeaturedEvents = (count) => {
		const notFeaturedEvents = eventData.filter((event) => !event.featured);

		// Sort events by date in descending order (most recent first)
		const sortedEvents = notFeaturedEvents.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		// Return the specified number of events, or all if count is not provided
		return count ? sortedEvents.slice(0, count) : sortedEvents;
	};

	const notFeaturedEvents = getNotFeaturedEvents(eventsNumber || null);

	return (
		<div className={"event-list-container"}>
			{notFeaturedEvents.map((event) => (
				<EventCard
					key={event.id}
					title={event.title}
					image={event.image}
					imagePosition={event.imagePosition}
					description={event.description}
					date={event.date}
					location={event.location}
					url={event.url}
				/>
			))}
		</div>
	);
};

export default EventList;
