"use client";
import React from "react";
import data from "../../data/eden/data.json";
import Link from "next/link";
import TrackAccordion from "./TrackAccordion";

const Tracks = () => {
	const [openIndex, setOpenIndex] = React.useState(null);

	const handleToggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section id='tracks' className={"w-full pt-10 md:pt-20 flex justify-center"}>
			<div className={"max-w-[1280px] w-full"}>
				<div className={"px-4 w-full flex flex-wrap md:flex-nowrap items-end justify-between"}>
					<div className={"w-full md:w-auto"}>
						<h2 className={"font-spartan text-[52px] md:text-[80px] text-[#17141A] tracking-[-0.025em] font-[600] leading-[1em]"}>
							{data.tracks.title}
						</h2>
					</div>
					<div className={"w-full md:w-auto pb-4"}>
						<Link href={data.tracks.cta.url} target={"_blank"}>
							<button
								className={
									"bg-[#7E6EBE] hover:bg-[#7E6EBE]/90 transition-all ease-in-out duration-300 text-white px-6 py-4 font-aeonik font-[500] text-base uppercase leading-[0.75em]"
								}
							>
								{data.tracks.cta.label}
							</button>
						</Link>
					</div>
				</div>

				<div className={"w-full pt-8"}>
					{data.tracks.elements.map((track, index) => (
						<TrackAccordion key={index} track={track} index={index} isOpen={openIndex === index} onToggle={() => handleToggle(index)} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Tracks;
