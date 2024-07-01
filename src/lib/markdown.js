import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getMarkdownData(subdir, id) {
    const fullPath = path.join(contentDirectory, subdir, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = remark()
        .use(html)
        .processSync(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

export function getAllMarkdownIds(subdir) {
    const directory = path.join(contentDirectory, subdir);
    const filenames = fs.readdirSync(directory);

    return filenames.map((filename) => {
        return {
            params: {
                id: filename.replace(/\.md$/, ''),
            },
        };
    });
}
