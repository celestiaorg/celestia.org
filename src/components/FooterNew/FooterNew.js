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
import "./FooterNew.scss";

/**
 * SocialIcon - Renders the appropriate social media icon
 */
const SocialIcon = ({ icon }) => {
	const iconProps = { dark: true, className: "w-[26px] h-[26px]" };

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
 * FooterNew - New footer component with background image
 *
 * Features:
 * - Dark background with background image
 * - Large headline
 * - Social media icons
 * - Three columns of links
 * - Legal links and copyright
 */
const FooterNew = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='footer-new pb-48' data-header-theme='dark'>
			<div className='footer-new-content'>
				<Container size='lg' padding={true}>
					{/* Top border */}
					<div className='border-t border-white/10 pt-[72px]'>
						{/* Main content area */}
						<div className='flex flex-col lg:flex-row justify-between gap-14 lg:gap-8'>
							{/* Left side: Headline + Social Icons */}
							<div className='flex flex-col gap-14 lg:max-w-[586px]'>
								{/* Headline */}
								<h2 className='font-untitledSans font-medium text-3xl sm:text-4xl lg:text-[56px] text-white leading-[1] lg:leading-[52px] tracking-[-1px] lg:tracking-[-3px]'>
									{footerHeadlineNew}
								</h2>

								{/* Social Icons */}
								<div className='flex items-center gap-6'>
									{socialLinksNew.map((social, index) => (
										<Link
											key={index}
											href={social.url}
											className='text-white hover:opacity-70 transition-opacity'
											aria-label={social.name}
										>
											<SocialIcon icon={social.icon} />
										</Link>
									))}
								</div>
							</div>

							{/* Right side: Link columns */}
							<div className='flex gap-2 sm:gap-8'>
								{footerLinksNew.map((column, colIndex) => (
									<div key={colIndex} className='flex flex-col gap-2 w-[136px]'>
										{column.links.map((link, linkIndex) => (
											<Link
												key={linkIndex}
												href={link.url}
												className='font-untitledSans text-sm text-white leading-6 hover:opacity-70 transition-opacity no-underline'
											>
												{link.name}
											</Link>
										))}
									</div>
								))}
							</div>
						</div>

						{/* Bottom: Legal links and copyright */}
						<div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-16 text-white font-untitledSans text-sm'>
							<div className='flex items-center gap-4'>
								{legalLinksNew.map((link, index) => (
									<span key={index} className='flex items-center gap-4'>
										<Link href={link.url} className='text-white hover:opacity-70 transition-opacity no-underline'>
											{link.name}
										</Link>
										{index < legalLinksNew.length - 1 && <span className='text-lg'>·</span>}
									</span>
								))}
							</div>
							<span className='leading-6'>© {currentYear} Celestia Labs</span>
						</div>
					</div>
				</Container>
			</div>
		</footer>
	);
};

export default FooterNew;
