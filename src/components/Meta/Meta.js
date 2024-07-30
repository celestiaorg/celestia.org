const meta = (seo = { title: null, description: null, image: null }) => {
  const defaultSeo = {
    title: "Celestia",
    description:
      "Celestia is a modular data availability network that securely scales with the number of users, making it easy for anyone to launch their own blockchain.",
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
