// Minimal type declarations for untyped third-party packages.
// These packages ship without bundled types and have no @types/* equivalents.

declare module "react-stickynode" {
	import { Component, ReactNode } from "react";
	interface StickyProps {
		enabled?: boolean;
		top?: number | string;
		bottomBoundary?: number | string;
		className?: string;
		children?: ReactNode;
	}
	export default class Sticky extends Component<StickyProps> {}
}

declare module "react-slick" {
	import { Component, ReactNode, Ref } from "react";
	interface ResponsiveSettings {
		breakpoint: number;
		settings: Partial<Settings>;
	}
	interface Settings {
		children?: ReactNode;
		dots?: boolean;
		infinite?: boolean;
		speed?: number;
		slidesToShow?: number;
		slidesToScroll?: number;
		arrows?: boolean;
		centerMode?: boolean;
		initialSlide?: number;
		swipeToSlide?: boolean;
		swipe?: boolean;
		variableWidth?: boolean;
		beforeChange?: (current: number, next: number) => void;
		afterChange?: (current: number) => void;
		onInit?: () => void;
		onReInit?: () => void;
		responsive?: ResponsiveSettings[];
	}
	export default class Slider extends Component<Settings> {
		slickNext(): void;
		slickPrev(): void;
	}
}
