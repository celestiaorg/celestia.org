import HeaderNew from "@/components/HeaderNew/HeaderNew";
import FooterNew from "@/components/FooterNew/FooterNew";
import { FooterProvider } from "@/context/FooterContext";

export default function NewPagesLayout({ children }) {
	return (
		<FooterProvider>
			<HeaderNew />
			<main id="main-content">{children}</main>
			<FooterNew />
		</FooterProvider>
	);
}
