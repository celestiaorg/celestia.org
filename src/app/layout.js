import Footer from "@/components/Footer/Footer";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import meta from "@/components/Meta/Meta";
import Nav from "@/components/Nav/Nav";
import { BannerProvider } from "@/context/BannerContext";
import ScrollPositionProvider from "@/utils/scrollLock";
import PlausibleProvider from "next-plausible";
import { Suspense } from "react";
import "./styles/fonts.css";
import "./styles/globals.scss";
import "./styles/text-link.scss";

export const metadata = meta();

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
