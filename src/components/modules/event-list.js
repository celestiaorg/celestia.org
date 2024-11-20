import React from "react";
import EventCard from "./event-card";
import { eventData } from "../../datas/events/event-data";
import { formatDateRange } from "../../utils/date-utils";

const EventList = ({ eventsNumber, hasEventType, isNotFeatured, pastEvents }) => {
	const getFilteredEvents = (count) => {
		let filteredEvents = eventData;
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		if (hasEventType) {
			filteredEvents = filteredEvents.filter((event) => event.eventType === hasEventType);
		}

		if (isNotFeatured) {
			filteredEvents = filteredEvents.filter((event) => !event.featured);
		}

		if (pastEvents) {
			filteredEvents = filteredEvents.filter((event) => {
				if (!event.startDate.includes("-")) return false;
				return new Date(event.endDate || event.startDate) < currentDate;
			});
		} else {
			filteredEvents = filteredEvents.filter((event) => {
				if (!event.startDate.includes("-")) return true;
				return new Date(event.startDate) >= currentDate;
			});
		}

		const sortedEvents = filteredEvents.sort((a, b) => {
			if (!a.startDate.includes("-")) return 1;
			if (!b.startDate.includes("-")) return -1;

			return pastEvents ? new Date(b.startDate) - new Date(a.startDate) : new Date(a.startDate) - new Date(b.startDate);
		});

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
