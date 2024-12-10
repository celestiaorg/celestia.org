const meta = (seo = { title: null, description: null, image: null }) => {
  const defaultSeo = {
    title: "Celestia",
    description:
      "Celestia is the modular blockchain powering unstoppable applications with full-stack customizability.",
    image: "/meta/og-image.jpg",
  };

  const { title, description, image } = seo;
  const metaTitle = title ? `${title} | ${defaultSeo.title}` : defaultSeo.title;
  const metaDescription = description || defaultSeo.description;
  const metaImage = image || defaultSeo.image;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}${metaImage}`],
    },
  };
};

export default meta;
