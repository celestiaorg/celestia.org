"use client";
import { motion } from "framer-motion";
import Container from "@/components/Container/Container";
import Link from "@/macros/Link/Link";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import Icon from "@/macros/Icons/Icon";
import MenuDataNew from "./data";
import MobileNavDropdownNew from "./MobileNavDropdownNew";
import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";

/**
 * MenuLabel - Label component for menu items
 */
const MenuLabel = ({ children }) => {
	return (
		<div className="w-full flex justify-between items-center group shrink-0">
			<h2 className="text-4xl lg:text-6xl text-white font-youth grow-1">{children}</h2>
			<Icon
				Icon={<ArrowLongSVG dark />}
				hover
				HoverIcon={<ArrowLongSVG dark />}
				className="shrink-0 grow-0"
				direction="down-right"
				border
				size="md"
				dark
			/>
		</div>
	);
};

/**
 * MobileNavNew - Full-screen mobile navigation overlay
 */
const MobileNavNew = () => {
	return (
		<motion.div
			className="bg-black text-white fixed top-0 left-0 h-screen w-screen z-40 pt-28 lg:pt-48"
			initial={{
				opacity: 0,
				scale: 1.5,
				filter: "blur(10px)",
			}}
			animate={{
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				transition: {
					duration: 0.25,
					ease: "easeOut",
				},
			}}
			exit={{
				opacity: 0,
				scale: 1.5,
				filter: "blur(10px)",
				transition: {
					duration: 0.35,
					ease: "easeOut",
				},
			}}
		>
			<Container size="xl" className="block md:flex md:gap-10 h-full">
				<div className="w-full sm:w-3/5 md:w-1/2 lg:w-1/3 h-full overflow-y-scroll overflow-x-visible no-scrollbar px-4 md:px-10">
					{MenuDataNew.map((item, index) => (
						<motion.div
							key={`menu-item-${index}`}
							initial={{
								opacity: 0,
								scale: 1.1,
								x: -20,
								transformOrigin: "center left",
							}}
							animate={{
								opacity: 1,
								scale: 1,
								x: 0,
								transition: {
									duration: 0.25,
									delay: 0.25 + 0.07 * index,
									ease: "easeOut",
								},
							}}
							className="mb-10"
						>
							{item.type === "dropdown" && (
								<MobileNavDropdownNew name={item.name} items={item.items} />
							)}
							{item.type === "link" && (
								<Link href={item.url} className="w-full text-white no-underline">
									<MenuLabel>{item.name}</MenuLabel>
								</Link>
							)}
						</motion.div>
					))}

					{/* Lumina light node component with purple color scheme */}
					<motion.div
						initial={{
							opacity: 0,
							scale: 1.1,
							x: -20,
							transformOrigin: "center left",
						}}
						animate={{
							opacity: 1,
							scale: 1,
							x: 0,
							transition: {
								duration: 0.25,
								delay: 0.25 + 0.07 * MenuDataNew.length,
								ease: "easeOut",
							},
						}}
						className="mb-10"
					>
						<LuminaBlockNumber colorScheme="purple" />
					</motion.div>
				</div>
			</Container>
		</motion.div>
	);
};

export default MobileNavNew;
