const RichText = ({ children, className = "", size = "md" }) => {
	const sizeClasses = {
		xs: "text-xs [&>div>*]:leading-[1.2857]",
		sm: "text-sm [&>div>*]:leading-[1.2857]",
		md: "text-[1.0625rem] [&>div>*]:leading-[1.647]",
		lg: "text-[1.0625rem] [&>div>*]:leading-[2rem] lg:text-2xl lg:[&>div>*]:leading-[2rem]",
	};

	return (
		<div
			className={`
        ${sizeClasses[size]}
        ${className}
        text-pretty
        [&>div>p]:mb-4 [&>div>p:last-child]:mb-0
        [&>div>a]:text-blue-600 [&>div>a]:underline hover:[&>div>a]:text-blue-800
        [&>div>strong]:font-bold
        [&>div>em]:italic
        [&>div>ul]:list-disc [&>div>ul]:ml-6 [&>div>ul]:mb-4
        [&>div>ol]:list-decimal [&>div>ol]:ml-6 [&>div>ol]:mb-4
        [&>div>li]:mb-2 [&>div>li:last-child]:mb-0
        [&>div>h1]:text-4xl [&>div>h1]:font-bold [&>div>h1]:mb-6 [&>div>h1]:mt-8
        [&>div>h2]:text-3xl [&>div>h2]:font-bold [&>div>h2]:mb-5 [&>div>h2]:mt-7
        [&>div>h3]:text-2xl [&>div>h3]:font-bold [&>div>h3]:mb-4 [&>div>h3]:mt-6
        [&>div>h4]:text-xl [&>div>h4]:font-bold [&>div>h4]:mb-4 [&>div>h4]:mt-6
        [&>div>h5]:text-lg [&>div>h5]:font-bold [&>div>h5]:mb-3 [&>div>h5]:mt-5
        [&>div>h6]:text-base [&>div>h6]:font-bold [&>div>h6]:mb-3 [&>div>h6]:mt-5
        [&>div>blockquote]:border-l-4 [&>div>blockquote]:border-gray-300 [&>div>blockquote]:pl-4 [&>div>blockquote]:italic [&>div>blockquote]:my-6
        [&>div>hr]:my-8 [&>div>hr]:border-t [&>div>hr]:border-gray-300
        [&>div>code]:bg-gray-100 [&>div>code]:px-1 [&>div>code]:py-0.5 [&>div>code]:rounded
        [&>div>pre]:bg-gray-100 [&>div>pre]:p-4 [&>div>pre]:rounded [&>div>pre]:mb-4
        [&>div>img]:max-w-full [&>div>img]:h-auto [&>div>img]:rounded [&>div>img]:my-4
        [&>div>table]:w-full [&>div>table]:mb-4 [&>div>table]:border-collapse
        [&>div>th]:border [&>div>th]:border-gray-300 [&>div>th]:p-2 [&>div>th]:bg-gray-50
        [&>div>td]:border [&>div>td]:border-gray-300 [&>div>td]:p-2
      `}
		>
			{children}
		</div>
	);
};

export default RichText;
