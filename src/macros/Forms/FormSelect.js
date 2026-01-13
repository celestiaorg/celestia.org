"use client";

import { useState, useRef, useEffect } from "react";

/**
 * FormSelect - Custom select/dropdown component for the new design system
 *
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {string} props.name - Select name attribute
 * @param {string} props.placeholder - Placeholder text
 * @param {Array} props.options - Array of { value, label } objects
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.required - Whether select is required
 * @param {string} props.className - Additional CSS classes
 */
const FormSelect = ({
	label,
	name,
	placeholder = "Select",
	options = [],
	value,
	onChange,
	required = false,
	className = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const selectedOption = options.find((opt) => opt.value === value);
	const displayText = selectedOption ? selectedOption.label : placeholder;

	const handleSelect = (optionValue) => {
		onChange({ target: { name, value: optionValue } });
		setIsOpen(false);
	};

	return (
		<div className={`flex flex-col gap-1.5 ${className}`} ref={selectRef}>
			{label && (
				<label
					htmlFor={name}
					className="font-untitledSans font-medium text-sm leading-6 text-white"
				>
					{label}
					{required && "*"}
				</label>
			)}
			<div className="relative">
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={`w-full bg-input-bg border border-input-border rounded-lg px-4 py-4 font-untitledSans text-base text-left flex items-center justify-between focus:outline-none focus:border-purple-muted transition-colors ${
						selectedOption ? "text-white" : "text-input-placeholder"
					}`}
				>
					<span>{displayText}</span>
					<svg
						className={`w-2.5 h-1.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1 1L5 5L9 1"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				{isOpen && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-input-bg border border-input-border rounded-lg overflow-hidden z-50">
						{options.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => handleSelect(option.value)}
								className={`w-full px-4 py-3 text-left font-untitledSans text-base hover:bg-purple-muted/20 transition-colors ${
									option.value === value
										? "text-purple-weak bg-purple-muted/10"
										: "text-white"
								}`}
							>
								{option.label}
							</button>
						))}
					</div>
				)}

				{/* Hidden input for form submission */}
				<input
					type="hidden"
					name={name}
					value={value || ""}
					required={required}
				/>
			</div>
		</div>
	);
};

export default FormSelect;
