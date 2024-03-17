import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Banner from "./modules/banner";

export default function Layout({ children, footerBoxes, footerBoxes2 }) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (typeof window !== `undefined` && typeof window.plausible !== `undefined` && loaded) {
			const elements = document.querySelectorAll("[class*=plausible-event-name]");

			elements.forEach(function (element) {
				element.addEventListener(
					"click",
					function (e) {
						element.classList.forEach(function (className) {
							if (className.includes("plausible")) {
								//console.log('ADD EVENT: ' + className.substring(className.indexOf('=') + 1))
								window.plausible(className.substring(className.indexOf("=") + 1));
							}
						});
					},
					false
				);
			});
		}
	});

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<>
			<Banner/>
			<Header />
			{children}
			<Footer FooterBoxes={footerBoxes} FooterBoxes2={footerBoxes2} />
		</>
	);
}
