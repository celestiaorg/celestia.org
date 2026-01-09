import HeaderNew from "@/components/HeaderNew/HeaderNew";
import FooterNew from "@/components/FooterNew/FooterNew";

export default function NewPagesLayout({ children }) {
	return (
		<>
			<HeaderNew />
			<main id="main-content">{children}</main>
			<FooterNew />
		</>
	);
}
