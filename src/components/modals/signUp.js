import React, { useState, useRef } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import ReactModal from "react-modal";
import ReCAPTCHA from "react-google-recaptcha";

ReactModal.setAppElement("#___gatsby");

const SignUp = (props) => {
	const [email, setEmail] = useState("");
	const [listFields, setListFields] = useState({ "group[57543]": "1" });
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [popupTitle, setPopupTitle] = useState("Thank you");
	const [msg, setMsg] = useState("");
	const [captchaError, setCaptchaError] = useState("");

	const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY;
	const [token, setToken] = useState(null);
	const reCaptchaRef = useRef(null);

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const onReCAPTCHAChange = (token) => {
		setToken(token);
		setCaptchaError("");
	};

	const asyncScriptOnLoad = () => {
		console.log("reCAPTCHA script loaded");
	};

	const mailchimp = (url) => {
		addToMailchimp(email, listFields, url)
			.then((data) => {
				setMsg(data.msg);
				if (data.result === "error" && data.msg.includes("is already subscribed")) {
					setPopupTitle("Thank you!");
					setMsg("Thank you for subscribing!");
					setIsModalOpen(true);
				} else {
					setPopupTitle(data.result === "success" ? "Thank you!" : "Error");
					setIsModalOpen(true);
				}
			})
			.catch(() => {});
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!token) {
			setCaptchaError("Please complete the reCAPTCHA challenge!"); // Set captcha error message
			return;
		}
		const updatedListFields = { ...listFields, "group[57543][1]": 1 };
		setListFields(updatedListFields);
		if (email) {
			mailchimp("https://celestia.us6.list-manage.com/subscribe/post?u=cde2461ba84f5279fff352829&amp;id=8d165e36d3");
		}
	};

	return (
		<div className={"modal-content-inner"}>
			<ReactModal isOpen={isModalOpen}>
				<div className={"inner"}>
					<h3 className={"text-center"}>{popupTitle}</h3>
					<div
						className={"text-center"}
						dangerouslySetInnerHTML={{
							__html: msg,
						}}
					/>
					<button className={"close-button"} onClick={handleModalClose}>
						<i className={"icon-close"} aria-label='Close'></i>
					</button>
				</div>
			</ReactModal>
			<div className={"row"}>
				<div className={"col-12"}>
					<form onSubmit={handleSubmit} className={"needs-validation"}>
						<input
							type='email'
							id={"email"}
							placeholder='mail@celestia.com'
							className={"form-control"}
							onChange={handleChange}
							required
						/>
						{captchaError && <div style={{ color: "white", marginTop: "10px", marginBottom: "20px" }}>{captchaError}</div>}
						<div className='mt-3'>
							<ReCAPTCHA sitekey={siteKey} ref={reCaptchaRef} onChange={onReCAPTCHAChange} asyncScriptOnLoad={asyncScriptOnLoad} />
						</div>
						<button type={"submit"} className={"button button-simple mt-3"}>
							Subscribe
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
