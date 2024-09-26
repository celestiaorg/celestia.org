import React from "react";
import EventCard from "./event-card";
import { communityEventsData } from "../../datas/events/event-data";

const CommunityEventList = ({ eventsNumber }) => {
	const getCommunityEvents = (count) => {
		const communityEvents = communityEventsData.filter((event) => !event.featured);

		// Sort events by date in descending order (most recent first)
		const sortedEvents = communityEvents.sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		// Return the specified number of events, or all if count is not provided
		return count ? sortedEvents.slice(0, count) : sortedEvents;
	};

	const communityEvents = getCommunityEvents(eventsNumber || null);

	return (
		<div className={"event-list-container"}>
			{communityEvents.map((event) => (
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

export default CommunityEventList;
