import Meta from "@/components/Meta/Meta";
import ContactHero from "@/components/NewPages/Contact/ContactHero";

const seo = {
	title: "Contact - Celestia",
	description: "Get in touch with the Celestia team. Contact us for partnerships, press inquiries, and more.",
};

export const metadata = Meta(seo);

export default function ContactPage() {
	return (
		<>
			<ContactHero />
		</>
	);
}
