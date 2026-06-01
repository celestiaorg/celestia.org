"use client";

import { createContext, useContext, useState, useEffect } from "react";

const HeaderContext = createContext({
	theme: "dark",
	setTheme: () => {},
});

export const HeaderProvider = ({ children }) => {
	const [theme, setTheme] = useState("dark");

	return (
		<HeaderContext.Provider value={{ theme, setTheme }}>
			{children}
		</HeaderContext.Provider>
	);
};

export const useHeader = () => useContext(HeaderContext);

/**
 * HeaderConfig - Set the header theme from a page (mirrors FooterConfig).
 *
 * Place near the top of a page to switch the fixed nav bar to its light
 * variant (for light-themed pages like /about). Resets to "dark" on unmount.
 *
 * @param {Object} props
 * @param {'dark' | 'light'} props.theme - Header colour theme
 */
export const HeaderConfig = ({ theme = "dark" }) => {
	const { setTheme } = useHeader();

	useEffect(() => {
		setTheme(theme);
		return () => setTheme("dark");
	}, [theme, setTheme]);

	return null;
};
