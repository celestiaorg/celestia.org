import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ScrollPositionProvider from "@/utils/scrollLock";
import "./styles/fonts.css";
import "./styles/globals.scss";
import "./styles/text-link.scss";
import { Suspense } from "react";
import meta from "@/components/Meta/Meta";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import Plausible from "@/components/Analytics/Plausible";
import { BannerProvider } from "@/context/BannerContext";

export const metadata = meta();

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<Plausible />
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
