"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FooterContext = createContext({
	showBackgroundImage: false,
	setShowBackgroundImage: () => {},
	variant: "light",
	setVariant: () => {},
	footerTheme: null,
	setFooterTheme: () => {},
});

export const FooterProvider = ({ children }) => {
	const [showBackgroundImage, setShowBackgroundImage] = useState(false);
	const [variant, setVariant] = useState("light");
	const [footerTheme, setFooterTheme] = useState(null);

	return (
		<FooterContext.Provider value={{ showBackgroundImage, setShowBackgroundImage, variant, setVariant, footerTheme, setFooterTheme }}>
			{children}
		</FooterContext.Provider>
	);
};

export const useFooter = () => useContext(FooterContext);

/**
 * FooterConfig - Component to configure footer settings from a page
 * Place this component in your page to enable/disable the footer background image
 *
 * @param {Object} props
 * @param {boolean} props.showBackgroundImage - Whether to show the footer background image
 */
export const FooterConfig = ({ showBackgroundImage = false, variant = "light" }) => {
	const { setShowBackgroundImage, setVariant } = useFooter();

	useEffect(() => {
		setShowBackgroundImage(showBackgroundImage);
		setVariant(variant);
		return () => {
			setShowBackgroundImage(false);
			setVariant("light");
		};
	}, [showBackgroundImage, variant, setShowBackgroundImage, setVariant]);

	return null;
};
