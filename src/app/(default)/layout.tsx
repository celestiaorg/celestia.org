import React from "react";
import HeaderNew from "@/components/HeaderNew/HeaderNew";
import FooterNew from "@/components/FooterNew/FooterNew";
import { FooterProvider } from "@/context/FooterContext";
import { HeaderProvider } from "@/context/HeaderContext";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
	return (
		<HeaderProvider>
			<FooterProvider>
				<HeaderNew />
				<main id={"main-content"}>{children}</main>
				<FooterNew />
			</FooterProvider>
		</HeaderProvider>
	);
}
