import fs from 'fs';
import matter from 'gray-matter';

const getPostsMetadata = (basePath) => {
    const directory = `src/content/${basePath}/`;
    const files = fs.readdirSync(directory);
    const markdownPosts = files.filter(file => file.endsWith('.md'));

    const posts = markdownPosts.map((filename) => {
        const fullPath = `${directory}${filename}`;
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResukts = matter(fileContents);

        return {
            title: matterResukts.data.title,
            desctiption: matterResukts.data.description,
            slug: filename.replace(/\.md$/, ''),
        }
    })

    return posts;
}

export default getPostsMetadata;