import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import { HeaderConfig } from "@/context/HeaderContext";
import ContactHero from "@/components/NewPages/Contact/ContactHero";

const seo = {
	title: "Contact - Celestia",
	description: "Get in touch with the Celestia team. Contact us for partnerships, press inquiries, and more.",
};

export const metadata = Meta(seo);

export default function ContactPage() {
	return (
		<>
			<HeaderConfig theme='light' />
			<FooterConfig showBackgroundImage={false} variant='light' />
			<ContactHero />
		</>
	);
}
