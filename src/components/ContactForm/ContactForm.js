"use client";

import { useState } from "react";

// Google Forms configuration - Entry IDs from form
// IMPORTANT: All fields in Google Forms must be "Short answer" or "Paragraph" type
// Dropdowns and other field types won't work with programmatic submission
const GOOGLE_FORM_CONFIG = {
	formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdEg-HDeVFE7Aa1yPEeBkTqNO6w0pEAzZPjFZQstTXKTV7dwg/formResponse",
	fields: {
		yourName: "entry.280187878",
		telegram: "entry.1728314109",
		companyName: "entry.1925434038",
		email: "entry.2073399473",
		interestedIn: "entry.340681359",
	},
};

const Field = ({ label, name, type = "text", placeholder, value, onChange, required }) => (
	<div className='flex flex-col gap-1.5'>
		<label
			htmlFor={name}
			className='font-nuberNext text-[14px] font-medium tracking-[-0.01em] text-[#0E1014]'
		>
			{label}
			{required && "*"}
		</label>
		<input
			id={name}
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			required={required}
			className='appearance-none rounded-none border-0 border-b border-black/[0.15] bg-transparent px-0 py-2.5 font-nuberNext text-[14px] text-[#0E1014] outline-none transition-colors placeholder:text-black/25 focus:border-black/40'
		/>
	</div>
);

/**
 * ContactForm — light-themed form card (ported from prototype .contact-page-form).
 * White card with underline fields: Email, First/Last name, Company, Telegram,
 * Interested in. Submits to the existing Google Form (first + last combine into
 * the single "yourName" entry the backend expects).
 */
const ContactForm = ({ className = "" }) => {
	const [formData, setFormData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		companyName: "",
		telegram: "",
		interestedIn: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		const errors = [];
		if (!formData.email.trim() || !formData.email.includes("@")) errors.push("Valid email is required");
		if (!formData.interestedIn.trim()) errors.push("Interested in is required");
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);
		setErrorMessage("");

		const validationErrors = validateForm();
		if (validationErrors.length > 0) {
			setSubmitStatus("error");
			setErrorMessage(validationErrors.join(", "));
			setIsSubmitting(false);
			return;
		}

		try {
			const payload = {
				yourName: `${formData.firstName} ${formData.lastName}`.trim(),
				telegram: formData.telegram,
				companyName: formData.companyName,
				email: formData.email,
				interestedIn: formData.interestedIn,
			};

			const googleFormData = new FormData();
			Object.entries(payload).forEach(([key, value]) => {
				const entryId = GOOGLE_FORM_CONFIG.fields[key];
				if (entryId && value) {
					googleFormData.append(entryId, value);
				}
			});

			await fetch(GOOGLE_FORM_CONFIG.formUrl, {
				method: "POST",
				mode: "no-cors",
				body: googleFormData,
			});

			setSubmitStatus("success");
			setFormData({
				email: "",
				firstName: "",
				lastName: "",
				companyName: "",
				telegram: "",
				interestedIn: "",
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
		<form onSubmit={handleSubmit} className={`flex flex-col gap-6 ${className}`}>
			<Field
				label='Email'
				name='email'
				type='email'
				placeholder='you@company.com'
				value={formData.email}
				onChange={handleChange}
				required
			/>

			<div className='grid grid-cols-2 gap-6 max-[600px]:grid-cols-1'>
				<Field
					label='First name'
					name='firstName'
					placeholder='First name'
					value={formData.firstName}
					onChange={handleChange}
				/>
				<Field
					label='Last name'
					name='lastName'
					placeholder='Last name'
					value={formData.lastName}
					onChange={handleChange}
				/>
			</div>

			<Field
				label='Company name'
				name='companyName'
				placeholder='Company name'
				value={formData.companyName}
				onChange={handleChange}
			/>

			<Field
				label='Telegram'
				name='telegram'
				placeholder='@username'
				value={formData.telegram}
				onChange={handleChange}
			/>

			<Field
				label='Interested in'
				name='interestedIn'
				placeholder='Partnership, Integration, Press, etc.'
				value={formData.interestedIn}
				onChange={handleChange}
				required
			/>

			<button
				type='submit'
				disabled={isSubmitting}
				className='mt-2 self-start rounded-full border-none bg-[#0E1014] px-8 py-3 font-nuberNext text-[14px] font-medium text-[#FDFCFF] transition-opacity hover:opacity-85 disabled:opacity-60'
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>

			{submitStatus === "success" && (
				<p className='font-nuberNext text-[14px] text-[#4a4a5a]'>
					Thank you! Your message has been sent successfully.
				</p>
			)}
			{submitStatus === "error" && (
				<p className='font-nuberNext text-[14px] text-red'>
					{errorMessage || "Something went wrong. Please try again."}
				</p>
			)}
		</form>
	);
};

export default ContactForm;
