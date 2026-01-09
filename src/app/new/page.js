import Meta from "@/components/Meta/Meta";

const seo = {
	title: "Celestia - The First Modular Blockchain Network",
	description:
		"Celestia is the first modular blockchain network that enables anyone to easily deploy their own blockchain with minimal overhead.",
};

export const metadata = Meta(seo);

export default function HomepageNew() {
	return (
		<>
			{/* Hero section - dark background */}
			<section
				data-header-theme="dark"
				className="min-h-screen bg-black text-white flex items-center justify-center"
			>
				<div className="container mx-auto px-4 text-center">
					<h1 className="font-youth text-5xl md:text-7xl lg:text-8xl mb-6">
						Homepage New
					</h1>
					<p className="font-untitledSans text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
						This is the new homepage scaffold. Content will be added based on the Figma designs.
					</p>
				</div>
			</section>

			{/* Light section - to test header color switching */}
			<section
				data-header-theme="light"
				className="min-h-screen bg-white text-black flex items-center justify-center"
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="font-youth text-4xl md:text-5xl lg:text-6xl mb-6">
						Light Section
					</h2>
					<p className="font-untitledSans text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
						Scroll through this section to see the header colors change.
					</p>
				</div>
			</section>

			{/* Another dark section */}
			<section
				data-header-theme="dark"
				className="min-h-[50vh] bg-[#17141A] text-white flex items-center justify-center"
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="font-youth text-4xl md:text-5xl lg:text-6xl mb-6">
						Dark Section
					</h2>
					<p className="font-untitledSans text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
						Another dark section before the footer.
					</p>
				</div>
			</section>
		</>
	);
}
