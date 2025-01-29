import React, { useState } from "react";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Row } from "@/macros/Grids";
import { Body } from "@/macros/Copy";

const NewsletterSimple = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState(null);
	const [msg, setMsg] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const handleChange = (e) => {
		setEmail(e.target.value);
		setStatus(null);
		setMsg("");
	};

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => setIsFocused(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isSubmitting) return;
		if (!email) {
			setStatus("Error");
			setMsg("Please enter your email address.");
			return;
		}

		try {
			setIsSubmitting(true);

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			const data = await response.json();

			if (response.status === 429) {
				setStatus("Error");
				setMsg("Too many requests. Please try again later.");
				return;
			}

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
			const errorMessage =
				error.name === "AbortError" ? "Request timed out. Please try again." : "Unable to subscribe at this time. Please try again later.";
			setMsg(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={"modal-content-inner"}>
			<form onSubmit={handleSubmit} className={"w-full"}>
				<Row className='flex items-center gap-4'>
					<div className={"w-full relative"}>
						<label
							htmlFor={"email"}
							className={`absolute text-sm leading-[1.2857] transition-all duration-200 ${
								email.length > 0 || isFocused
									? "-translate-y-6 text-opacity-100 text-xs"
									: "translate-y-3 text-opacity-60 pointer-events-none"
							} px-2`}
						>
							Email
						</label>
						<input
							type='email'
							id={"email"}
							value={email}
							className={`w-full px-2 py-3 text-sm leading-[1.2857] bg-transparent border-b rounded-none border-white`}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							required
							disabled={isSubmitting}
						/>
					</div>

					<PrimaryButton lightMode hover className={"bg-white grow-0 shrink-0 select-none"} type={"submit"} disabled={isSubmitting}>
						{isSubmitting ? "Subscribing..." : "Subscribe"}
					</PrimaryButton>
				</Row>

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

export default NewsletterSimple;
