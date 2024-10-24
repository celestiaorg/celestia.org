import React from "react";
import EventCard from "./event-card";
import { eventData } from "../../datas/events/event-data";
import { formatDateRange } from "../../utils/date-utils";

const EventList = ({ eventsNumber, hasEventType, isNotFeatured, pastEvents }) => {
	const getFilteredEvents = (count) => {
		let filteredEvents = eventData;
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

		// Filter events based on hasEventType if provided
		if (hasEventType) {
			filteredEvents = filteredEvents.filter((event) => event.eventType === hasEventType);
		}

		// Exclude featured events if isNotFeatured is true
		if (isNotFeatured) {
			filteredEvents = filteredEvents.filter((event) => !event.featured);
		}

		// Filter for past events or future/current events based on pastEvents prop
		if (pastEvents) {
			filteredEvents = filteredEvents.filter((event) => new Date(event.endDate || event.startDate) < currentDate);
		} else {
			filteredEvents = filteredEvents.filter((event) => new Date(event.startDate) >= currentDate);
		}

		// Sort events by date
		const sortedEvents = filteredEvents.sort((a, b) => {
			return pastEvents
				? new Date(b.startDate) - new Date(a.startDate) // Descending order for past events
				: new Date(a.startDate) - new Date(b.startDate); // Ascending order for future events
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
					date={formatDateRange(event.startDate, event.endDate)}
					location={event.location}
					url={event.url}
				/>
			))}
		</div>
	);
};

export default EventList;
