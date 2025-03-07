import AutoConnectingLuminaNode from "@/components/Lumina/AutoConnectingLuminaNode";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Body } from "@/macros/Copy";
import Icon from "@/macros/Icons/Icon";
import Link from "@/macros/Link/Link";
import DropdownArrow from "@/macros/SVGs/DropdownArrow";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MenuData from "./data";

const DesktopNav = () => {
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const navRef = useRef(null);

	// Handle scroll behavior to close dropdown if scrolled more than 50px
	useEffect(() => {
		const handleScroll = () => {
			if (activeDropdown !== null && Math.abs(window.scrollY - scrollPosition) > 50) {
				setActiveDropdown(null);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [activeDropdown, scrollPosition]);

	// Handle dropdown selection
	const handleDropdownSelection = () => {
		setActiveDropdown(null);
	};

	const handleDropdownToggle = (index) => {
		setActiveDropdown(index);
		setScrollPosition(window.scrollY);
	};

	return (
		<nav ref={navRef} className='hidden ml-auto mr-0 lg:flex'>
			<ul className='flex items-center w-full gap-2'>
				{MenuData.map((menu, index) => (
					<li
						key={menu.name}
						className='relative flex-grow-1'
						onMouseEnter={() => {
							if (menu.type === "dropdown") handleDropdownToggle(index);
						}}
						onMouseLeave={() => {
							if (menu.type === "dropdown") setActiveDropdown(null);
						}}
					>
						{menu.type === "dropdown" ? (
							<PrimaryButton
								size='md'
								className={`bg-transparent !text-black ${activeDropdown === index ? "!bg-white-pure" : ""}`}
								noBorder
								isActive={activeDropdown === index}
								aria-expanded={activeDropdown === index}
								aria-haspopup='true'
								aria-controls={`dropdown-menu-${index}`}
							>
								<div className={"w-full inline-flex justify-between items-center group gap-2"}>
									<span>{menu.name}</span>
									<Icon
										Icon={<DropdownArrow />}
										hover
										HoverIcon={<DropdownArrow dark />}
										className={`flex-grow-0 flex-shrink-0`}
										direction='up'
										border={false}
										size={"xs"}
										transparentBg
									/>
								</div>
							</PrimaryButton>
						) : (
							<PrimaryButton
								href={menu.url}
								size='md'
								className={"bg-transparent !text-black"}
								noBorder
								onClick={handleDropdownSelection}
							>
								{menu.name}
							</PrimaryButton>
						)}

						<AnimatePresence>
							{activeDropdown === index && (
								<motion.div
									initial={{ opacity: 0, y: 30, x: "-50%" }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 30 }}
									className='absolute top-full left-1/2 w-64 translate-y-2.5 -translate-x-1/2 pt-2.5'
									id={`dropdown-menu-${index}`}
									role='menu'
								>
									<div className={"w-full bg-white-pure rounded-[.25rem] border-white-weak shadow-sm"}>
										<ul className='flex flex-col p-4'>
											{menu.items.map((item) => (
												<li key={item.name} role='menuitem'>
													<Link
														href={item.url || ""}
														className={
															"text-black block p-2 hover:bg-white-weak focus:bg-white-weak rounded-[.25rem] transition"
														}
														onClick={handleDropdownSelection}
													>
														<Body size='sm'>{item.name}</Body>
													</Link>
												</li>
											))}
										</ul>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				))}
			</ul>
			<AutoConnectingLuminaNode />
		</nav>
	);
};

export default DesktopNav;
