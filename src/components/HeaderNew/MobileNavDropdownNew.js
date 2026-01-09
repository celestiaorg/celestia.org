"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/macros/Link/Link";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import Icon from "@/macros/Icons/Icon";

/**
 * MobileNavDropdownNew - Accordion-style dropdown for mobile navigation
 *
 * @param {Object} props
 * @param {string} props.name - Menu item name
 * @param {Array} props.items - Dropdown items
 */
const MobileNavDropdownNew = ({ name, items }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex justify-between items-center group"
			>
				<h2 className="text-4xl lg:text-6xl text-white font-youth">{name}</h2>
				<Icon
					Icon={<ArrowLongSVG dark />}
					hover
					HoverIcon={<ArrowLongSVG dark />}
					className="shrink-0"
					direction={isOpen ? "up" : "down-right"}
					border
					size="md"
					dark
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="overflow-hidden"
					>
						<div className="pt-4 pb-2 pl-4 flex flex-col gap-3">
							{items.map((item, index) => (
								<Link
									key={index}
									href={item.url}
									className="text-white/70 text-lg hover:text-white transition-colors no-underline"
								>
									{item.name}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MobileNavDropdownNew;
