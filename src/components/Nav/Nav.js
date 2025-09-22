"use client";
import Container from "@/components/Container/Container";
import Banner from "@/components/Banner/Banner"; // Don't delete or comment out, just go to Banner component and switch the showBanner to true/false
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Icon from "@/macros/Icons/Icon";
import Link from "@/macros/Link/Link";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useScrollPosition } from "@/utils/scrollLock";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import MenuData from "./data";
import DesktopNav from "./DesktopNav";
import JumpNav from "./JumpNav";
import MenuButton from "./MenuButton";
import MobileNavDropdown from "./MobileNavDropdown";
import LuminaBlockNumber from "@/components/Lumina/BlockNumberDisplay";
const Nav = () => {
	const [hasScrolled, setHasScrolled] = useState(false);
	const controls = useAnimation();
	const { setScrollIsLocked, menuIsOpen, setMenuIsOpen, navHeights, primaryNavRef } = useScrollPosition();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				if (!hasScrolled) {
					setHasScrolled(true);
					controls.start({ backgroundColor: "#F6F6F6" });
				}
			} else {
				if (hasScrolled) {
					setHasScrolled(false);
					controls.start({ backgroundColor: "rgba(255,255,255,0)" });
				}
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [hasScrolled, setHasScrolled, controls]);

	useEffect(() => {
		setScrollIsLocked(menuIsOpen);
	}, [menuIsOpen, setScrollIsLocked]);

	return (
		<>
			<JumpNav />
			<motion.header
				initial={{ backgroundColor: "rgba(255,255,255,0)" }}
				animate={controls}
				className={`fixed top-0 left-0 w-full z-50`}
				ref={primaryNavRef}
			>
				{/* Don't delete or comment out, just switch the showBanner to true/false  */}
				<Banner showBanner={true} />

				<Container size={"lg"} padding={false}>
					<div
						className={`relative w-full flex justify-between items-center ${hasScrolled ? "py-3" : "py-6"} z-50 filter px-4 md:px-10 ${
							menuIsOpen ? "invert" : ""
						} transition-all duration-300`}
					>
						<div className='flex items-center space-x-3 xs:space-x-4'>
							<div className={`${menuIsOpen ? "invert" : ""} transition-all duration-300 lg:hidden`}>
								<MenuButton isOpen={menuIsOpen} onClick={() => setMenuIsOpen(!menuIsOpen)} />
							</div>
							<Link href={`/`}>
								{/* Symbol for screens smaller than xs (390px) */}
								<Image
									src={`/images/celestia-symbol.svg`}
									alt={`Celestia symbol | Home`}
									width={32}
									height={32}
									className={`h-auto w-[40px] block xs:hidden`}
									priority
								/>
								{/* Full logo for xs and larger screens */}
								<Image
									src={`/images/celestia-logo.svg`}
									alt={`Celestia logo | Home`}
									width={146}
									height={40}
									className={`h-auto w-[128px] sm:w-[146px] hidden xs:block`}
									priority
								/>
							</Link>
						</div>
						<DesktopNav />
						<LuminaBlockNumber />
					</div>
				</Container>
			</motion.header>
			<AnimatePresence>
				{menuIsOpen && (
					<motion.div
						className={`bg-black text-white fixed top-0 left-0 h-screen w-screen z-40 pt-28 lg:pt-48`}
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
						<Container size={"xl"} className={`block md:flex md:gap-10 h-full`}>
							<div
								className={`w-full sm:w-3/5 md:w-1/2 lg:w-1/3 h-full overflow-y-scroll overflow-x-visible no-scrollbar sm:px-4 md:px-10`}
							>
								{MenuData.map((item, index) => {
									return (
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
													delay: 0.25 + 0.07 * index,
													ease: "easeOut",
												},
											}}
											key={`menu-item-${index}`}
											className={`mb-10`}
										>
											{item.type === "dropdown" && <MobileNavDropdown name={item.name} items={item.items} />}
											{item.type === "link" && (
												<Link href={item.url} className='w-full text-white no-underline'>
													<MenuLabel>{item.name}</MenuLabel>
												</Link>
											)}
										</motion.div>
									);
								})}
							</div>
						</Container>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

const MenuLabel = ({ children }) => {
	return (
		<div className={`w-full flex justify-between items-center group shrink-0`}>
			<h2 className={`text-4xl lg:text-6xl grow-1`}>{children}</h2>
			<Icon
				Icon={<ArrowLongSVG dark />}
				hover
				HoverIcon={<ArrowLongSVG dark />}
				className={`shrink-0 grow-0`}
				direction={`down-right`}
				border
				size={"md"}
				dark
			/>
		</div>
	);
};

export default Nav;
