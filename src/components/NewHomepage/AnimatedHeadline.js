"use client";

import { useRef, useEffect, useState } from "react";

/**
 * AnimatedHeadline — section headline with a letter-by-letter "flying letters"
 * reveal (ported from the prototype's .section-headline animation).
 *
 * Splits on words so wrapping happens between words (never mid-word), while each
 * letter animates in sequence. Typography matches the prototype's
 * .section-headline: Slussen Extended medium, 28px→40px responsive, #1a1a1a.
 */
const AnimatedHeadline = ({ text, className = "", dark = false, align = "center" }) => {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const words = text.split(" ");
	let charIndex = -1;

	const alignClass = align === "left" ? "justify-start text-left" : "justify-center text-center";
	const colorClass = dark ? "text-[#FDFCFF]" : "text-[#1a1a1a]";

	return (
		<h2
			ref={ref}
			aria-label={text}
			className={`font-slussenExtended font-medium text-[28px] min-[600px]:text-[32px] min-[900px]:text-[36px] min-[1200px]:text-[40px] tracking-[-0.025em] leading-[1.25] ${colorClass} flex flex-wrap ${alignClass} gap-x-[0.28em] ${className}`}
		>
			{words.map((word, wi) => (
				<span key={wi} className="inline-flex" aria-hidden="true">
					{word.split("").map((char) => {
						charIndex += 1;
						const delay = charIndex * 40;
						return (
							<span
								key={charIndex}
								className="inline-block will-change-[transform,opacity] transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
								style={{
									transitionDelay: `${delay}ms`,
									opacity: isVisible ? 1 : 0,
									transform: isVisible ? "translateY(0)" : "translateY(40px)",
								}}
							>
								{char}
							</span>
						);
					})}
				</span>
			))}
		</h2>
	);
};

export default AnimatedHeadline;
