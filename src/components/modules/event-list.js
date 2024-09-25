import React from "react";
import EventCard from "./event-card";
import { getNotFeaturedEvents } from "../../datas/events/event-data";

const EventList = () => {
	const notFeaturedEvents = getNotFeaturedEvents();

	return (
		<div className={"event-list-container"}>
			{notFeaturedEvents.map((event) => (
				<EventCard
					key={event.id}
					title={event.title}
					image={event.image}
					description={event.description}
					date={event.date}
					location={event.location}
					category={event.category}
					featured={event.featured}
				/>
			))}
		</div>
	);
};

export default EventList;
