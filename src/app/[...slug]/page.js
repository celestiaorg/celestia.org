import getPostsMetadata from "@/lib/getPostsMetadata"
import getPagesMetadata from "@/lib/getPagesMetadata";
import Markdown from "markdown-to-jsx"
import fs from 'fs';
import matter from "gray-matter";

const getPageContent = (slug) => {
    const directory = `src/content/pages/`;
    const fullPath = `${directory}${slug}.md`;
    console.log('fullPath', fullPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResults = matter(fileContents);

    return matterResults;
}

const SlugPage = (props) => {
    const { slug } = props.params
    const slugPath = slug.join('/')
    console.log('slugPath', slugPath)
    const post = getPageContent(slugPath)
    // const post = getGlossaryContent(slug)

    return (
        <div>
            <h1>All other markdown pages</h1>
            <Markdown>{post.content}</Markdown>
        </div>
    )
}

export function generateStaticParams() {
    const pages = getPagesMetadata()
    return pages.map((page) => ({ slug: page.slug }))

}

export default SlugPage