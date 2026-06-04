const CTASection = () => {
	return (
		<section data-header-theme='light' className='bg-[#FDFCFF] border-t border-black/[0.08] py-20 md:py-[104px]'>
			<div className='mx-auto max-w-[1520px] px-6 min-[600px]:px-[60px] min-[1200px]:px-[120px]'>
				<div className='flex flex-col items-center text-center gap-5'>
					<h3 className='font-slussenExtended font-medium text-[28px] md:text-[36px] leading-[1.2] tracking-[-1.5px] text-[#0E1014]'>
						Start building on Celestia
					</h3>

					<p className='font-slussen text-[16px] leading-[24px] text-[#4A5058] max-w-[560px]'>
						Launch your own high-throughput blockchain, or reach out to learn more about what Celestia can do for your product.
					</p>

					<div className='flex gap-4 mt-4'>
						<a
							href='/get-started/'
							className='inline-flex items-center justify-center rounded-full border border-[#0E1014] bg-[#0E1014] px-6 py-2.5 font-slussen text-[14px] font-medium text-[#FDFCFF] no-underline transition-opacity duration-200 hover:opacity-85 active:scale-[0.98]'
						>
							Get Started
						</a>
						<a
							href='/contact/'
							className='inline-flex items-center justify-center rounded-full border border-black/[0.2] bg-transparent px-6 py-2.5 font-slussen text-[14px] font-medium text-[#0E1014] no-underline transition-colors duration-200 hover:border-black/50'
						>
							Contact Us
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
