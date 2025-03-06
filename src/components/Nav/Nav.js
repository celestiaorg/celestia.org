"use client";
import Banner from "@/components/Banner/Banner";
import Container from "@/components/Container/Container";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import Icon from "@/macros/Icons/Icon";
import Link from "@/macros/Link/Link";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { useScrollPosition } from "@/utils/scrollLock";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import DesktopNav from "./DesktopNav";
import JumpNav from "./JumpNav";
import MobileNavDropdown from "./MobileNavDropdown";
import MenuData from "./data";

const Nav = ({ dark = false }) => {
	const [hasScrolled, setHasScrolled] = useState(false);
	const controls = useAnimation();
	const { setScrollIsLocked, menuIsOpen, setMenuIsOpen, primaryNavRef } = useScrollPosition();

	useEffect(() => {
		const SCROLL_THRESHOLD = 100; // pixels

		const handleScroll = () => {
			if (window.scrollY > SCROLL_THRESHOLD) {
				if (!hasScrolled) {
					setHasScrolled(true);
					controls.start({ backgroundColor: dark ? "#17141A" : "#F6F6F6" });
				}
			} else {
				if (hasScrolled) {
					setHasScrolled(false);
					controls.start({ backgroundColor: dark ? "#17141A" : "rgba(255, 255, 255, 0)" });
				}
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [hasScrolled, setHasScrolled, controls, dark]);

	useEffect(() => {
		setScrollIsLocked(menuIsOpen);
	}, [menuIsOpen, setScrollIsLocked]);

	return (
		<>
			<JumpNav dark={dark} />
			<motion.header
				initial={{ backgroundColor: dark ? "#17141A" : "rgba(255, 255, 255, 0)" }}
				animate={controls}
				className={`fixed top-0 left-0 w-full z-50 ${dark ? "text-white" : ""}`}
				ref={primaryNavRef}
			>
				{/* Toggle the banner visibility in BannerContext.js */}
				<Banner />
				<Container size={"lg"} padding={false}>
					<div
						className={`relative w-full flex justify-between items-center py-6 z-50 filter px-4 md:px-10 ${
							menuIsOpen ? "invert" : ""
						} transition-all duration-300`}
					>
						<Link href='/'>
							<Image
								src={dark ? `/images/celestia-logo-invert.svg` : `/images/celestia-logo.svg`}
								alt={`Celestia logo | Home`}
								width={128}
								height={32}
								className={`h-auto max-w-32`}
								priority
							/>
						</Link>
						<PrimaryButton onClick={() => setMenuIsOpen(!menuIsOpen)} lightMode={!dark} dark={dark} className={"md:hidden"}>
							{menuIsOpen ? (
								<>
									Close <span className={`sr-only`}>the main</span>
								</>
							) : (
								<>
									<span className={`sr-only`}>Open the main</span> menu
								</>
							)}
						</PrimaryButton>
						<DesktopNav lightMode={!dark} />
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
								className={`w-full sm:w-3/5 md:w-1/2 lg:w-1/3 h-full overflow-y-scroll overflow-x-visible no-scrollbar py-10 px-4 md:px-10`}
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
