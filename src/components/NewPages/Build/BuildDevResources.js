import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

const resourceCards = [
	{
		title: "Documentation",
		description: "Documentation for the Celestia network.",
		href: "https://docs.celestia.org/",
	},
	{
		title: "Pay for blobspace",
		description: "Overview of paying for blob transactions and Celestia's fee market.",
		href: "https://docs.celestia.org/how-to-guides/paying-for-blobspace",
	},
	{
		title: "Blog tutorial",
		description: "Learn how to publish and retrieve transaction data from Celestia.",
		href: "https://docs.celestia.org/tutorials/blob-tutorial",
	},
	{
		title: "Blobstream",
		description: "Use Celestia as the DA layer for your Ethereum L2.",
		href: "https://docs.celestia.org/how-to-guides/blobstream",
	},
	{
		title: "Node API",
		description: "Use the celestia-node API to publish and retrieve transactions from Celestia.",
		href: "https://docs.celestia.org/developers/node-api",
	},
];

const ResourceCard = ({ title, description, href }) => {
	return (
		<div className='bg-[#29242e] flex flex-col h-[240px] justify-between p-6 md:p-8 w-full'>
			<div className='flex flex-col gap-1'>
				<h3 className='font-untitledSans font-medium text-xl md:text-[28px] text-white tracking-[-0.56px]'>
					{title}
				</h3>
				<p className='font-untitledSans text-sm md:text-[14px] text-[#d8cce5] leading-[22px]'>
					{description}
				</p>
			</div>
			<div>
				<PrimaryButton href={href} variant='outline' size='xl' className='w-fit'>
					Read more
				</PrimaryButton>
			</div>
		</div>
	);
};

const BuildDevResources = () => {
	return (
		<section
			data-header-theme='dark'
			className='bg-[#17141A] pt-14 pb-20 md:pt-14 md:pb-[104px]'
		>
			<Container size='lg'>
				{/* Section heading */}
				<h2 className='font-untitledSans font-medium text-[32px] md:text-[48px] lg:text-[56px] leading-[1.15] tracking-[-2px] md:tracking-[-3px] text-white text-center mb-10 md:mb-14'>
					Developer resources
				</h2>

				{/* Cards grid */}
				<div className='flex flex-col gap-1'>
					{/* First row - 3 cards on desktop, stacked on mobile */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
						{resourceCards.slice(0, 3).map((card, index) => (
							<ResourceCard key={index} {...card} />
						))}
					</div>

					{/* Second row - 2 cards that stretch on desktop */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
						{resourceCards.slice(3, 5).map((card, index) => (
							<ResourceCard key={index} {...card} />
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default BuildDevResources;
