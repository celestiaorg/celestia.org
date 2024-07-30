/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  output: "export", // TODO: use env var to set this
  images: { unoptimized: true },
  async redirects() {
    return redirects;
  },
};

const redirects = [
  {
    source: "/learn/first-principles/modular-blockchains-and-first-principles",
    destination: "/learn/beginners/modular-blockchains-and-first-principles",
    permanent: true,
  },
  {
    source:
      "/learn/values-of-modular-blockchains/modular-blockchains-are-user-first",
    destination: "/learn/beginners/modular-blockchains-are-user-first",
    permanent: true,
  },
  {
    source:
      "/learn/basics-of-modular-blockchains/modular-and-monolithic-blockchains/",
    destination: "/learn/intermediates/modular-and-monolithic-blockchains",
    permanent: true,
  },
  {
    source:
      "/learn/basics-of-modular-blockchains/benefits-of-modular-blockchains/",
    destination: "/learn/intermediates/benefits-of-modular-blockchains",
    permanent: true,
  },
  {
    source: "/learn/modular-architectures/the-modular-stack/",
    destination: "/learn/intermediates/the-modular-stack",
    permanent: true,
  },
  {
    source: "/learn/modular-software/the-differences-of-modular-software/",
    destination: "/learn/intermediates/the-differences-of-modular-software",
    permanent: true,
  },
  {
    source: "/learn/sovereign-rollups/an-introduction/",
    destination: "/learn/intermediates/sovereign-rollups-an-introduction",
    permanent: true,
  },
  {
    source: "/learn/sovereign-rollups/misconceptions/",
    destination: "/learn/intermediates/sovereign-rollups-misconceptions",
    permanent: true,
  },
  {
    source: "/learn/modular-settlement-layers/settlement-in-the-modular-stack/",
    destination: "/learn/intermediates/settlement-in-the-modular-stack",
    permanent: true,
  },
];

export default nextConfig;
