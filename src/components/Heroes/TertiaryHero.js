"use client";
import Container from "@/components/Container/Container";
import { Body, Display } from "@/macros/Copy";

const TertiaryHero = ({ title, subtitle, className = "" }) => {
	return (
		<section className={`bg-white relative flex flex-col py-8 md:py-12 lg:pt-[148px] lg:pb-[100px] ${className}`}>
			<Container size={`lg`} className='relative z-10 h-full'>
				<div className={`pt-10 lg:pt-16 flex flex-col h-full`}>
					<div className='flex justify-between h-full'>
						<Display size={"md"} className={`${subtitle ? "mb-3" : "mb-10"}`}>
							{title}
						</Display>
						<Body size='lg' className={"mb-10 max-w-[433px] text-balance"}>
							{subtitle}
						</Body>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default TertiaryHero;
