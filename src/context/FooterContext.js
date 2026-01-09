"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FooterContext = createContext({
	showBackgroundImage: false,
	setShowBackgroundImage: () => {},
});

export const FooterProvider = ({ children }) => {
	const [showBackgroundImage, setShowBackgroundImage] = useState(false);

	return (
		<FooterContext.Provider value={{ showBackgroundImage, setShowBackgroundImage }}>
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
export const FooterConfig = ({ showBackgroundImage = false }) => {
	const { setShowBackgroundImage } = useFooter();

	useEffect(() => {
		setShowBackgroundImage(showBackgroundImage);
		return () => setShowBackgroundImage(false); // Reset on unmount
	}, [showBackgroundImage, setShowBackgroundImage]);

	return null;
};
