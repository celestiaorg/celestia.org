import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";

export default function DefaultLayout({ children }) {
	return (
		<>
			<Nav />
			<main id={"main-content"}>{children}</main>
			<Footer />
		</>
	);
}
