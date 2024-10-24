import React from "react";
import { eventData } from "../../datas/events/event-data";
import Image from "../imageComponent";
import { formatDateRange } from "../../utils/date-utils"; // Import the formatDateRange function

const FeaturedEvent = () => {
	const getFeaturedEvents = () => eventData.filter((event) => event.featured);
	const featuredEvents = getFeaturedEvents();

	const truncateDescription = (text, limit) => {
		if (text.length <= limit) return text;
		return text.slice(0, limit).trim() + "...";
	};

	return (
		<div className={"featured-events-grid"}>
			{featuredEvents.map((featuredEvent) => {
				return (
					<article key={featuredEvent.id} className={"featured-event-container"}>
						<Image className={`event-banner`} alt={featuredEvent.title} filename={featuredEvent.image} />
						<div className={"event-content"}>
							<div className={"event-tags"}>
								{featuredEvent.category.map((tag, index) => (
									<span key={index} className={"tag"}>
										{tag}
									</span>
								))}
							</div>
							<div className={"event-info"}>
								<h2 className={"event-title"}>{featuredEvent.title}</h2>

								<div className={"event-details"}>
									<div className={"event-meta"}>
										<span className={"event-date"}>
											<svg className='icon' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M5.33333 1V3.66667M10.6667 1V3.66667M2 6.33333H14M3.33333 2.33333H12.6667C13.403 2.33333 14 2.93029 14 3.66667V13C14 13.7364 13.403 14.3333 12.6667 14.3333H3.33333C2.59695 14.3333 2 13.7364 2 13V3.66667C2 2.93029 2.59695 2.33333 3.33333 2.33333Z'
													stroke='black'
													stroke-width='1.4'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>
											</svg>
											{formatDateRange(featuredEvent.startDate, featuredEvent.endDate)}
										</span>
										<svg width='5' height='5' viewBox='0 0 5 5' fill='none' xmlns='http://www.w3.org/2000/svg'>
											<circle cx='2.5' cy='2.5' r='2.5' fill='black' />
										</svg>
										<span className={"event-location"}>
											<svg className='icon' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M13.2001 6.60007C13.2001 10.0952 9.32279 13.7353 8.02078 14.8595C7.89948 14.9507 7.75183 15 7.60007 15C7.44831 15 7.30066 14.9507 7.17937 14.8595C5.87735 13.7353 2 10.0952 2 6.60007C2 5.11484 2.59001 3.69044 3.64022 2.64022C4.69044 1.59001 6.11484 1 7.60007 1C9.0853 1 10.5097 1.59001 11.5599 2.64022C12.6101 3.69044 13.2001 5.11484 13.2001 6.60007Z'
													stroke='black'
													stroke-width='1.5'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>
												<path
													d='M7.60007 8.7001C8.75988 8.7001 9.7001 7.75988 9.7001 6.60007C9.7001 5.44026 8.75988 4.50004 7.60007 4.50004C6.44026 4.50004 5.50004 5.44026 5.50004 6.60007C5.50004 7.75988 6.44026 8.7001 7.60007 8.7001Z'
													stroke='black'
													stroke-width='1.5'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>
											</svg>
											{featuredEvent.location}
										</span>
									</div>
								</div>

								<p className={"event-description"}>{truncateDescription(featuredEvent.description, 225)}</p>

								<div>
									<div className={"divider"} />
									<div className='button button-simple small-button'>
										<a
											className='link'
											href={featuredEvent.url}
											target={"_blank"}
											rel={"noreferrer"}
											aria-label={featuredEvent.title}
										>
											Read More
										</a>
									</div>
								</div>
							</div>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default FeaturedEvent;
