"use client";

import { useState } from "react";
import { FormInput, FormSelect, FormTextarea } from "@/macros/Forms";
import PrimaryButtonNew from "@/macros/Buttons/PrimaryButtonNew";

const INTEREST_OPTIONS = [
	{ value: "partnership", label: "Partnership" },
	{ value: "integration", label: "Integration" },
	{ value: "press", label: "Press Inquiry" },
	{ value: "general", label: "General Inquiry" },
	{ value: "other", label: "Other" },
];

const ContactForm = ({ className = "" }) => {
	const [formData, setFormData] = useState({
		fullName: "",
		telegram: "",
		companyName: "",
		email: "",
		website: "",
		interestedIn: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send message");
			}

			setSubmitStatus("success");
			setFormData({
				fullName: "",
				telegram: "",
				companyName: "",
				email: "",
				website: "",
				interestedIn: "",
				message: "",
			});
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitStatus("error");
			setErrorMessage(error.message || "Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={`w-full ${className}`}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Row 1 */}
				<FormInput
					label="Full Name"
					name="fullName"
					placeholder="Full Name"
					value={formData.fullName}
					onChange={handleChange}
					required
				/>
				<FormInput
					label="Your Telegram"
					name="telegram"
					placeholder="@username"
					value={formData.telegram}
					onChange={handleChange}
				/>

				{/* Row 2 */}
				<FormInput
					label="Company Name"
					name="companyName"
					placeholder="Company Name"
					value={formData.companyName}
					onChange={handleChange}
					required
				/>
				<FormInput
					label="Email"
					name="email"
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>

				{/* Row 3 */}
				<FormInput
					label="Link to company website or socials"
					name="website"
					placeholder="Links"
					value={formData.website}
					onChange={handleChange}
				/>
				<FormSelect
					label="Interested in"
					name="interestedIn"
					placeholder="Select"
					options={INTEREST_OPTIONS}
					value={formData.interestedIn}
					onChange={handleChange}
					required
				/>

				{/* Full width textarea */}
				<FormTextarea
					label="Tell us what you're curious about?"
					name="message"
					placeholder="Type your message here"
					value={formData.message}
					onChange={handleChange}
					rows={5}
					className="md:col-span-2"
				/>

				{/* Submit button */}
				<div className="md:col-span-2">
					<PrimaryButtonNew
						type="submit"
						variant="purple"
						size="md"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</PrimaryButtonNew>

					{submitStatus === "success" && (
						<p className="mt-4 text-green font-untitledSans text-sm">
							Thank you! Your message has been sent successfully.
						</p>
					)}
					{submitStatus === "error" && (
						<p className="mt-4 text-red font-untitledSans text-sm">
							{errorMessage || "Something went wrong. Please try again."}
						</p>
					)}
				</div>
			</div>
		</form>
	);
};

export default ContactForm;
