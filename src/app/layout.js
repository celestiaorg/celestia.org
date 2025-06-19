import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ScrollPositionProvider from "@/utils/scrollLock";
import "./styles/fonts.css";
import "./styles/globals.scss";
import "./styles/text-link.scss";
import { Suspense } from "react";
import meta from "@/components/Meta/Meta";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { BannerProvider } from "@/context/BannerContext";
import PlausibleProvider from "next-plausible";

export const metadata = meta();

// Critical viewport meta tag for mobile SEO
export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: "#F6F6F6",
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<PlausibleProvider
					domain='celestia.org'
					customDomain='https://plausible.celestia.org'
					selfHosted={true}
					enabled={true}
					scriptProps={{
						async: true,
						defer: true,
					}}
				/>
			</head>
			<body className={`text-black`}>
				<BannerProvider>
					<ScrollPositionProvider>
						<Nav />
						<main id={"main-content"}>
							<Suspense fallback={<LoadingScreen />}>{children}</Suspense>
						</main>
						<Footer />
					</ScrollPositionProvider>
				</BannerProvider>
			</body>
		</html>
	);
}
