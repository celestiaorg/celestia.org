import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ScrollPositionProvider from "@/utils/scrollLock";
import { untitledSans, youth } from "./fonts";
import "./styles/globals.scss";
import "./styles/text-link.scss";
import { Suspense } from "react";
import meta from "@/components/Meta/Meta";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { BannerProvider } from "@/context/BannerContext";
import PlausibleProvider from "next-plausible";

export const metadata = meta();

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={`${untitledSans.variable} ${youth.variable}`}>
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
			<body className={`text-black font-untitledSans`}>
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
