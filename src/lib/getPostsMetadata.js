import fs from "fs";
import matter from "gray-matter";

export const getPostsMetadata = (basePath) => {
	const directory = `src/content/${basePath}/`;

	// Check if the directory exists
	if (!fs.existsSync(directory)) {
		console.error(`Directory not found: ${directory}`);
		return [];
	}

	const files = fs.readdirSync(directory);
	const markdownPosts = files.filter((file) => file.endsWith(".md"));

	const posts = markdownPosts.map((filename) => {
		const fullPath = `${directory}${filename}`;
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const matterResults = matter(fileContents);

		return {
			title: matterResults.data.title,
			description: matterResults.data.description,
			content: matterResults.content,
			slug: filename.replace(/\.md$/, ""),
		};
	});

	return posts;
};

export const getPostMetadata = (basePath, fileName) => {
	const filePath = `src/content/${basePath}/${fileName}`;

	// Check if the file exists
	if (!fs.existsSync(filePath)) {
		console.error(`File not found: ${filePath}`);
		return null;
	}

	// Check if the file is a markdown file
	if (!fileName.endsWith(".md")) {
		console.error(`File is not a markdown file: ${filePath}`);
		return null;
	}

	const fileContents = fs.readFileSync(filePath, "utf8");
	const matterResults = matter(fileContents);

	return {
		title: matterResults.data.title,
		description: matterResults.data.description,
		content: matterResults.content,
		slug: fileName.replace(/\.md$/, ""),
	};
};
