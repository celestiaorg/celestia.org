import { Display } from "@/macros/Copy";
import Image from "next/image";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import { ecosystemForegroundItems, ecosystemBackgroundItems } from "@/data/ecosystem/ecosystem";
import "./EcosystemExplorer.scss";

const EcosytemExplorer = () => {
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
					{ecosystemBackgroundItems.map((item, index) => (
						<div key={index} className={`absolute top-1/2 left-1/2 item-${index + 1}`}>
							<div className='relative block transform -translate-x-1/2 -translate-y-1/2'>
								<div className='relative transform vertical-anim'>
									<Image
										src={item.image}
										alt={item.title}
										width={200}
										height={200}
										className='w-full h-auto rounded-full max-w-12'
									/>
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
					{ecosystemForegroundItems.map((item, index) => (
						<div key={index} className={`absolute top-1/2 left-1/2 item-${index + 1}`}>
							<div className='relative transform vertical-anim'>
								<Image src={item.image} alt={item.title} width={200} height={200} className='w-full h-auto rounded-full max-w-16' />
								<span className='sr-only'>{item.title}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<SecondaryButton href={"/ecosystem"} className={"mx-auto table"} size='lg' dark>
				View All <span className={"sr-only"}>Ecosystem Projects</span>
			</SecondaryButton>
		</section>
	);
};

export default EcosytemExplorer;
