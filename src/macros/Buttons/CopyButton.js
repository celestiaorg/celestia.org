"use client";
import { useState } from "react";
import Icon from "@/macros/Icons/Icon";
import CopySVG from "@/macros/SVGs/CopySVG";
import { motion, AnimatePresence } from "framer-motion";

const CopyButton = ({ copy, hover = true, className }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(copy).then(() => {
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 1500); // Tooltip disappears after 2 seconds
		});
	};

	return (
		<div className={`relative inline-block ${className}`}>
			<button onClick={handleCopy} className='group mb-2.5 active:scale-[0.8] transition-transform'>
				<Icon Icon={<CopySVG />} dark={false} hover={hover} border HoverIcon={<CopySVG dark />} size={"sm"} />
			</button>
			<AnimatePresence>
				{copied && (
					<motion.div
						initial={{ opacity: 0, y: 10, x: "-50%" }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='absolute px-2 py-1 mb-1 text-xs text-white transform rounded bottom-full left-1/2 bg-black-subtle opacity-90'
					>
						Copied
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CopyButton;
