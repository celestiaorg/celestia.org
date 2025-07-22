import Script from "next/script";

/**
 * FAQ Structured Data Component
 * Generates JSON-LD structured data for FAQ pages to enhance search visibility
 *
 * @param {Array} faqs - Array of FAQ objects with question and answer properties
 * @param {string} faqs[].question - The question text
 * @param {string} faqs[].answer - The answer text
 */
const FAQStructuredData = ({ faqs = [] }) => {
	if (!faqs || faqs.length === 0) return null;

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};

	return (
		<Script
			id='faq-structured-data'
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData),
			}}
		/>
	);
};

export default FAQStructuredData;
