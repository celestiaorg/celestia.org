import LoadingScreen from "@/components/Loading/LoadingScreen";
import meta from "@/components/Meta/Meta";
import JsonLd from "@/components/Meta/JsonLd";
import { BannerProvider } from "@/context/BannerContext";
import ScrollPositionProvider from "@/utils/scrollLock";
import PlausibleProvider from "next-plausible";
import Script from "next/script";
import React, { Suspense } from "react";
import { untitledSans, youth, nuberNext, nuberNextWide, robotoMono } from "./fonts";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={`${untitledSans.variable} ${youth.variable} ${nuberNext.variable} ${nuberNextWide.variable} ${robotoMono.variable}`}>
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
					<JsonLd />
			</head>
			<body className={`text-black font-untitledSans`}>
				{process.env.NODE_ENV === "development" && (
					<Script src="//unpkg.com/react-grab/dist/index.global.js" strategy="beforeInteractive" />
				)}
				<BannerProvider>
					<ScrollPositionProvider>
						<Suspense fallback={<LoadingScreen />}>{children}</Suspense>
					</ScrollPositionProvider>
				</BannerProvider>
			</body>
		</html>
	);
}
