"use client";

/**
 * FormTextarea - Textarea component for the new design system
 *
 * @param {Object} props
 * @param {string} props.label - Textarea label
 * @param {string} props.name - Textarea name attribute
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Textarea value
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.required - Whether textarea is required
 * @param {number} props.rows - Number of rows
 * @param {string} props.className - Additional CSS classes
 */
const FormTextarea = ({
	label,
	name,
	placeholder = "",
	value,
	onChange,
	required = false,
	rows = 4,
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
			<textarea
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				rows={rows}
				className="w-full bg-input-bg border border-input-border rounded-lg px-4 py-4 font-untitledSans text-base text-white placeholder:text-input-placeholder focus:outline-none focus:border-purple-muted transition-colors resize-none"
			/>
		</div>
	);
};

export default FormTextarea;
