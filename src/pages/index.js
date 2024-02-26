import React, { useState } from "react";
import ReactModal from "react-modal";
import Layout from "../components/layout";
import { Link } from "gatsby";

import "../scss/main.scss";

import { heroData } from "../datas/home/hero-section";

import { backers } from "../datas/home/backers";
import { FooterBoxes } from "../datas/home/content";
import { exploreCelestia } from "../datas/home/explore-celestia";
import { socialChannels } from "../datas/home/social-channels";

import BackersSection from "../components/sections/backers-sections";
import SignUp from "../components/modals/signUp";
import Image from "../components/imageComponent";
import CommunityItem from "../components/modules/community-item";

import { seoContent } from "../datas/home/seoContent";
import Seo from "../components/seo";
import HomeHeroSection from "../components/sections/home-hero-section";

import TwoColumnH2 from "../components/sections/two-column-h2";
import lottiAnim1 from "../anim/trans-anim-1.json";
import lottiAnim2 from "../anim/trans-anim-2.json";

const IndexPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType] = useState("");
	const enableBackers = false;

	// const handleModalOpen = (event) => {
	// 	setModalType(event.target.id);
	// 	setIsModalOpen(true);
	// 	document.body.style.overflow = "hidden";
	// };

	const handleModalClose = (event) => {
		setIsModalOpen(false);
		document.body.style.overflow = "unset";
	};

	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} ogTitle={seoContent.ogTitle} image={seoContent.image} />
			<div id='index-page' className='index-page'>
				<main>
					<HomeHeroSection heroData={heroData} />

					<div className='container'>
						<TwoColumnH2
							direction={"rtl"}
							title={"Build whatever"}
							text={`
								<p>Deploy fast. Launch a blockchain with leading Ethereum rollup frameworks or transform nearly any VM into your own sovereign chain.</p>
								<p>With Celestia underneath, a customizable blockchain becomes as easy to deploy as a smart contract.</p>
							`}
							image={"graph-ecosystem.png"}
							buttonPrimaryTitle={"Build modular"}
							buttonPrimaryUrl={"/build/"}
							buttonPrimaryClass={"plausible-event-name=Build_Modular_Button-Homepage--Build_whatever_section"}
							buttonSecondaryTitle={"Deploy"}
							buttonSecondaryUrl={"/build#deploy"}
							anim={lottiAnim2}
							animVersion={2}
						/>

						<TwoColumnH2
							className={"mt-5"}
							direction={"ltr"}
							title={"Access abundance"}
							text={`
								<p>Tap into the abundant throughput enabled by <a href='https://celestia.org/what-is-celestia/#what-is-data-availability-sampling' target='_blank' rel='noopener noreferrer'>data availability sampling (DAS)</a>, the first architecture that scales while maintaining verifiability for any user.</p>
								<p>Anyone can directly verify and contribute to Celestia by <a href='https://celestia.org/run-a-light-node/' target='_blank' rel='noopener noreferrer'>running a light node</a>.</p>
							`}
							image={"graph-scale.png"}
							buttonPrimaryTitle={"Learn Celestia"}
							buttonPrimaryUrl={"/what-is-celestia/"}
							anim={lottiAnim1}
							animVersion={1}
						/>

						<section id={`${heroData.buttons[1]?.url.replace(/\s+/g, "-").toLowerCase()}`} className='explore-celestia'>
							<div className='d-flex justify-content-center'>
								<h2 className='with-decor pb-2'>Explore Celestia</h2>
							</div>
							<div className='three-col-grid mt-4 mt-lg-5'>
								<div className='card-box'>
									<Link
										className='plausible-event-name=Explore_The_Ecosystem--Homepage-Explore_Celestia_Section link-box'
										to={exploreCelestia[0].link}
									>
										<div className='card-item'>
											<svg className='card-link' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 62 63' fill='none'>
												<g clipPath='url(#clip0_334_4082)'>
													<ellipse cx={31} cy='31.2451' rx={31} ry='31.2451' fill='white' />
													<path
														d='M24.2935 38.8448L37.7286 25.4098'
														stroke='#7B2BF9'
														strokeWidth='1.5'
														strokeLinecap='round'
													/>
													<path
														d='M38.1909 36.7061L38.5445 24.3317L26.1701 24.6852'
														stroke='#7B2BF9'
														strokeWidth='1.5'
														strokeLinecap='square'
														strokeLinejoin='bevel'
													/>
												</g>
												<defs>
													<clipPath id='clip0_334_4082'>
														<rect width={62} height='62.4901' fill='white' />
													</clipPath>
												</defs>
											</svg>
											<div className={"image-wrapper"}>
												<Image alt={exploreCelestia[0].title} height={"40px"} filename={exploreCelestia[0].image} />
											</div>
											<h3>{exploreCelestia[0].title}</h3>
											<p>{exploreCelestia[0].text} </p>
										</div>
									</Link>
								</div>
								<div className='card-box'>
									<Link
										className='plausible-event-name=Use_Tia--Homepage-Explore_Celestia_Section link-box'
										to={exploreCelestia[1].link}
									>
										<div className='card-item'>
											<svg className='card-link' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 62 63' fill='none'>
												<g clipPath='url(#clip0_334_4082)'>
													<ellipse cx={31} cy='31.2451' rx={31} ry='31.2451' fill='white' />
													<path
														d='M24.2935 38.8448L37.7286 25.4098'
														stroke='#7B2BF9'
														strokeWidth='1.5'
														strokeLinecap='round'
													/>
													<path
														d='M38.1909 36.7061L38.5445 24.3317L26.1701 24.6852'
														stroke='#7B2BF9'
														strokeWidth='1.5'
														strokeLinecap='square'
														strokeLinejoin='bevel'
													/>
												</g>
												<defs>
													<clipPath id='clip0_334_4082'>
														<rect width={62} height='62.4901' fill='white' />
													</clipPath>
												</defs>
											</svg>
											<div className={"image-wrapper"}>
												<Image alt={exploreCelestia[1].title} filename={exploreCelestia[1].image} />
											</div>
											<h3>{exploreCelestia[1].title}</h3>
											<p>{exploreCelestia[1].text} </p>
										</div>
									</Link>
								</div>
								<div className='card-box span-full'>
									<Link
										className='plausible-event-name=Run_A_Light_Node--Homepage-Explore_Celestia_Section link-box'
										to={exploreCelestia[2].link}
									>
										<div className='card-item'>
											<svg className='card-link' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 62 63' fill='none'>
												<g clipPath='url(#clip0_334_4082)'>
													<ellipse cx={31} cy='31.2451' rx={31} ry='31.2451' fill='white' />
													<path
														d='M24.2935 38.8448L37.7286 25.4098'
														stroke='#7B2BF9'
														strokeWidth='1.5'
														strokeLinecap='round'
													/>
													<path
														d='M38.1909 36.7061L38.5445 24.3317L26.1701 24.6852'
														stroke='#7B2BF9'
														strokeWidth='1.5'
														strokeLinecap='square'
														strokeLinejoin='bevel'
													/>
												</g>
												<defs>
													<clipPath id='clip0_334_4082'>
														<rect width={62} height='62.4901' fill='white' />
													</clipPath>
												</defs>
											</svg>
											<div className={"image-wrapper"}>
												<Image alt={exploreCelestia[2].title} filename={exploreCelestia[2].image} />
											</div>
											<div className='text-box'>
												<h3>{exploreCelestia[2].title}</h3>
												<p>{exploreCelestia[2].text} </p>
											</div>
										</div>
									</Link>
								</div>
							</div>
						</section>

						<section id='community' className='join-the-community'>
							<h2 className='with-decor pb-2'>Join the community</h2>
							<div className='subtitle'>Join the Celestia community online or hang out at one of the grassroots Modular Meetups</div>

							<div className='d-flex flex-column flex-lg-row scroll-box-main hide-scrollbar'>
								<div className='col-12 col-lg-auto pe-2'>
									<div className='social-wrapper'>
										<div className='social-box'>
											{socialChannels.items.map(function (item) {
												return (
													<CommunityItem
														className='icon-card-wrapper col-12 col-sm-6 col-md-4 col-lg-6'
														key={item.id}
														content={item}
													/>
												);
											})}
										</div>
										<div className='link-container'>
											<Link className='link' to={"/community/"}>
												<div className={"button button-external"}>
													Find more <i className={"icon-external-link"} />
												</div>
											</Link>
										</div>
									</div>
								</div>
								<div className='d-flex col-lg-12 mt-3 mt-lg-0 scroll-box'>
									<div className='col-12 col-lg-8 col-lg-3 col-xl-6 pe-2'>
										<div className={"community-image"}>
											<div className='image'>
												<Image alt={""} filename={"modular-summit-2023.jpg"} />
											</div>
											<div className='image-caption'>
												<div className='caption-box'>
													<div className='caption-text'>Modular Summit 2023</div>
												</div>
											</div>
										</div>
									</div>
									<div className='col-12 col-lg-8 col-lg-3 col-xl-6 pe-2'>
										<div className={"community-image"}>
											<div className='image'>
												<Image alt={""} filename={"modular-meetup.jpg"} />
											</div>
											<div className='image-caption'>
												<div className='caption-box'>
													<div className='caption-text'>Modular Meetup</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<BackersSection enableBackers={enableBackers} backers={backers} />
				</main>
				<ReactModal isOpen={isModalOpen}>
					<div className='inner'>
						<SignUp modalType={modalType} />
						<button className='close-button' onClick={handleModalClose}>
							<i className='icon-close' aria-label='close' />
						</button>
					</div>
				</ReactModal>
			</div>
		</Layout>
	);
};

export default IndexPage;
