import Container from "@/components/Container/Container";
import EventCard from "@/components/EventList/EventCard";
import meta from "@/components/Meta/Meta";
import { eventData } from "@/data/events/event";
import seo from "@/data/events/seo";
import { Body, Display, Heading } from "@/macros/Copy";
import { Col, Row } from "@/macros/Grids";
import Icon from "@/macros/Icons/Icon";
import Link from "@/macros/Link/Link";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";

export const metadata = meta(seo);

const EventsPage = () => {
	const upcomingEvents = eventData
		.filter((event) => {
			// Filter out invalid entries (like the empty comma in the data)
			if (!event?.id) return false;

			// Handle date-based events
			try {
				if (!event.startDate.includes("-")) return true;
				const eventStartDate = new Date(event.startDate);
				const eventEndDate = event.endDate ? new Date(event.endDate) : eventStartDate;

				// Normalize current date to remove time component
				const currentDate = new Date();
				currentDate.setHours(0, 0, 0, 0);
				eventStartDate.setHours(0, 0, 0, 0);
				eventEndDate.setHours(0, 0, 0, 0);

				// Event is upcoming/ongoing if:
				// - Current date is within the event date range (inclusive) OR
				// - Start date is in the future
				return (currentDate >= eventStartDate && currentDate <= eventEndDate) || eventStartDate >= currentDate;
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

	// Separate featured and non-featured events
	const featuredEvents = upcomingEvents.filter((event) => event.featured);
	const regularEvents = upcomingEvents.filter((event) => !event.featured);

	return (
		<section className={`bg-white-weak relative flex flex-col-reverse md:block content-center`}>
			<Container size={`lg`} className='flex flex-col pb-16 pt-36 lg:pt-56 lg:pb-28 lg:w-3/4 xl:w-2/3'>
				<Row className='mb-[4.375rem] flex flex-col lg:flex-row gap-3 lg:items-center'>
					<Col width={50}>
						<Display size='md' tag='h1'>
							Events
						</Display>
					</Col>
					<Col width={50}>
						<Body
							size='md'
							className={
								"max-w-[31.375rem] lg:text-[1.125rem] lg:leading-[1.625rem] lg:tracking-[.0141rem] lg:font-normal lg:text-[#17141A]"
							}
						>
							Hangout with the Celestia community IRL or online.
						</Body>
					</Col>
				</Row>

				{/* Featured Events Section */}
				{featuredEvents.length > 0 && (
					<Row className='mb-12'>
						<Col width={100}>
							<div className='flex flex-col gap-6'>
								{featuredEvents.map((event) => (
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
										className='featured-event'
									/>
								))}
							</div>
						</Col>
					</Row>
				)}

				{/* Regular Events Grid */}
				<Row>
					<Col width={100}>
						<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2'>
							{regularEvents.map((event) => (
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
				<Row className='flex items-center justify-between max-sm:justify-center'>
					<Heading tag={"h2"} className={`max-sm:hidden`} size={"md"}>
						Past Events
					</Heading>
					<Link href={"/past-events"} className='group'>
						<div className='flex items-center gap-6'>
							<span>View all past events</span>
							<Icon
								Icon={<ArrowLongSVG />}
								hover
								HoverIcon={<ArrowLongSVG />}
								className={`flex-grow-0`}
								direction={`top-right`}
								border
								size={"lg"}
							/>
						</div>
					</Link>
				</Row>
			</Container>
		</section>
	);
};

export default EventsPage;
