import meta from "@/components/Meta/Meta";
import seo from "@/data/glossary/seo";

export const metadata = meta(seo);

export default async function Glossary({ children }) {
  return children;
}
