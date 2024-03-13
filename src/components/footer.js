import * as React from "react";
import { Link } from "gatsby";
import addToMailchimp from "gatsby-plugin-mailchimp";

// import FooterBox from "../components/footer-box";
import FooterBox2 from "../components/footer-box-2";
import ReactModal from "react-modal";

ReactModal.setAppElement("#___gatsby");

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

class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			listFields: {
				"group[57543]": "1",
			},
			isModalOpen: false,
			popupTitle: "",
			msg: "",
		};
	}
	handleModalOpen = (event) => {
		this.setState({ isModalOpen: true });
		document.body.style.overflow = "hidden";
	};

	handleModalClose = (event) => {
		this.setState({ isModalOpen: false });
		document.body.style.overflow = "unset";
	};

	mailchimp(url) {
		addToMailchimp(this.state.email, this.state.listFields, url) // listFields are optional if you are only capturing the email address.
			.then((data) => {
				this.setState({ msg: data.msg });
				if (data.result === "error" && data.msg.includes("is already subscribed")) {
					this.setState({ success: true });
					this.setState({ isModalOpen: true });
					this.setState({ popupTitle: "Thank you!" });
					this.setState({ msg: "Thank you for subscribing!" });
				} else {
					if (data.result === "success") {
						this.setState({ success: true });
						this.setState({ isModalOpen: true });
						this.setState({ popupTitle: "Thank you!" });
						this.setState({ msg: this.state.msg });
					} else {
						this.setState({ isModalOpen: true });
						this.setState({ popupTitle: "Error" });
					}
				}
				//console.log(data)
			})
			.catch(() => {});
	}

	_handleSubmit = (e) => {
		e.preventDefault();
		const listFields = {};

		listFields["group[57543][1]"] = 1;

		this.setState(
			(prevState) => ({
				listFields,
			}),
			() => {
				if (this.state.email) {
					this.mailchimp("https://celestia.us6.list-manage.com/subscribe/post?u=cde2461ba84f5279fff352829&amp;id=8d165e36d3");
				}
			}
		);
	};

	change = (e) => {
		e.preventDefault();
		this.setState({ email: e.target.value });
	};

	render() {
		return (
			<footer id={"footer"}>
				<div className={"container"}>
					{/* {this.props.FooterBoxes && <FooterBox footerBoxes={this.props.FooterBoxes}/>} */}
					{this.props.FooterBoxes2 && <FooterBox2 footerBoxes2={this.props.FooterBoxes2} />}

					<div className={"row py-5 mt-5"}>
						<div className={"col col-12 col-lg-4 pe-5"}>
							<div className={"title"}>Subscribe to our Newsletter</div>

							<form onSubmit={(e) => this._handleSubmit(e)} className={"needs-validation"}>
								<input
									type='email'
									id={"email"}
									placeholder='mail@celestia.com'
									className={"form-control"}
									onChange={(e) => this.change(e)}
									required
								/>
								<button type={"submit"} className={"button button-simple mt-3"}>
									Subscribe
								</button>
							</form>
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
				<ReactModal isOpen={this.state.isModalOpen}>
					<div className={"inner"}>
						<h3 className={"text-center"}>{this.state.popupTitle}</h3>
						<div
							className={"text-center"}
							dangerouslySetInnerHTML={{
								__html: this.state.msg,
							}}
						/>
						<button className={"close-button"} onClick={this.handleModalClose}>
							<i className={"icon-close"} aria-label='Close'></i>
						</button>
					</div>
				</ReactModal>
			</footer>
		);
	}
}

export default Footer;
