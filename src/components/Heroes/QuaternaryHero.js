"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import { Body, Display } from "@/macros/Copy";

const QuaternaryHero = ({ title, subtitle, className = "" }) => {
	const { isBannerVisible, bannerHeight } = useBanner();

	return (
		<section
			style={
				isBannerVisible
					? {
							"--md-min-h": `calc(300px + ${bannerHeight}px)`,
							"--lg-min-h": `calc(350px + ${bannerHeight}px)`,
					  }
					: undefined
			}
			className={`bg-white relative flex flex-col py-8 md:py-12 
				${isBannerVisible ? "md:[min-height:var(--md-min-h)] lg:[min-height:var(--lg-min-h)]" : "md:min-h-[300px] lg:min-h-[350px]"} ${className}`}
		>
			<Container size={`lg`} className='relative z-10 h-full'>
				<div className={`${isBannerVisible ? "pt-64 lg:pt-32" : "pt-20 lg:pt-20"} flex flex-col h-full`}>
					<div className='flex flex-wrap§ justify-between h-full'>
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

export default QuaternaryHero;
