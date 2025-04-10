"use client";
import { ecosystemItems } from "@/data/ecosystem/ecosystem";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import { Display } from "@/macros/Copy";
import { stringToId } from "@/utils/stringToId";
import { usePlausible } from "next-plausible";
import Image from "next/image";
import Link from "next/link";
import "./EcosystemExplorer.scss";
import { stringToId } from "@/utils/stringToId";
import { usePlausible } from "next-plausible";
import { useEffect, useState } from "react";

const EcosytemExplorer = ({ trackEvent: trackEventName }) => {
	const trackEvent = usePlausible();
	// Use state to store the randomly sorted ecosystem items
	const [randomItems, setRandomItems] = useState([]);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		// Only run the random sorting on the client side after hydration
		setIsClient(true);
		// randomly select 22 ecosystem items and mix them up
		const shuffledItems = [...ecosystemItems].sort(() => Math.random() - 0.5);
		setRandomItems(shuffledItems);
	}, []);

	// Use the first 22 items for server-side rendering, and randomItems after client-side hydration
	const itemsToRender = isClient ? randomItems : ecosystemItems.slice(0, 22);

	// split the ecosystem items into 12 foregroundItems and 10 backgroundItems
	const foregroundItems = itemsToRender.slice(0, 12);
	const backgroundItems = itemsToRender.slice(12, 22);

	const handleViewAllClick = () => {
		if (!trackEventName) return;

		trackEvent(trackEventName, {
			props: {
				button: "View All",
				url: "/ecosystem",
				location: "ecosystem_explorer",
				path: window.location.pathname,
			},
		});
	};

	return (
		<section className='px-4 py-6 ecosystem-explorer lg:pb-10 lg:pt-24 md:px-10'>
			<Display tag={"h2"} size={"sm"} className={"text-center uppercase relative z-20 text-5xl"}>
				Explore the
				<br />
				Ecosystem
			</Display>
			<div className='block w-[82%] max-w-[520px] mx-auto relative z-10 pb-32 lg:pb-8 -mt-12 lg:-mt-14'>
				{/* background items */}
				<div className='background-icons absolute top-0 left-0 w-full h-full z-[2]'>
					{backgroundItems.map((item, index) => (
						<div key={index} className={`absolute top-1/2 left-1/2 item-${index + 1}`}>
							<div className='relative block transform -translate-x-1/2 -translate-y-1/2'>
								<div className='relative transform vertical-anim'>
									<Image src={item.image} alt={item.title} width={200} height={200} className='w-full h-auto max-w-12' />
									<span className='sr-only'>{item.title}</span>
								</div>
							</div>
						</div>
					))}
				</div>
				<Image
					src={"/images/app/homepage/ecosystem-celestiaLogo.png"}
					alt={"Celestia Logo"}
					width={520}
					height={520}
					className='w-full h-auto relative z-[3]'
				/>
				{/* foreground items */}
				<div className='foreground-icons absolute top-0 left-0 w-full h-full z-[4]'>
					{foregroundItems.map((item, index) => (
						<div key={index} className={`absolute top-1/2 left-1/2 item-${index + 1}`}>
							<Link
								href={`/ecosystem/#${stringToId(item.title)}`}
								className='relative block transform -translate-x-1/2 -translate-y-1/2'
							>
								<div className='relative transform vertical-anim'>
									<Image src={item.image} alt={item.title} width={200} height={200} className='w-full h-auto max-w-16' />
									<span className='sr-only'>{item.title}</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
			<SecondaryButton href={"/ecosystem"} className={"mx-auto table"} size='lg' dark onClick={handleViewAllClick}>
				View All <span className={"sr-only"}>Ecosystem Projects</span>
			</SecondaryButton>
		</section>
	);
};

export default EcosytemExplorer;
