"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";

type HeaderTheme = "light" | "dark";

interface HeaderContextValue {
	theme: HeaderTheme;
}

const HeaderContext = createContext<HeaderContextValue>({ theme: "dark" });

/**
 * Route prefixes that render the fixed nav in its light variant. Single source
 * of truth — matching here means the theme is known at render time (SSR + first
 * client paint), so there is no dark→light flash on load/refresh.
 */
const LIGHT_ROUTE_PREFIXES = ["/about", "/contact", "/case-studies", "/build-with-us"];

const themeForPath = (pathname: string | null): HeaderTheme => {
	if (!pathname) return "dark";
	const isLight = LIGHT_ROUTE_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
	);
	return isLight ? "light" : "dark";
};

export const HeaderProvider = ({ children }: React.PropsWithChildren) => {
	const pathname = usePathname();
	const theme = useMemo(() => themeForPath(pathname), [pathname]);

	return (
		<HeaderContext.Provider value={{ theme }}>
			{children}
		</HeaderContext.Provider>
	);
};

export const useHeader = (): HeaderContextValue => useContext(HeaderContext);
