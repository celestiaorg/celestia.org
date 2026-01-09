import Container from "@/components/Container/Container";

const PrivateAccountSection = () => {
	return (
		<section data-header-theme="light" className="bg-white py-16 md:py-20 lg:py-[104px]">
			<Container size="lg">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
					{/* Text content */}
					<div className="flex flex-col gap-6 text-black w-full lg:max-w-[574px] order-2 lg:order-1">
						<h2 className="font-untitledSans font-medium text-3xl md:text-4xl lg:text-5xl xl:text-[56px] leading-[1.14] xl:leading-[64px] tracking-[-0.05em]">
							Private account balances when trading with Hibachi
						</h2>
						<p className="font-untitledSans text-base md:text-lg lg:text-xl leading-[1.6] lg:leading-[32px]">
							Private DA allows Hibachi to maintain a private exchange for traders without leaking sensitive information, such as account balances, in the event they need to exit their funds.
						</p>
					</div>

					{/* Image */}
					<div className="w-full lg:w-[590px] lg:shrink-0 order-1 lg:order-2">
						<div className="relative w-full aspect-[590/512] rounded-2xl overflow-hidden bg-black">
							<img
								src="/images/placeholder.jpg"
								alt="Hibachi trading interface"
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PrivateAccountSection;
