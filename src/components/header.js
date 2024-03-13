import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

import logo from "../images/celestia-logo.svg";
import Image from "./imageComponent";

const navigation = [
	{
		text: "Learn",
		url: "/resources/",
		type: "internal",
		submenus: [
			{
				text: "What is Celestia?",
				subtext: "Start here",
				url: "/what-is-celestia/",
				icon: "menu/logo.svg",
				type: "internal",
				class: "plausible-event-name=What_Is_Celestia_Button--Header",
			},
			{
				text: "Intro to data availability",
				subtext: "Learn",
				url: "/what-is-da/",
				icon: "menu/documentation.svg",
				type: "internal",
				class: "",
			},
			{
				text: "Dive into modular",
				subtext: "Dive deep",
				url: "/learn/",
				icon: "menu/books.svg",
				type: "internal",
				class: "plausible-event-name=Dive_into_Modular_Button--Header",
			},
			{
				text: "Read the whitepaper",
				subtext: "Research paper",
				url: "https://arxiv.org/abs/1905.09274",
				icon: "menu/research.svg",
				type: "internal",
				class: "",
			},
		],
	},
	{
		text: "Build",
		url: "",
		submenus: [
			{
				text: "Start with the dev portal",
				subtext: "Build",
				url: "/build/",
				icon: "menu/devnet.svg",
				type: "internal",
				class: "plausible-event-name=Dev_Portal_Button--Header",
			},
			{
				text: "Read the docs",
				subtext: "Celestia Documentation",
				url: "https://docs.celestia.org/",
				icon: "menu/documentation.svg",
				type: "external",
				class: "plausible-event-name=Read_The_Docs_Button--Header",
			},
			{
				text: "View the GitHub repos",
				subtext: "GitHub repositories",
				url: "https://github.com/celestiaorg",
				icon: "menu/github.svg",
				type: "external",
				class: "",
			},
		],
	},
	{
		text: "Run a node",
		url: "/run-a-light-node/",
		type: "internal",
	},
];

const Header = () => {
	const [isBlur, setIsBlur] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const toggleHeaderClass = () => {
			if (window.scrollY > 80) {
				setIsBlur(true);
			} else if (window.scrollY < 80) {
				setIsBlur(false);
			}
		};
		window.addEventListener("scroll", toggleHeaderClass);
		toggleHeaderClass();

		return () => {
			window.removeEventListener("scroll", toggleHeaderClass);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<header id={"header"} className={`${isBlur ? "blur" : ""} ${isMenuOpen ? "menu-opened" : ""}`}>
				<div className={"blurry"} />
				<div className={"container"}>
					<button
						id={"hamburger"}
						className={`hamburger hamburger--slider ${isMenuOpen ? "is-active" : ""}`}
						type='button'
						onClick={toggleMenu}
						aria-label='Menu Toggle'
					>
						<span className='hamburger-box'>
							<span className='hamburger-inner' />
						</span>
					</button>
					<div className={"logo"}>
						<Link to='/'>
							<img src={logo} alt='Celestia' />
						</Link>
					</div>
					<nav>
						<ul>
							{navigation.map((link, index) => (
								<li key={index}>
									{link.submenus ? (
										<div className={"hasSubmenu"}>
											{link.text} <i className={"icon-dropdown"} />
										</div>
									) : link.type === "external" ? (
										<a href={link.url} target={"_blank"} rel={"noreferrer"}>
											{link.text}
										</a>
									) : (
										<Link to={`${link.url}`} activeClassName='active' aria-label={link.text}>
											{link.text} {link.submenus && <i className={"icon-dropdown"} />}
										</Link>
									)}
									{link.submenus && (
										<div className={"submenu"}>
											<ul>
												{link.submenus.map((submenu, index) => (
													<li key={index}>
														{submenu.type === "external" ? (
															<a
																href={submenu.url}
																target={"_blank"}
																rel='noreferrer'
																className={submenu.class}
																aria-label={submenu.text}
															>
																<div className={"row d-table w-100"}>
																	<div className={"col-2 align-middle d-table-cell"}>
																		<div className={"icon"}>
																			<Image alt={submenu.text} filename={submenu.icon} />
																		</div>
																	</div>
																	<div className={"col-10 align-middle d-table-cell"}>
																		<div className={"subtitle"}>{submenu.subtext}</div>
																		<div className={"title"}>{submenu.text}</div>
																	</div>
																</div>
															</a>
														) : (
															<Link to={submenu.url} className={submenu.class}>
																<div className={"row d-table w-100"}>
																	<div className={"col-2 align-middle d-table-cell"}>
																		<div className={"icon"}>
																			<Image alt={submenu.text} filename={submenu.icon} />
																		</div>
																	</div>
																	<div className={"col-10 align-middle d-table-cell"}>
																		<div className={"subtitle"}>{submenu.subtext}</div>
																		<div className={"title"}>{submenu.text}</div>
																	</div>
																</div>
															</Link>
														)}
													</li>
												))}
											</ul>
										</div>
									)}
								</li>
							))}
						</ul>
					</nav>
					<div className={"clear"} />
				</div>
			</header>
		</>
	);
};

export default Header;
