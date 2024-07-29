import fs from "fs";
import path from "path";
import matter from "gray-matter";

const glossaryDirectory = path.join(process.cwd(), "src/content/glossary");

export function getGlossaryTerms() {
  const fileNames = fs.readdirSync(glossaryDirectory);
  const allTermsData = fileNames.map((fileName) => {
    const fullPath = path.join(glossaryDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      content: content,
    };
  });

  return allTermsData;
}

const glossaryTerms = getGlossaryTerms();
export default glossaryTerms;
