import React from "react";
import EventCard from "./event-card";
import { eventData } from "../../datas/events/event-data";

const EventList = ({ eventsNumber, hasEventType, isNotFeatured, pastEvents }) => {
	const getFilteredEvents = (count) => {
		let filteredEvents = eventData;

		// Filter events based on hasEventType if provided
		if (hasEventType) {
			filteredEvents = filteredEvents.filter((event) => event.eventType === hasEventType);
		}

		// Exclude featured events if isNotFeatured is true
		if (isNotFeatured) {
			filteredEvents = filteredEvents.filter((event) => !event.featured);
		}

		// Filter for past events if pastEvents is true
		if (pastEvents) {
			const currentDate = new Date();
			filteredEvents = filteredEvents.filter((event) => new Date(event.date) < currentDate);
		}

		// Sort events by date in descending order (most recent first)
		const sortedEvents = filteredEvents.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		// Return the specified number of events, or all if count is not provided
		return count ? sortedEvents.slice(0, count) : sortedEvents;
	};

	const filteredEvents = getFilteredEvents(eventsNumber || null);

	return (
		<div className={"event-list-container"}>
			{filteredEvents.map((event) => (
				<EventCard
					key={event.id}
					title={event.title}
					image={event.image}
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
