"use client";
import React from "react";
import data from "../../data/eden/data.json";
import Image from "next/image";
import { motion } from "framer-motion";

const HackathonSection = () => {
	return (
		<section className={"pt-10 md:pt-20 flex justify-center"}>
			<div className={"max-w-[1280px] w-full"}>
				<div className={"w-full"}>
					<div className={"flex justify-center"}>
						<div className={"w-10/12 md:w-8/12 lg:w-5/12 flex gap-y-4 md:gap-y-6 flex-wrap"}>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
								viewport={{ once: true }}
								className={
									"font-spartan font-[500] text-[40px] md:text-[52px] xl:text-[80px] text-center tracking-[-0.05em] leading-[0.9em]"
								}
							>
								{data.hackathon.title}
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
								viewport={{ once: true }}
								className={"font-aeonik text-[18px] md:text-[24px] leading-[1.33em] text-[#313131] text-center"}
							>
								{data.hackathon.text}
							</motion.p>
						</div>
					</div>
				</div>
				<div className={"w-full pt-10 md:pt-20"}>
					<div className={"w-full aspect-square md:aspect-video lg:aspect-[1280/512] relative"}>
						<Image
							src={data.hackathon.video.thumbnail}
							alt={data.hackathon.video.title}
							width={1280}
							height={512}
							className={"object-cover w-full h-full"}
						/>

						<motion.button
							initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
							whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
							transition={{ duration: 0.3, type: "spring", bounce: 0.1, delay: 0.4 }}
							viewport={{ once: true }}
							className={
								"absolute left-1/2 top-1/2 bg-white flex py-5 px-10 gap-x-3 items-center uppercase font-aeonik text-base font-[500] leading-[1.23em]"
							}
						>
							<svg width='12' height='16' viewBox='0 0 12 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.3944 8.0001L2 3.7371V12.263L8.3944 8.0001ZM11.376 8.4161L0.77735 15.4818C0.54759 15.635 0.23715 15.5729 0.0839701 15.3432C0.0292201 15.261 0 15.1645 0 15.0658V0.934326C0 0.658176 0.22386 0.434326 0.5 0.434326C0.59871 0.434326 0.69522 0.463546 0.77735 0.518296L11.376 7.584C11.6057 7.7372 11.6678 8.0477 11.5146 8.2774C11.478 8.3323 11.4309 8.3795 11.376 8.4161Z'
									fill='black'
								/>
							</svg>
							<span>play</span>
						</motion.button>
					</div>
				</div>
				<div className={"w-full pt-10 lg:pt-20"}>
					<div className={"grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-4"}>
						{data.hackathon.elements.map((item, index) => (
							<div
								key={index}
								className={`gap-y-[60px] flex flex-wrap text-white p-8 lg:p-12 bg-cover bg-no-repeat`}
								style={{ backgroundImage: `url(${item.background})` }}
							>
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
									viewport={{ once: true }}
									className={"self-start w-full text-[32px] lg:text-[40px] font-[600] font-spartan leading-[0.9]"}
								>
									{item.title}
								</motion.div>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + index * 0.2 }}
									viewport={{ once: true }}
									className={"self-end w-full font-aeonik text-sm lg:text-base font-[500] leading-[1.5em]"}
								>
									{item.text}
								</motion.div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HackathonSection;
