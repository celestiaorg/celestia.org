const RichText = ({ children, className = "", size = "md" }) => {
	const sizeClasses = {
		xs: "text-xs [&_p]:leading-[1.2857]",
		sm: "text-sm [&_p]:leading-[1.2857]",
		md: "text-[1.0625rem] [&_p]:leading-[1.647]",
		lg: "text-[1.0625rem] [&_p]:leading-[2rem] lg:text-2xl lg:[&_p]:leading-[2rem]",
	};

	return (
		<div
			className={`
        ${sizeClasses[size]}
        ${className}
        text-pretty
        [&_p]:mb-4 [&_p:last-child]:mb-0
        [&_a]:text-[#7b2bf9] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-1 hover:[&_a]:text-[#995DF9] hover:[&_a]:decoration-2 [&_a]:transition-all
        [&_strong]:font-bold
        [&_em]:italic
        [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
        [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
        [&_li]:mb-2 [&_li:last-child]:mb-0
        [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-8
        [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-5 [&_h2]:mt-7
        [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-4 [&_h3]:mt-6
        [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mb-4 [&_h4]:mt-6
        [&_h5]:text-lg [&_h5]:font-bold [&_h5]:mb-3 [&_h5]:mt-5
        [&_h6]:text-base [&_h6]:font-bold [&_h6]:mb-3 [&_h6]:mt-5
        [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6
        [&_hr]:my-8 [&_hr]:border-t [&_hr]:border-gray-300
        [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded
        [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:mb-4
        [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded [&_img]:my-4
        [&_table]:w-full [&_table]:mb-4 [&_table]:border-collapse
        [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-50
        [&_td]:border [&_td]:border-gray-300 [&_td]:p-2
      `}
		>
			{children}
		</div>
	);
};

export default RichText;
