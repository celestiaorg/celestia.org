import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getPagesMetadata = (directory = 'src/content/pages/') => {
    const getAllFiles = (dirPath, arrayOfFiles) => {
        const files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        files.forEach((file) => {
            if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
                arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
            } else if (file.endsWith('.md')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        });

        return arrayOfFiles;
    };

    const files = getAllFiles(directory);

    const posts = files.map((fullPath) => {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResults = matter(fileContents);

        return {
            title: matterResults.data.title,
            description: matterResults.data.description,
            slug: fullPath.replace(`${directory}`, '').replace(/\.md$/, '').split(path.sep),
        };
    });

    return posts;
};

export default getPagesMetadata;