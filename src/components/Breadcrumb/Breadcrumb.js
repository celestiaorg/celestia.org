import Link from "next/link";
import Script from "next/script";

/**
 * Breadcrumb Component with SEO Structured Data
 *
 * @param {Array} items - Array of breadcrumb items
 * @param {string} items[].name - Display name
 * @param {string} items[].url - URL (optional for last item)
 * @param {string} className - Additional CSS classes
 */
const Breadcrumb = ({ items = [], className = "" }) => {
	if (!items || items.length === 0) return null;

	// Generate structured data for breadcrumbs
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			...(item.url && { item: item.url }),
		})),
	};

	return (
		<>
			<nav aria-label='Breadcrumb' className={`breadcrumb ${className}`}>
				<ol className='flex items-center space-x-2 text-sm text-gray-600'>
					{items.map((item, index) => (
						<li key={index} className='flex items-center'>
							{index > 0 && <span className='mx-2 text-gray-400'>/</span>}
							{item.url && index < items.length - 1 ? (
								<Link href={item.url} className='hover:text-purple-600 transition-colors'>
									{item.name}
								</Link>
							) : (
								<span className={index === items.length - 1 ? "text-gray-900 font-medium" : ""}>{item.name}</span>
							)}
						</li>
					))}
				</ol>
			</nav>

			<Script
				id='breadcrumb-structured-data'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
		</>
	);
};

export default Breadcrumb;
