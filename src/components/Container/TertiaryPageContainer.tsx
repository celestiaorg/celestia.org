import React, { type ReactNode, type ReactElement } from "react";
import Container from "@/components/Container/Container";

interface ChildProps {
	children?: ReactNode;
}

const Body = ({ children }: ChildProps) => {
	return <div className='w-full lg:w-3/4 py-10 lg:py-20'>{children}</div>;
};

const Sidebar = ({ children }: ChildProps) => {
	return <div className='w-full lg:w-1/4'>{children}</div>;
};

// Namespace the component's subcomponent types for compound component pattern
type TertiaryPageContainerComponent = React.FC<ChildProps> & {
	Body: typeof Body;
	Sidebar: typeof Sidebar;
};

const TertiaryPageContainer: TertiaryPageContainerComponent = ({ children }: ChildProps) => {
	let body: ReactElement | null = null;
	let sidebar: ReactElement | null = null;

	// Loop through children to find ListSection.Header and ListSection.Body
	React.Children.forEach(children, (child) => {
		switch ((child as ReactElement).type) {
			case TertiaryPageContainer.Body:
				body = child as ReactElement;
				break;
			case TertiaryPageContainer.Sidebar:
				sidebar = child as ReactElement;
				break;
			default:
				break;
		}
	});

	return (
		<section data-header-theme='light' className='bg-white-weak text-black'>
			<Container size={"lg"} id={"tertiaryPageContainer"}>
				<div className='block lg:flex flex-row-reverse lg:gap-20 items-stretch'>
					{sidebar ? sidebar : <div className='w-full lg:w-1/4'></div>}
					{body}
				</div>
			</Container>
		</section>
	);
};

// Assign the subcomponents as properties of the main component
TertiaryPageContainer.Body = Body;
TertiaryPageContainer.Sidebar = Sidebar;

export default TertiaryPageContainer;
