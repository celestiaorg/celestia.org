import Meta from "@/components/Meta/Meta";
import { FooterConfig } from "@/context/FooterContext";
import ContactHero from "@/components/NewPages/Contact/ContactHero";
import ContactTeam from "@/components/NewPages/Contact/ContactTeam";

const seo = {
	title: "Contact - Celestia",
	description: "Get in touch with the Celestia team. Contact us for partnerships, press inquiries, and more.",
};

export const metadata = Meta(seo);

export default function ContactPage() {
	return (
		<>
			<FooterConfig showBackgroundImage={false} variant='dark' />
			<ContactHero />
			<ContactTeam />
		</>
	);
}
