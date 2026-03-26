"use client";
import Link from "@/macros/Link/Link";
import Container from "@/components/Container/Container";
import XTwitterSVG from "@/macros/SVGs/XTwitterSVG";
import DiscordSVG from "@/macros/SVGs/DiscordSVG";
import TelegramSVG from "@/macros/SVGs/TelegramSVG";
import RedditSVG from "@/macros/SVGs/RedditSVG";
import GithubSVG from "@/macros/SVGs/GithubSVG";
import ForumSVG from "@/macros/SVGs/ForumSVG";
import { footerLinksNew, socialLinksNew, legalLinksNew, footerHeadlineNew } from "./data";
import { useFooter } from "@/context/FooterContext";
import "./FooterNew.scss";

// Tab-specific footer themes (use-cases page)
const tabThemes = {
	agentic: {
		bg: "#0C1820",
		isDark: true,
		headlineColor: "#FDFCFF",
		linkColor: "rgba(255, 255, 255, 0.45)",
		linkHoverColor: "#fff",
		bottomColor: "rgba(255, 255, 255, 0.35)",
		dotColor: "rgba(255, 255, 255, 0.25)",
		borderColor: "rgba(255, 255, 255, 0.08)",
		waveBlend: "mix-blend-lighten",
		waveSrc: "/images/components/footer/footer-wave-dark.webp",
	},
	exchanges: {
		bg: "#F2EDE6",
		isDark: false,
		headlineColor: "#1a1a2e",
		linkColor: "rgba(0, 0, 0, 0.45)",
		linkHoverColor: "#1a1a2e",
		bottomColor: "rgba(0, 0, 0, 0.35)",
		dotColor: "rgba(0, 0, 0, 0.25)",
		borderColor: "rgba(0, 0, 0, 0.08)",
		waveBlend: "",
		waveSrc: "/images/components/footer/footer-wave.webp",
	},
	novel: {
		bg: "#F5F0FF",
		isDark: false,
		headlineColor: "#1a1a2e",
		linkColor: "rgba(0, 0, 0, 0.45)",
		linkHoverColor: "#1a1a2e",
		bottomColor: "rgba(0, 0, 0, 0.35)",
		dotColor: "rgba(0, 0, 0, 0.25)",
		borderColor: "rgba(0, 0, 0, 0.08)",
		waveBlend: "",
		waveSrc: "/images/components/footer/footer-wave.webp",
	},
};

const SocialIcon = ({ icon, dark }) => {
	const iconProps = { dark, className: "w-[22px] h-[22px]" };
	switch (icon) {
		case "x": return <XTwitterSVG {...iconProps} />;
		case "discord": return <DiscordSVG {...iconProps} />;
		case "telegram": return <TelegramSVG {...iconProps} />;
		case "reddit": return <RedditSVG {...iconProps} />;
		case "github": return <GithubSVG {...iconProps} />;
		case "forum": return <ForumSVG {...iconProps} />;
		default: return null;
	}
};

const FooterNew = () => {
	const currentYear = new Date().getFullYear();
	const { variant, footerTheme } = useFooter();

	// Determine the active theme
	const activeTabTheme = footerTheme && tabThemes[footerTheme] ? tabThemes[footerTheme] : null;
	const isDark = activeTabTheme ? activeTabTheme.isDark : variant === "dark";

	// Resolve all colors
	const bgColor = activeTabTheme?.bg || (isDark ? "#040207" : "#FDFCFF");
	const headlineColor = activeTabTheme?.headlineColor || (isDark ? "#FDFCFF" : "#040207");
	const linkColor = activeTabTheme?.linkColor || (isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)");
	const linkHoverColor = activeTabTheme?.linkHoverColor || (isDark ? "#fff" : "#040207");
	const bottomColor = activeTabTheme?.bottomColor || (isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)");
	const dotColor = activeTabTheme?.dotColor || (isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)");
	const borderColor = activeTabTheme?.borderColor || (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)");
	const waveSrc = activeTabTheme?.waveSrc || (isDark ? "/images/components/footer/footer-wave-dark.webp" : "/images/components/footer/footer-wave.webp");
	const waveBlend = activeTabTheme?.waveBlend || (isDark ? "mix-blend-lighten" : "");

	return (
		<footer
			className='relative overflow-hidden transition-colors duration-500'
			style={{ backgroundColor: bgColor }}
			data-header-theme={isDark ? "dark" : "light"}
		>
			<div className='relative z-[2]'>
				<Container size='lg' padding={true}>
					<div className='pt-14' style={{ borderTop: `1px solid ${borderColor}` }}>
						{/* Main content area */}
						<div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-16'>
							<div className='flex-1 max-w-[560px]'>
								<h2
									className='font-slussen font-medium text-[28px] sm:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-2px]'
									style={{ color: headlineColor }}
								>
									{footerHeadlineNew}
								</h2>
							</div>

							<div className='flex gap-2 sm:gap-8 shrink-0'>
								{footerLinksNew.map((column, colIndex) => (
									<div key={colIndex} className='flex flex-col gap-2 w-[136px]'>
										{column.links.map((link, linkIndex) => (
											<Link
												key={linkIndex}
												href={link.url}
												className='font-slussen text-sm leading-5 transition-colors no-underline'
												style={{ color: linkColor }}
												onMouseEnter={(e) => { e.currentTarget.style.color = linkHoverColor; }}
												onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
											>
												{link.name}
											</Link>
										))}
									</div>
								))}
							</div>
						</div>

						{/* Social Icons */}
						<div className='flex items-center justify-center gap-6 mt-12'>
							{socialLinksNew.map((social, index) => (
								<Link
									key={index}
									href={social.url}
									className={`transition-opacity ${isDark ? "opacity-40 hover:opacity-90" : "opacity-40 hover:opacity-80"}`}
									aria-label={social.name}
								>
									<SocialIcon icon={social.icon} dark={isDark} />
								</Link>
							))}
						</div>

						{/* Bottom */}
						<div
							className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 pb-6 font-slussenMono text-sm'
							style={{ color: bottomColor }}
						>
							<div className='flex items-center gap-4'>
								{legalLinksNew.map((link, index) => (
									<span key={index} className='flex items-center gap-4'>
										<Link href={link.url} className='transition-colors no-underline' style={{ color: bottomColor }}>
											{link.name}
										</Link>
										{index < legalLinksNew.length - 1 && (
											<span className='w-[2px] h-[2px] rounded-full' style={{ backgroundColor: dotColor }} />
										)}
									</span>
								))}
							</div>
							<span className='flex items-center gap-4'>
								<span className='hidden sm:block w-[2px] h-[2px] rounded-full' style={{ backgroundColor: dotColor }} />
								© {currentYear} Celestia Labs
							</span>
						</div>
					</div>
				</Container>
			</div>

			{/* Wave image */}
			<div className='relative w-full pointer-events-none'>
				<img src={waveSrc} alt='' className={`w-full block ${waveBlend}`} />
			</div>
		</footer>
	);
};

export default FooterNew;
