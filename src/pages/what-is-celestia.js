import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { FooterBoxes2 } from "../datas/what-is-celestia/content";
import { tableOfContent } from "../datas/what-is-celestia/toc";
import { StaticImage } from "gatsby-plugin-image";
import { AnchorLink } from "gatsby-plugin-anchor-links";

import { seoContent } from "../datas/what-is-celestia/seoContent";
import Seo from "../components/seo";

import celestia_tell_me_about_celestia from "../images/what-is-celestia/celestia-tell-me-about-celestia.png";
import data_availability_sampling from "../images/what-is-celestia/celestia-data-availability-sampling.png";
import celestia_data_availability from "../images/what-is-celestia/celestia-data-availability.png";
import celestia_what_is_modular from "../images/what-is-celestia/celestia-what-is-modular.png";

const WhatIsCelestia = () => {
	const [showTocCategories, setShowTocCategories] = useState(false);
	const [selectedItem, setSelectedItem] = useState(0);
	const sectionRefs = useRef([]);
	// const handleItemClick = (index) => {
	// 	setSelectedItem(index);
	// };

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionIndex = sectionRefs.current.indexOf(entry.target);
						setSelectedItem(sectionIndex);
					}
				});
			},
			{ rootMargin: "-30% 0px -40% 0px", threshold: 0 }
		);

		const currentRefs = sectionRefs.current;
		currentRefs.forEach((ref) => observer.observe(ref));

		return () => {
			if (currentRefs) {
				currentRefs.forEach((ref) => {
					if (ref instanceof Element) {
						observer.unobserve(ref);
					}
				});
			}
		};
	}, []);

	return (
		<Layout footerBoxes2={FooterBoxes2}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div className={"what-is-celestia"}>
				<main>
					<div className={"container"}>
						<section
							className={"hero-section"}
							ref={(el) => (sectionRefs.current[0] = el)}
							id={`${tableOfContent[0].id.replace(/\s+/g, "-").toLowerCase()}`}
						>
							<h1>What is Celestia?</h1>
						</section>
						<div className={"row sticky-row"}>
							<div className={"sticky-container col-lg-3"}>
								<div className={"toc-2"}>
									<div
										className={`mobile-toc ${showTocCategories && "show"}`}
										onClick={() => setShowTocCategories(!showTocCategories)}
										onKeyDown={(event) => {
											if (event.key === "Enter") {
												setShowTocCategories(!showTocCategories);
											}
										}}
										tabIndex={0}
										role='button'
									>
										Jump to...
										<div className='dropdown-button'>
											<svg id={"mobile-category"} fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 11'>
												<path d='m1 4 4.5 4L10 4' stroke='#000' strokeWidth='1.5' strokeLinecap='round' />
											</svg>
										</div>
									</div>
									<div className={"toc-inner"}>
										<div className={"toc-title"}>Table of Contents</div>
										<div className={`category-menu ${showTocCategories && "show"}`}>
											<div className={"toc-item"}>
												{tableOfContent.map((item, index) => {
													return (
														<div
															key={index}
															className={selectedItem === index ? "selected" : ""}
															// onClick={() => handleItemClick(index)}
															// onKeyDown={(event) => {
															// 	if (event.key === "Enter") {
															// 		handleItemClick(index);
															// 	}
															// }}
															tabIndex={0}
															role='button'
														>
															<AnchorLink
																to={`/what-is-celestia/#${item.id.replace(/\s+/g, "-").toLowerCase()}`}
																stripHash
															>
																{item.value}
															</AnchorLink>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-lg-9 ps-lg-4 p-xl-5 pt-xl-0'>
								<section className={"tell-me-about-celestia"}>
									<div className={"row justify-content-between align-items-center"}>
										<div className={"col-12 col-lg-6 mb-2 mb-lg-0"}>
											<p>
												Celestia is a modular data availability (DA) network that securely scales with the number of users,
												making it easy for anyone to launch their own blockchain.
											</p>
											<p>
												Rollups and L2s use Celestia as a network for publishing and making transaction data available for
												anyone to download. For them, Celestia provides high-throughput DA that can be verified easily with a
												light node.
											</p>
											<p>
												And by making the blockchain stack modular, anyone can launch their own blockchain without needing a
												validator set.
											</p>
										</div>
										<div className={"order-lg-1 image-box--different col-12 col-lg-6"}>
											<div className='image-wrapper'>
												<img className='img' style={{ width: `100%` }} src={celestia_tell_me_about_celestia} alt={""} />
											</div>
										</div>
									</div>
								</section>

								<section
									ref={(el) => (sectionRefs.current[1] = el)}
									className={"whats-it-like-to-build-on-Celestia"}
									id={`${tableOfContent[1].id.replace(/\s+/g, "-").toLowerCase()}`}
								>
									<div className={"row mb-3 mb-md-5 justify-content-center"}>
										<h2 className='title'>Why Celestia?</h2>
									</div>
									<div className='row'>
										<div className='col-z-index order-2 order-md-1 col-sm-12 col-md-5 col-lg-6 col-xl-5'>
											<div className={"row align-items-center gy-3"}>
												<div className={"col-12"}>
													<div className={"why-use-card"}>
														<h3 className={"why-use-title"}>Deploy fast</h3>
														<p className={"why-use-text"}>
															Deploy your own customizable blockchain as easily as a smart contract.
														</p>
													</div>
												</div>
												<div className={"col-12"}>
													<div className={"why-use-card"}>
														<h3 className={"why-use-title"}>Use any VM</h3>
														<p className={"why-use-text"}>
															Transform nearly any virtual machine into your own sovereign chain.
														</p>
													</div>
												</div>
												<div className={"col-12"}>
													<div className={"why-use-card"}>
														<h3 className={"why-use-title"}>Access abundant throughput</h3>
														<p className={"why-use-text"}>
															Unlock dynamic throughput that scales with the number of users.
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className={"image-box--why order-1 order-md-2 col-sm-12 col-md-7 col-lg-6 col-xl-7"}>
											<StaticImage
												className={"d-md-none d-block"}
												quality={100}
												placeholder={"none"}
												src='../images/what-is-celestia/celestia-infographics-paths-mobile.png'
											/>
											<StaticImage
												className={"d-none d-md-block"}
												quality={100}
												placeholder={"none"}
												src='../images/what-is-celestia/celestia-infographics-paths.png'
											/>
										</div>
									</div>
									<div className='link-wrapper'>
										<a className='link' href='https://celestia.org/build/' target='_blank' rel='noreferrer'>
											Build whatever
											<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
												<path
													stroke='#7B2BF9'
													stroke-linecap='square'
													stroke-width='1.5'
													d='M3.61218 12.0721L11.0761 4.60823'
												/>
												<path
													stroke='#7B2BF9'
													stroke-linecap='square'
													stroke-linejoin='bevel'
													stroke-width='1.5'
													d='M11.5254 11.0752V4.00413H4.45432'
												/>
											</svg>
										</a>
									</div>
								</section>

								<section
									ref={(el) => (sectionRefs.current[2] = el)}
									className={"what-is-data-availability"}
									id={`${tableOfContent[2].id.replace(/\s+/g, "-").toLowerCase()}`}
								>
									<div className={"row justify-content-between align-items-center"}>
										<div className={"image-box--analogy order-2 order-lg-1 col-12 col-lg-6"}>
											<div className='image-wrapper'>
												<img className='img' style={{ width: `100%` }} src={celestia_data_availability} alt={""} />
											</div>
										</div>
										<div className={"col-12 order-1 order-lg-2 col-lg-6 mb-3 mb-lg-0"}>
											<h2 className='title'>What is data availability and why does it matter?</h2>
											<p>
												Data availability answers the question, has the data for this blockchain been published? It is
												critical to the security of any blockchain because it ensures that anyone can inspect the ledger of
												transactions and verify it.
											</p>
											<p>Users of a monolithic blockchain usually download all the data to check that it is available.</p>
											<p>
												As blocks get bigger, it becomes impractical for normal users to download all the data meaning that
												they can’t verify the chain. Modular chains solve this problem by making it possible for users to
												verify very large blocks using a technology called data availability sampling.
											</p>
										</div>
									</div>
								</section>

								<section
									ref={(el) => (sectionRefs.current[3] = el)}
									className={"data-availability-sampling"}
									id={`${tableOfContent[3].id.replace(/\s+/g, "-").toLowerCase()}`}
								>
									<h2 className='title'>Now what's data availability sampling?</h2>
									<div className={"image-box--different"}>
										<div className='image-wrapper'>
											<img className='img' style={{ width: `100%` }} src={data_availability_sampling} alt={""} />
										</div>
									</div>
									<p>
										Data availability sampling (DAS) is the new primitive that enables Celestia light nodes to verify DA
										efficiently. Instead of downloading all data, light nodes only download a tiny portion of each block.
									</p>
									<p>
										Importantly, DAS allows Celestia to scale with the number of users (light nodes). So, as the light node
										network grows over time, Celestia can scale to the data throughput needed for millions of rollups without
										compromising on security for end users.
									</p>
								</section>

								<section
									ref={(el) => (sectionRefs.current[4] = el)}
									className={"what-is-a-modular-blockchain"}
									id={`${tableOfContent[4].id.replace(/\s+/g, "-").toLowerCase()}`}
								>
									<h2 className='title'>And what is a modular blockchain?</h2>
									<div className={"image-box--different"}>
										<div className='image-wrapper'>
											<img className='img' style={{ width: `100%` }} src={celestia_what_is_modular} alt={""} />
										</div>
									</div>
									<p>
										Modular blockchains are a new paradigm in blockchain design. Instead of one blockchain doing everything,
										modular blockchains specialize and optimize to perform a given function. This specialization provides
										breakthroughs in scalability, flexibility, and interoperability, enabling developers to build blockchain
										applications for mass adoption.
									</p>
								</section>
								<section
									ref={(el) => (sectionRefs.current[5] = el)}
									className={"start-using-celestia"}
									id={`${tableOfContent[5].id.replace(/\s+/g, "-").toLowerCase()}`}
								/>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Layout>
	);
};

export default WhatIsCelestia;
