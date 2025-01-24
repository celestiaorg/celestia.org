import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Row } from "@/macros/Grids";
import { Body } from "@/macros/Copy";

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState(null);
	const [msg, setMsg] = useState("");
	const [captchaError, setCaptchaError] = useState("");
	const [token, setToken] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const reCaptchaRef = useRef(null);

	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

	const handleChange = (e) => {
		setEmail(e.target.value);
		setStatus(null);
		setMsg("");
		setCaptchaError("");
	};

	const onReCAPTCHAChange = (token) => {
		setToken(token);
		setCaptchaError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSubmitting) return;
		if (!email) {
			setStatus("Error");
			setMsg("Please enter your email address.");
			return;
		}
		if (!token) {
			setCaptchaError("Please complete the reCAPTCHA challenge!");
			reCaptchaRef.current?.reset();
			return;
		}

		try {
			setIsSubmitting(true);

			const response = await fetch("https://eff999e9-celestia-newsletter-worker.infra-admin-749.workers.dev/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					recaptchaToken: token,
				}),
			});

			const data = await response.json();

			if (data.success) {
				setStatus("Success");
				setMsg("Thank you for subscribing!");
				setEmail("");
			} else {
				setStatus("Error");
				setMsg(
					data.error === "Already subscribed"
						? "You're already subscribed to our newsletter!"
						: data.error || "An error occurred. Please try again."
				);
			}
		} catch (error) {
			setStatus("Error");
			setMsg("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
			reCaptchaRef.current?.reset();
			setToken(null);
		}
	};

	return (
		<div className={"modal-content-inner"}>
			<form onSubmit={handleSubmit} className={"w-full"}>
				<Row className='flex items-center gap-4'>
					<div className={"w-full relative"}>
						<label
							htmlFor={"email"}
							className={`px-2 py-3 absolute text-sm leading-[1.2857] transition-all ${
								email.length > 0 ? "-top-8 -left-2 text-opacity-100" : "top-0 left-0 text-opacity-60 pointer-events-none"
							}`}
						>
							Email
						</label>
						<input
							type='email'
							id={"email"}
							value={email}
							className={`w-full px-2 py-3 text-sm leading-[1.2857] bg-transparent border-b rounded-none ${
								captchaError ? "border-red-error-subtle" : "border-white"
							}`}
							onChange={handleChange}
							required
							disabled={isSubmitting}
						/>
					</div>

					<PrimaryButton
						lightMode
						hover
						className={"bg-white grow-0 shrink-0 select-none"}
						type={"submit"}
						disabled={isSubmitting}
						onClick={(e) => {
							console.log("Button clicked"); // Debug log
							if (!isSubmitting) {
								handleSubmit(e);
							}
						}}
					>
						{isSubmitting ? "Subscribing..." : "Subscribe"}
					</PrimaryButton>
				</Row>
				{siteKey && (
					<Row className='mt-3'>
						<ReCAPTCHA sitekey={siteKey} ref={reCaptchaRef} onChange={onReCAPTCHAChange} />
					</Row>
				)}
				{captchaError && (
					<Row className='px-2 mt-2'>
						<Body size={"sm"} className={"text-red-error"}>
							{captchaError}
						</Body>
					</Row>
				)}
				{status === "Error" && (
					<Row className='px-2 mt-2'>
						<Body size={"sm"} className={"text-red-error"}>
							{msg}
						</Body>
					</Row>
				)}
				{status === "Success" && (
					<Row className='px-2 mt-2'>
						<Body size={"sm"} className={"text-green"}>
							{msg}
						</Body>
					</Row>
				)}
			</form>
		</div>
	);
};

export default Newsletter;
