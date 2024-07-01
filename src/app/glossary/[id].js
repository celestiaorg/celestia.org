import { getMarkdownData, getAllMarkdownIds } from '@/lib/markdown';

export default function Glossary({ postData }) {
    return (
        <div>
            <h1>{postData.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
    );
}

export async function getStaticPaths() {
    const paths = getAllMarkdownIds('glossary');
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = getMarkdownData('glossary', params.id);
    return {
        props: {
            postData,
        },
    };
}
