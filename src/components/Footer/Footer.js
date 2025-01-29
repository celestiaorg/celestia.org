"use client";
import "./Footer.scss";
import { Body, Heading } from "@/macros/Copy";
import footerData from "@/data/global/footer";
import Container from "@/components/Container/Container";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import Link from "@/macros/Link/Link";
import Icon from "@/macros/Icons/Icon";
import ArrowLongSVG from "@/macros/SVGs/ArrowLongSVG";
import { isInternalLink } from "@/utils/isInternalLink";
// import Newsletter from "@/components/Newsletter/Newsletter";
import NewsletterSimple from "@/components/NewsletterSimple/NewsletterSimple";

const Footer = () => {
	const columns = footerData();
	const copywriteYear = new Date().getFullYear();
	return (
		<footer id={"footer"} className={`bg-black w-full rounded-tl-3xl rounded-tr-3xl py-5 text-white z-30 relative`}>
			<div className={`px-4`}>
				<div className={`h-[225px] md:h-[400px] block w-full rounded-2xl bg-white overflow-hidden z-0 relative`}>
					<VideoPlayer src={"/videos/footer.mp4"} />
				</div>
			</div>
			<div className={`px-4 mb-8`}>
				<Container
					size={`lg`}
					className={`pt-20 pb-6 px-8 lg:pt-[10.25rem] lg:px-[6.25rem] lg:pb-20 rounded-2xl z-10 relative frosted-container -mt-10 lg:-mt-[100px]`}
				>
					<div className='relative z-10 lg:flex'>
						<div className='w-full pb-12 lg:pb-0 lg:1/2'>
							<Heading size='lg' className={`mb-12`}>
								Build whatever with Celestia underneath
							</Heading>
							{/* <Newsletter /> */}
							<NewsletterSimple />
						</div>
						<div className={`flex flex-wrap lg:flex-nowrap w-full lg:1/2 lg:gap-6 lg:justify-end ml-auto mr-0`}>
							{columns.map((column, index) => {
								return (
									<ul
										key={index}
										className={`block ${
											index === columns.length - 1
												? "w-full flex flex-row justify-center lg:justify-end gap-4 order-last lg:order-none lg:flex-col lg:w-auto"
												: "w-1/2 lg:w-1/5"
										} ${index === columns.length - 1 ? "" : "mb-10 lg:mb-0"}`}
									>
										{column.links.map((link, linkIndex) => {
											const isInternal = isInternalLink(link.url);
											return (
												<li key={`col-${index}-link-${linkIndex}`}>
													<Link
														href={link.url}
														target={isInternal ? "_self" : "_blank"}
														rel={isInternal ? "" : "noopener noreferrer"}
														className={`flex items-center group mb-4`}
													>
														{link.icon ? (
															<Icon
																Icon={<link.icon dark />}
																hover
																HoverIcon={<link.icon dark className='opacity-50' />}
																size='sm'
																border={false}
																transparentBg
																direction='up'
															/>
														) : (
															<>
																<Body className={`mr-1`} size={"md"}>
																	{link.title}
																</Body>
																<Icon
																	className={"flex-grow-0 flex-shrink-0"}
																	border={false}
																	transparentBg
																	size={"xs"}
																	Icon={<div className={"block h-4 w-4"}></div>}
																	hover
																	HoverIcon={<ArrowLongSVG />}
																	direction={isInternal ? "down-right" : "up-right"}
																/>
															</>
														)}
													</Link>
												</li>
											);
										})}
									</ul>
								);
							})}
						</div>
					</div>
				</Container>
			</div>
			<Container size='lg' className={`lg:flex lg:justify-between px-4 lg:mb-3`}>
				<div className='w-full mb-2 text-center lg:text-left '>
					<Link href={"/privacy"} className={`inline-block mr-2`}>
						<Body size='sm'>Privacy Policy</Body>
					</Link>
					·
					<Link href={"/tos"} className={`inline-block ml-2`}>
						<Body size='sm'>Terms of Service</Body>
					</Link>
				</div>
				<div className={`w-full`}>
					<Body size='sm' className={`text-center lg:text-right`}>
						© {copywriteYear} Celestia Labs
					</Body>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
