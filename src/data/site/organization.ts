// Public website operator details from /privacy/#contact-us; not the decentralized network's address.
const organization = {
	"@type": "Organization",
	name: "Strange Loop Labs AG",
	url: "https://celestia.org/privacy/#contact-us",
	description: "The operator of celestia.org identified in the website privacy policy.",
	contactPoint: {
		"@type": "ContactPoint",
		contactType: "privacy inquiries",
		email: "privacy@celestia.org",
		url: "https://celestia.org/privacy/#contact-us",
	},
	address: {
		"@type": "PostalAddress",
		streetAddress: "Pradafant 11",
		postalCode: "9490",
		addressLocality: "Vaduz",
		addressCountry: "LI",
	},
};

export default organization;
