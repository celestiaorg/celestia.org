"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FormInput, FormTextarea } from "@/macros/Forms";
import PrimaryButtonNew from "@/macros/Buttons/PrimaryButtonNew";

// Stagger animation variants for form fields
const formItemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (delay = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay,
			ease: [0.25, 0.4, 0.25, 1],
		},
	}),
};

// Google Forms configuration - Entry IDs from form
// IMPORTANT: All fields in Google Forms must be "Short answer" or "Paragraph" type
// Dropdowns and other field types won't work with programmatic submission
const GOOGLE_FORM_CONFIG = {
	formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe2Ju3f_y2e1s_2dJ_Q7hShJ7qnRzCU_xdGpnq-DjwvCoa0Jg/formResponse",
	fields: {
		fullName: "entry.1555939131",
		telegram: "entry.690199909",
		companyName: "entry.451121569",
		email: "entry.1471295842",
		interestedIn: "entry.623296497",
		message: "entry.1600053316",
	},
};

const ContactForm = ({ className = "" }) => {
	const [formData, setFormData] = useState({
		fullName: "",
		telegram: "",
		companyName: "",
		email: "",
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

	// Client-side validation - only required fields
	const validateForm = () => {
		const errors = [];
		if (!formData.fullName.trim()) errors.push("Full Name is required");
		if (!formData.companyName.trim()) errors.push("Company Name is required");
		if (!formData.email.trim() || !formData.email.includes("@")) errors.push("Valid email is required");
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);
		setErrorMessage("");

		// Validate form
		const validationErrors = validateForm();
		if (validationErrors.length > 0) {
			setSubmitStatus("error");
			setErrorMessage(validationErrors.join(", "));
			setIsSubmitting(false);
			return;
		}

		try {
			// Build FormData for Google Forms submission
			const googleFormData = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				const entryId = GOOGLE_FORM_CONFIG.fields[key];
				if (entryId && value) {
					googleFormData.append(entryId, value);
				}
			});

			// Submit directly to Google Forms with no-cors mode
			await fetch(GOOGLE_FORM_CONFIG.formUrl, {
				method: "POST",
				mode: "no-cors",
				body: googleFormData,
			});

			// Since no-cors doesn't return response data, assume success
			setSubmitStatus("success");
			setFormData({
				fullName: "",
				telegram: "",
				companyName: "",
				email: "",
				interestedIn: "",
				message: "",
			});
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitStatus("error");
			setErrorMessage("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={`w-full ${className}`}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Row 1 */}
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.1}
				>
					<FormInput
						label="Full Name"
						name="fullName"
						placeholder="Full Name"
						value={formData.fullName}
						onChange={handleChange}
						required
					/>
				</motion.div>
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.15}
				>
					<FormInput
						label="Telegram"
						name="telegram"
						placeholder="@username"
						value={formData.telegram}
						onChange={handleChange}
					/>
				</motion.div>

				{/* Row 2 */}
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.2}
				>
					<FormInput
						label="Company Name"
						name="companyName"
						placeholder="Company Name"
						value={formData.companyName}
						onChange={handleChange}
						required
					/>
				</motion.div>
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.25}
				>
					<FormInput
						label="Email"
						name="email"
						type="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</motion.div>

				{/* Row 3 - Interested in spans full width */}
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.3}
					className="md:col-span-2"
				>
					<FormInput
						label="Interested in"
						name="interestedIn"
						placeholder="Partnership, Integration, Press, etc."
						value={formData.interestedIn}
						onChange={handleChange}
					/>
				</motion.div>

				{/* Full width textarea */}
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.35}
					className="md:col-span-2"
				>
					<FormTextarea
						label="Tell us more"
						name="message"
						placeholder="Type your message here"
						value={formData.message}
						onChange={handleChange}
						rows={5}
					/>
				</motion.div>

				{/* Submit button */}
				<motion.div
					variants={formItemVariants}
					initial="hidden"
					animate="visible"
					custom={0.4}
					className="md:col-span-2 flex flex-col items-end"
				>
					<PrimaryButtonNew
						type="submit"
						variant="purple"
						size="md"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Submitting..." : "Submit"}
					</PrimaryButtonNew>

					{submitStatus === "success" && (
						<p className="mt-4 text-white font-untitledSans text-sm text-right">
							Thank you! Your message has been sent successfully.
						</p>
					)}
					{submitStatus === "error" && (
						<p className="mt-4 text-red font-untitledSans text-sm text-right">
							{errorMessage || "Something went wrong. Please try again."}
						</p>
					)}
				</motion.div>
			</div>
		</form>
	);
};

export default ContactForm;
