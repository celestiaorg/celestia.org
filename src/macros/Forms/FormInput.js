"use client";

/**
 * FormInput - Text input component for the new design system
 *
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.name - Input name attribute
 * @param {string} props.type - Input type (text, email, etc.)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.helperText - Helper text below input
 * @param {string} props.className - Additional CSS classes
 */
const FormInput = ({
	label,
	name,
	type = "text",
	placeholder = "",
	value,
	onChange,
	required = false,
	helperText,
	className = "",
}) => {
	return (
		<div className={`flex flex-col gap-1.5 ${className}`}>
			{label && (
				<label
					htmlFor={name}
					className="font-untitledSans font-medium text-sm leading-6 text-white"
				>
					{label}
					{required && "*"}
				</label>
			)}
			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				className="w-full bg-input-bg border border-input-border rounded-lg px-4 py-4 font-untitledSans text-base text-white placeholder:text-input-placeholder focus:outline-none focus:border-purple-muted transition-colors"
			/>
			{helperText && (
				<p className="font-untitledSans text-sm text-grayscale-400 leading-5">
					{helperText}
				</p>
			)}
		</div>
	);
};

export default FormInput;
