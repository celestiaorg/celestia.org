import Footer from "@/components/Footer/Footer";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import meta from "@/components/Meta/Meta";
import Nav from "@/components/Nav/Nav";
import { BannerProvider } from "@/context/BannerContext";
import ScrollPositionProvider from "@/utils/scrollLock";
import PlausibleProvider from "next-plausible";
import { Suspense } from "react";
import { untitledSans, youth, druk } from "./fonts";
import "./styles/globals.scss";
import "./styles/text-link.scss";

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
		<html lang='en' className={`${untitledSans.variable} ${youth.variable} ${druk.variable}`}>
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
						<Suspense fallback={<LoadingScreen />}>{children}</Suspense>
					</ScrollPositionProvider>
				</BannerProvider>
			</body>
		</html>
	);
}
