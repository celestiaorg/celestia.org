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

/**
 * SocialIcon - Renders the appropriate social media icon
 */
const SocialIcon = ({ icon }) => {
	const iconProps = { className: "w-[22px] h-[22px]" };

	switch (icon) {
		case "x":
			return <XTwitterSVG {...iconProps} />;
		case "discord":
			return <DiscordSVG {...iconProps} />;
		case "telegram":
			return <TelegramSVG {...iconProps} />;
		case "reddit":
			return <RedditSVG {...iconProps} />;
		case "github":
			return <GithubSVG {...iconProps} />;
		case "forum":
			return <ForumSVG {...iconProps} />;
		default:
			return null;
	}
};

/**
 * FooterNew - Light-themed footer matching prototype design
 */
const FooterNew = () => {
	const currentYear = new Date().getFullYear();
	const { showBackgroundImage } = useFooter();

	return (
		<footer className='footer-new-light relative overflow-hidden' data-header-theme='light'>
			{/* Footer content */}
			<div className='relative z-[2]'>
				<Container size='lg' padding={true}>
					{/* Top border */}
					<div className='border-t border-black/10 pt-14'>
						{/* Main content area */}
						<div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-16'>
							{/* Left side: Headline */}
							<div className='flex-1 max-w-[560px]'>
								<h2 className='font-slussen font-medium text-[28px] sm:text-[32px] lg:text-[40px] text-[#040207] leading-[1.2] tracking-[-2px]'>
									{footerHeadlineNew}
								</h2>
							</div>

							{/* Right side: Link columns */}
							<div className='flex gap-2 sm:gap-8 shrink-0'>
								{footerLinksNew.map((column, colIndex) => (
									<div key={colIndex} className='flex flex-col gap-2 w-[136px]'>
										{column.links.map((link, linkIndex) => (
											<Link
												key={linkIndex}
												href={link.url}
												className='font-slussen text-sm text-black/50 leading-5 hover:text-[#040207] transition-colors no-underline'
											>
												{link.name}
											</Link>
										))}
									</div>
								))}
							</div>
						</div>

						{/* Social Icons — centered */}
						<div className='flex items-center justify-center gap-6 mt-12'>
							{socialLinksNew.map((social, index) => (
								<Link
									key={index}
									href={social.url}
									className='opacity-40 hover:opacity-80 transition-opacity'
									aria-label={social.name}
								>
									<SocialIcon icon={social.icon} />
								</Link>
							))}
						</div>

						{/* Bottom: Legal links and copyright */}
						<div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 pb-6 font-slussenMono text-sm text-black/40'>
							<div className='flex items-center gap-4'>
								{legalLinksNew.map((link, index) => (
									<span key={index} className='flex items-center gap-4'>
										<Link href={link.url} className='text-black/40 hover:text-black/70 transition-colors no-underline'>
											{link.name}
										</Link>
										{index < legalLinksNew.length - 1 && (
											<span className='w-[2px] h-[2px] rounded-full bg-black/30' />
										)}
									</span>
								))}
							</div>
							<span className='flex items-center gap-4'>
								<span className='hidden sm:block w-[2px] h-[2px] rounded-full bg-black/30' />
								© {currentYear} Celestia Labs
							</span>
						</div>
					</div>
				</Container>
			</div>

			{/* Wave image at the bottom */}
			<div className='relative w-full pointer-events-none'>
				<img
					src='/images/components/footer/footer-wave.webp'
					alt=''
					className='w-full block'
				/>
			</div>
		</footer>
	);
};

export default FooterNew;
