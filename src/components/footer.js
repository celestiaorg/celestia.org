import React from "react";
import { Link } from "gatsby";
import SignUp from "./modals/signUp";

// import FooterBox from "../components/footer-box";
import FooterBox2 from "../components/footer-box-2";

const navigation = {
	column1: {
		title: "Developers",
		links: [
			{
				text: "Build",
				url: "/build",
				type: "internal",
			},
			{
				text: "Docs",
				url: "https://docs.celestia.org/",
				type: "external",
			},
			{
				text: "Github",
				url: "https://github.com/celestiaorg",
				type: "external",
			},
			{
				text: "FAQ",
				url: "/faq",
				type: "internal",
			},
		],
	},
	column2: {
		title: "Resources",
		links: [
			{
				text: "Technology",
				url: "/technology",
				type: "internal",
			},
			{
				text: "Glossary",
				url: "/glossary",
				type: "internal",
			},
			{
				text: "Blog",
				url: "https://blog.celestia.org",
				type: "external",
			},
			{
				text: "Podcast",
				url: "https://podcast.celestia.org/",
				type: "external",
			},
			{
				text: "Resources",
				url: "/resources",
				type: "internal",
			},
		],
	},
	column3: {
		title: "Misc",
		links: [
			{
				text: "Brand",
				url: "https://company-223625.frontify.com/d/JoSwaZS4Mjpj",
				type: "external",
			},
			{
				text: "Press",
				url: "/press/",
				type: "internal",
			},
			{
				text: "Careers",
				url: "/careers/",
				type: "internal",
			},
			{
				text: "Terms of Service",
				url: "/tos/",
				type: "internal",
			},
			{
				text: "Privacy Policy",
				url: "/privacy/",
				type: "internal",
			},
		],
	},
};

const Footer = (props) => {
	return (
		<footer id={"footer"}>
			<div className={"container"}>
				{props.FooterBoxes2 && <FooterBox2 footerBoxes2={props.FooterBoxes2} />}

				<div className={"row py-5 mt-5"}>
					<div className={"col col-12 col-lg-4 pe-5"}>
						<div className={"title"}>Subscribe to our Newsletter</div>
						<SignUp />
					</div>
					<div className={"col col-12 col-lg-8 ps-3 pt-5 pt-lg-0 ps-lg-5"}>
						<div className={"row"}>
							<div className={"col col-12 col-sm-9"}>
								<nav>
									<ul>
										<label className={"col-title"}>{navigation.column1.title}</label>
										{navigation.column1.links.map((link) => (
											<li key={`${link.url}`}>
												{link.type === "external" ? (
													<a href={`${link.url}`} target={"_blank"} rel={"noreferrer"}>
														{link.text}
													</a>
												) : (
													<Link to={`${link.url}`}>{link.text}</Link>
												)}
											</li>
										))}
									</ul>
									<ul>
										<label className={"col-title"}>{navigation.column2.title}</label>
										{navigation.column2.links.map((link) => (
											<li key={`${link.url}`}>
												{link.type === "external" ? (
													<a href={`${link.url}`} target={"_blank"} rel={"noreferrer"}>
														{link.text}
													</a>
												) : (
													<Link to={`${link.url}`}>{link.text}</Link>
												)}
											</li>
										))}
									</ul>
									<ul>
										<label className={"col-title"}>{navigation.column3.title}</label>
										{navigation.column3.links.map((link) => (
											<li key={`${link.url}`}>
												{link.type === "external" ? (
													<a href={`${link.url}`} target={"_blank"} rel={"noreferrer"}>
														{link.text}
													</a>
												) : (
													<Link to={`${link.url}`}>{link.text}</Link>
												)}
											</li>
										))}
									</ul>
								</nav>
							</div>
							<div className={"col col-12 col-sm-3 align-right"}>
								<div className={"col-title text-right"}>Follow us</div>
								<Link to={`/community/`} className={"button button-footer"}>
									Community
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className={"d-flex justify-content-center"}>
					<div className={"col col-12 col-sm-6 d-flex flex-column align-items-center"}>
						<p className='mb-3'>This website is maintained by Celestia Labs.</p>
						<p>
							Website designed with <i className={"icon-heart"} /> by <a href='https://designatives.com'>Designatives</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
