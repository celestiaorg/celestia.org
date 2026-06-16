import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import ContactHero from "@/components/NewPages/Contact/ContactHero";

const seo = {
	title: "Contact",
	description: "Get in touch with the Celestia team. Contact us for partnerships, press inquiries, and more.",
	canonical: "https://celestia.org/contact/",
};

export const metadata = Meta(seo);

export default function ContactPage() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant='light' />
			<ContactHero />
		</>
	);
}
