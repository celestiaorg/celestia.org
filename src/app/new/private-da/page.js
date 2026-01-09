import Meta from "@/components/Meta/Meta";

const seo = {
	title: "Private DA - Celestia",
	description: "Private Data Availability solutions powered by Celestia.",
};

export const metadata = Meta(seo);

export default function PrivateDAPage() {
	return (
		<>
			{/* Hero section - dark background */}
			<section
				data-header-theme="dark"
				className="min-h-screen bg-black text-white flex items-center justify-center"
			>
				<div className="container mx-auto px-4 text-center">
					<h1 className="font-youth text-5xl md:text-7xl lg:text-8xl mb-6">
						Private DA
					</h1>
					<p className="font-untitledSans text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
						Private Data Availability page scaffold. Content will be added based on the Figma designs.
					</p>
				</div>
			</section>

			{/* Content section */}
			<section
				data-header-theme="light"
				className="min-h-[50vh] bg-white text-black flex items-center justify-center"
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="font-youth text-4xl md:text-5xl lg:text-6xl mb-6">
						Content Section
					</h2>
					<p className="font-untitledSans text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
						Page content will go here.
					</p>
				</div>
			</section>
		</>
	);
}
