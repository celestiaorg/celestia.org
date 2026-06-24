import React, { type ReactNode, type ReactElement } from "react";
import Container from "@/components/Container/Container";

interface ChildProps {
	children?: ReactNode;
}

interface ListSectionProps {
	children?: ReactNode;
	id?: string;
}

const Header = ({ children }: ChildProps) => {
	return <div className=''>{children}</div>;
};

const Buttons = ({ children }: ChildProps) => {
	return <div className=''>{children}</div>;
};

const Body = ({ children }: ChildProps) => {
	return <div className=''>{children}</div>;
};

type ListSectionComponent = React.FC<ListSectionProps> & {
	Header: typeof Header;
	Buttons: typeof Buttons;
	Body: typeof Body;
};

const ListSection: ListSectionComponent = ({ children, id }: ListSectionProps) => {
	let header: ReactElement | null = null;
	let buttons: ReactElement | null = null;
	let body: ReactElement | null = null;

	// Loop through children to find ListSection.Header and ListSection.Body
	React.Children.forEach(children, (child) => {
		switch ((child as ReactElement).type) {
			case ListSection.Header:
				header = child as ReactElement;
				break;
			case ListSection.Buttons:
				buttons = child as ReactElement;
				break;
			case ListSection.Body:
				body = child as ReactElement;
				break;
			default:
				break;
		}
	});

	return (
		<section className='bg-black text-white' id={id} data-header-theme='dark'>
			<Container size={"lg"} className={"py-10 lg:py-20"}>
				<div className='block lg:flex lg:gap-6'>
					<div className='w-full lg:w-1/2 mb-6'>
						{header}
						{buttons}
					</div>
					<div className='w-full lg:w-1/2'>{body}</div>
				</div>
			</Container>
		</section>
	);
};

// Assign the subcomponents as properties of the main component
ListSection.Header = Header;
ListSection.Buttons = Buttons;
ListSection.Body = Body;

export default ListSection;
