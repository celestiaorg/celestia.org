"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FooterVariant = "light" | "dark";
type FooterTheme = string | null;

interface FooterContextValue {
	showBackgroundImage: boolean;
	setShowBackgroundImage: React.Dispatch<React.SetStateAction<boolean>>;
	variant: FooterVariant;
	setVariant: React.Dispatch<React.SetStateAction<FooterVariant>>;
	footerTheme: FooterTheme;
	setFooterTheme: React.Dispatch<React.SetStateAction<FooterTheme>>;
}

const FooterContext = createContext<FooterContextValue>({
	showBackgroundImage: false,
	setShowBackgroundImage: () => {},
	variant: "light",
	setVariant: () => {},
	footerTheme: null,
	setFooterTheme: () => {},
});

export const FooterProvider = ({ children }: React.PropsWithChildren) => {
	const [showBackgroundImage, setShowBackgroundImage] = useState(false);
	const [variant, setVariant] = useState<FooterVariant>("light");
	const [footerTheme, setFooterTheme] = useState<FooterTheme>(null);

	return (
		<FooterContext.Provider value={{ showBackgroundImage, setShowBackgroundImage, variant, setVariant, footerTheme, setFooterTheme }}>
			{children}
		</FooterContext.Provider>
	);
};

export const useFooter = (): FooterContextValue => useContext(FooterContext);

interface FooterConfigProps {
	showBackgroundImage?: boolean;
	variant?: FooterVariant;
}

/**
 * FooterConfig - Component to configure footer settings from a page
 * Place this component in your page to enable/disable the footer background image
 *
 * @param {Object} props
 * @param {boolean} props.showBackgroundImage - Whether to show the footer background image
 */
export const FooterConfig = ({ showBackgroundImage = false, variant = "light" }: FooterConfigProps) => {
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
