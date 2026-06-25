import type { ReactNode, HTMLAttributes } from "react";
import Container from "@/components/Container/Container";

interface IntroductionProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	className?: string;
	dataHeaderTheme?: string;
}

const Introduction = ({ children, className, dataHeaderTheme = "light", ...props }: IntroductionProps) => {
	return (
		<section {...props} data-header-theme={dataHeaderTheme} className='bg-white text-black'>
			<Container size={"lg"}>
				<div className={`pb-40 lg:flex ${className}`}>
					<div className='hidden lg:block w-1/3'></div>
					<div className=' w-full lg:w-2/3'>{children}</div>
				</div>
			</Container>
		</section>
	);
};

export default Introduction;
