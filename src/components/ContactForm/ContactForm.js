"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

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
	formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdEg-HDeVFE7Aa1yPEeBkTqNO6w0pEAzZPjFZQstTXKTV7dwg/formResponse",
	fields: {
		yourName: "entry.280187878",
		telegram: "entry.1728314109",
		companyName: "entry.1925434038",
		email: "entry.2073399473",
		interestedIn: "entry.340681359",
	},
};

const UnderlineField = ({ label, name, type = "text", placeholder, value, onChange, required }) => (
	<div className='flex flex-col gap-3'>
		<label
			htmlFor={name}
			className='font-slussen font-medium text-[14px] leading-none tracking-[-0.2px] text-white/85'
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
			className='w-full bg-transparent border-0 border-b border-white/20 focus:border-white/35 rounded-none appearance-none px-0 py-3 font-slussenMono text-[15px] leading-none text-white/95 placeholder:text-white/30 outline-none transition-colors'
		/>
	</div>
);

const ContactForm = ({ className = "" }) => {
	const [formData, setFormData] = useState({
		yourName: "",
		telegram: "",
		companyName: "",
		email: "",
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
		if (!formData.yourName.trim()) errors.push("Your Name is required");
		if (!formData.companyName.trim()) errors.push("Company Name is required");
		if (!formData.email.trim() || !formData.email.includes("@")) errors.push("Valid email is required");
		if (!formData.interestedIn.trim()) errors.push("Interested In is required");
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
			const googleFormData = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
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
				yourName: "",
				telegram: "",
				companyName: "",
				email: "",
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
		<form onSubmit={handleSubmit} className={`flex flex-col gap-9 w-full ${className}`}>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-9'>
				<motion.div variants={formItemVariants} initial='hidden' animate='visible' custom={0.1}>
					<UnderlineField
						label='Your Name'
						name='yourName'
						placeholder='Your Name'
						value={formData.yourName}
						onChange={handleChange}
						required
					/>
				</motion.div>
				<motion.div variants={formItemVariants} initial='hidden' animate='visible' custom={0.15}>
					<UnderlineField
						label='Telegram'
						name='telegram'
						placeholder='@username'
						value={formData.telegram}
						onChange={handleChange}
					/>
				</motion.div>

				<motion.div variants={formItemVariants} initial='hidden' animate='visible' custom={0.2}>
					<UnderlineField
						label='Company Name'
						name='companyName'
						placeholder='Company Name'
						value={formData.companyName}
						onChange={handleChange}
						required
					/>
				</motion.div>
				<motion.div variants={formItemVariants} initial='hidden' animate='visible' custom={0.25}>
					<UnderlineField
						label='Email'
						name='email'
						type='email'
						placeholder='Email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</motion.div>
			</div>

			<motion.div variants={formItemVariants} initial='hidden' animate='visible' custom={0.3}>
				<UnderlineField
					label='Interested in'
					name='interestedIn'
					placeholder='Partnership, Integration, Press, etc.'
					value={formData.interestedIn}
					onChange={handleChange}
					required
				/>
			</motion.div>

			<motion.div
				variants={formItemVariants}
				initial='hidden'
				animate='visible'
				custom={0.35}
				className='flex flex-col items-end pt-1'
			>
				<Button type='submit' variant='pill-outline' size='pill-md' disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>

				{submitStatus === "success" && (
					<p className='mt-4 font-slussenMono text-sm text-white/70 text-right'>
						Thank you! Your message has been sent successfully.
					</p>
				)}
				{submitStatus === "error" && (
					<p className='mt-4 font-slussenMono text-sm text-red text-right'>
						{errorMessage || "Something went wrong. Please try again."}
					</p>
				)}
			</motion.div>
		</form>
	);
};

export default ContactForm;
