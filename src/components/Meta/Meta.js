const meta = (seo = { title: null, description: null, image: null }) => {
	const defaultSeo = {
		title: "Celestia",
		description: "Celestia is the modular blockchain powering unstoppable applications with full-stack customizability.",
		image: "/meta/og-image-default.jpg",
	};

	const { title, description, image } = seo;
	const metaTitle = title ? `${title} | ${defaultSeo.title}` : defaultSeo.title;
	const metaDescription = description || defaultSeo.description;
	const metaImage = image || defaultSeo.image;
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://celestia.org";

	return {
		title: metaTitle,
		description: metaDescription,
		metadataBase: new URL(siteUrl),
		openGraph: {
			images: [metaImage],
		},
	};
};

export default meta;
