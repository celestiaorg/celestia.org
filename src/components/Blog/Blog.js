const Blog = ({ posts }) => {
    console.log('posts', posts);
    return (
        <div>
            <h2>Blog</h2>
            {posts.map((post) => (
                <a key={post.id} href={post.url} className={`block border border-blue-600 mb-4 rounded-md`}>
                    <img src={post.feature_image} alt={post.title} width={200} height={200} />
                    <h3>{post.title}</h3>
                </a>
            ))}
        </div>
    );
}

export default Blog;