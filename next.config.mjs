/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // output: "export", // TODO: use env var to set this
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
];

export default nextConfig;
