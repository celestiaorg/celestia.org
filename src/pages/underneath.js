import React, { useState, useEffect, useRef } from "react";
import Image from "../components/imageComponent";
import Button from "../components/buttons/button";

import { heroData } from "../datas/underneath/hero-data";
import { fromMonolith } from "../datas/underneath/from-monolith";
import { dataAvailability } from "../datas/underneath/data-availability";
import { whyCelestia } from "../datas/underneath/why-celestia";
import { FooterBoxes2 } from "../datas/underneath/content";

import Layout from "../components/layout";

import { seoContent } from "../datas/underneath/seoContent";
import Seo from "../components/seo";

const CelestiaUnderneath = () => {
	const [isCard1Visible, setIsCard1Visible] = useState(false);
	const [isCard2Visible, setIsCard2Visible] = useState(false);
	const circleRefs = useRef([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.target.classList.contains("card-1")) {
							setIsCard1Visible(true);
						} else if (entry.target.classList.contains("card-2")) {
							setIsCard2Visible(true);
						}
					}
				});
			},
			{ threshold: 0.5 } // Adjust the threshold as needed
		);

		const card1Element = document.querySelector(".card-1");
		const card2Element = document.querySelector(".card-2");

		if (card1Element) {
			observer.observe(card1Element);
		}
		if (card2Element) {
			observer.observe(card2Element);
		}

		return () => {
			if (card1Element) {
				observer.unobserve(card1Element);
			}
			if (card2Element) {
				observer.unobserve(card2Element);
			}
		};
	}, []);

	useEffect(() => {
		const updateCircleRadius = () => {
			const viewportWidth = window.innerWidth;
			let radius = 3; // default radius

			if (viewportWidth < 576) {
				radius = 5;
			} else if (viewportWidth >= 1600) {
				radius = 2.2;
			} else {
				radius = 3;
			}

			circleRefs.current.forEach((circle) => {
				if (circle) {
					circle.setAttribute("r", radius);
				}
			});
		};

		updateCircleRadius();
		window.addEventListener("resize", updateCircleRadius);

		return () => {
			window.removeEventListener("resize", updateCircleRadius);
		};
	}, []);

	return (
		<Layout footerBoxes2={FooterBoxes2}>
			<Seo title={seoContent.title} description={seoContent.description} image={seoContent.image} />
			<div className={"celestia-underneath"}>
				<main>
					<section className='celestia-underneath-hero'>
						<div className={"container"}>
							<h1 className={"main"}>{heroData.title}</h1>
							<div className={"row justify-content-center justify-content-lg-between align-items-start"}>
								<div className={"text-box col-12 col-lg-5"}>
									{/* <h2 className={"subtitle"}>{heroData.subtitle}</h2> */}
									<div className={"text-slim"} dangerouslySetInnerHTML={{ __html: heroData.description }} />
								</div>
								<div id='animate-target' className={"image-box col-12 col-md-9 col-lg-6"}>
									{/* card 1 */}
									<div className={`card-1 fade-in-card-1 ${isCard1Visible ? "visible" : ""}`}>
										<div className='position-relative'>
											<div className={`dotted-line fade-in-line-1 ${isCard1Visible ? "visible" : ""}`}>
												<svg
													className='d-none d-md-block'
													width={136}
													height={81}
													viewBox='0 0 136 81'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path d='M0 0.5H119C127.837 0.5 135 7.66344 135 16.5V81' stroke='black' strokeDasharray='12 12' />
												</svg>
											</div>
											<div className='text-card'>
												<div className='text-card-wrapper'>
													<h3>{heroData.cards[0].title}</h3>
													<p>{heroData.cards[0].text}</p>
													<div className='link-wrapper'>
														<Button
															class={heroData.cards[0].button.class}
															type={heroData.cards[0].button.type}
															text={heroData.cards[0].button.text}
															url={heroData.cards[0].button.url}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* main image */}
									<div className='image-wrapper'>
										<div className={`dotted-line-1 fade-in-line-1 ${isCard1Visible ? "visible" : ""}`}>
											<svg
												className='d-md-none'
												width={2}
												height={140}
												viewBox='0 0 1 140'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<line x1='0.5' y1='2.18557e-08' x2='0.499994' y2={140} stroke='black' strokeDasharray='12 12' />
											</svg>
										</div>
										<Image alt={heroData.image.alt} filename={heroData.image.src} />
										<div className={`dotted-line-2 fade-in-line-2 ${isCard2Visible ? "visible" : ""}`}>
											<svg
												className='d-md-none'
												width={1}
												height={200}
												viewBox='0 0 1 200'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<line x1='0.5' y1='-2.18557e-08' x2='0.500009' y2={200} stroke='black' strokeDasharray='12 12' />
											</svg>
										</div>
									</div>

									{/* card 2 */}
									<div className={`card-2 fade-in-card-2 ${isCard2Visible ? "visible" : ""}`}>
										<div className='position-relative'>
											<div className={`dotted-line fade-in-line-2 ${isCard2Visible ? "visible" : ""}`}>
												<svg
													className='d-none d-lg-block'
													width={250}
													height={138}
													viewBox='0 0 250 138'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														d='M249.278 0.416315L60.1482 134.067C57.4474 135.975 54.2216 137 50.9146 137L0.500009 137.001'
														stroke='black'
														strokeDasharray='12 12'
													/>
												</svg>

												<svg
													className='d-none d-md-block d-lg-none'
													width={1}
													height={200}
													viewBox='0 0 1 200'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<line x1='0.5' y1='-2.18557e-08' x2='0.500009' y2={200} stroke='black' strokeDasharray='12 12' />
												</svg>
											</div>
											<div className='text-card'>
												<div className='text-card-wrapper'>
													<h3>{heroData.cards[1].title}</h3>
													<p>{heroData.cards[1].text}</p>
													<div className='link-wrapper'>
														<Button
															class={heroData.cards[1].button.class}
															type={heroData.cards[1].button.type}
															text={heroData.cards[1].button.text}
															url={heroData.cards[1].button.url}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className={"celestia-underneath-from-monolith"}>
						<div className={"container"}>
							<h2 className={"subtitle"}>{fromMonolith.title}</h2>
							<div className={"row"}>
								<div className={"col-12 col-lg-6 col-xl-4 pe-sm-4 pe-md-5 pb-4 pb-lg-0"}>
									<div className={"text"} dangerouslySetInnerHTML={{ __html: fromMonolith.text }} />
								</div>
								<div className={"col-12 col-lg-6 col-xl-8"}>
									<div className='scroll-wrapper'>
										<div className='image-wrapper'>
											<Image alt={fromMonolith.image.alt} filename={fromMonolith.image.src} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className={"celestia-underneath-da"}>
						<div className={"position-relative"}>
							<svg width='100%' height='100%' viewBox='0 0 1681 589' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									id='path0'
									d='M1 2.86024C157.206 184.234 329.993 264.691 553.395 264.691C776.796 264.691 851.845 264.691 1128.47 264.691C1405.11 264.691 1572.23 133.543 1680 1'
									stroke='url(#paint0_linear_4225_4178)'
									stroke-opacity='0.6'
								/>
								<circle ref={(el) => (circleRefs.current[0] = el)}>
									<animateMotion repeatCount='indefinite' dur='4s'>
										<mpath href='#path0' />
									</animateMotion>
									<animate
										attributeName='fill'
										values='rgba(123, 43, 249, 0.6); rgba(255, 255, 255, 0.6); rgba(248, 97, 218, 0.6)'
										dur='4s'
										repeatCount='indefinite'
									/>
								</circle>
								<path
									id='path1'
									d='M1 166.46C162.341 245.381 293.951 280.2 551.922 280.2C809.893 280.2 857.115 280.2 1129.08 280.2C1401.04 280.2 1527.4 239.811 1680 166.46'
									stroke='url(#paint1_linear_4225_4178)'
									stroke-opacity='0.6'
								/>
								<circle ref={(el) => (circleRefs.current[1] = el)}>
									<animateMotion repeatCount='indefinite' dur='4s' begin='2s'>
										<mpath href='#path1' />
									</animateMotion>
									<animate
										attributeName='fill'
										values='rgba(123, 43, 249, 0.6); rgba(255, 255, 255, 0.6); rgba(248, 97, 218, 0.6)'
										dur='4s'
										begin='2s'
										repeatCount='indefinite'
									/>
								</circle>
								<path id='path2' d='M1 294.779H1680' stroke='url(#paint2_linear_4225_4178)' stroke-opacity='0.6' />
								<circle ref={(el) => (circleRefs.current[2] = el)}>
									<animateMotion repeatCount='indefinite' dur='4s' begin='1s'>
										<mpath href='#path2' />
									</animateMotion>
									<animate
										attributeName='fill'
										values='rgba(123, 43, 249, 0.6); rgba(255, 255, 255, 0.6); rgba(248, 97, 218, 0.6)'
										dur='4s'
										begin='1s'
										repeatCount='indefinite'
									/>
								</circle>
								<path
									id='path3'
									d='M1 422.636C162.341 343.715 293.951 308.896 551.922 308.896C809.893 308.896 857.115 308.896 1129.08 308.896C1401.04 308.896 1527.4 349.286 1680 422.636'
									stroke='url(#paint3_linear_4225_4178)'
									stroke-opacity='0.6'
								/>
								<circle ref={(el) => (circleRefs.current[3] = el)}>
									<animateMotion repeatCount='indefinite' dur='4s' begin='3s'>
										<mpath href='#path3' />
									</animateMotion>
									<animate
										attributeName='fill'
										values='rgba(123, 43, 249, 0.6); rgba(255, 255, 255, 0.6); rgba(248, 97, 218, 0.6)'
										dur='4s'
										begin='3s'
										repeatCount='indefinite'
									/>
								</circle>
								<path
									id='path4'
									d='M1 586.699C157.206 405.325 329.993 324.869 553.395 324.869C776.796 324.869 851.845 324.869 1128.47 324.869C1405.11 324.869 1572.23 456.017 1680 588.56'
									stroke='url(#paint4_linear_4225_4178)'
									stroke-opacity='0.6'
								/>
								<circle ref={(el) => (circleRefs.current[4] = el)}>
									<animateMotion repeatCount='indefinite' dur='4s' begin='1s'>
										<mpath href='#path4' />
									</animateMotion>
									<animate
										attributeName='fill'
										values='rgba(123, 43, 249, 0.6); rgba(255, 255, 255, 0.6); rgba(248, 97, 218, 0.6)'
										dur='4s'
										begin='1s'
										repeatCount='indefinite'
									/>
								</circle>
								<path
									id='path5'
									d='M1 422.636C162.341 343.715 293.951 308.896 551.922 308.896C809.893 308.896 857.115 308.896 1129.08 308.896C1401.04 308.896 1527.4 349.286 1680 422.636'
									stroke='url(#paint3_linear_4225_4178)'
									stroke-opacity='0.6'
								/>
								<circle ref={(el) => (circleRefs.current[5] = el)}>
									<animateMotion repeatCount='indefinite' dur='4s' begin='4s'>
										<mpath href='#path5' />
									</animateMotion>
									<animate
										attributeName='fill'
										values='rgba(123, 43, 249, 0.6); rgba(255, 255, 255, 0.6); rgba(248, 97, 218, 0.6)'
										dur='4s'
										begin='4s'
										repeatCount='indefinite'
									/>
								</circle>
								<defs>
									<linearGradient id='paint0_linear_4225_4178' x1='1' y1='1' x2='1680' y2='0.999999' gradientUnits='userSpaceOnUse'>
										<stop stop-color='#7B2BF9' />
										<stop offset='0.5' stop-color='white' />
										<stop offset='1' stop-color='#F861DA' />
									</linearGradient>
									<linearGradient
										id='paint1_linear_4225_4178'
										x1='1'
										y1='166.46'
										x2='1680'
										y2='166.46'
										gradientUnits='userSpaceOnUse'
									>
										<stop stop-color='#7B2BF9' />
										<stop offset='0.5' stop-color='white' />
										<stop offset='1' stop-color='#F861DA' />
									</linearGradient>
									<linearGradient
										id='paint2_linear_4225_4178'
										x1='1'
										y1='294.779'
										x2='1680'
										y2='294.779'
										gradientUnits='userSpaceOnUse'
									>
										<stop stop-color='#7B2BF9' />
										<stop offset='0.5' stop-color='white' />
										<stop offset='1' stop-color='#F861DA' />
									</linearGradient>
									<linearGradient
										id='paint3_linear_4225_4178'
										x1='1'
										y1='308.896'
										x2='1680'
										y2='308.896'
										gradientUnits='userSpaceOnUse'
									>
										<stop stop-color='#7B2BF9' />
										<stop offset='0.5' stop-color='white' />
										<stop offset='1' stop-color='#F861DA' />
									</linearGradient>
									<linearGradient
										id='paint4_linear_4225_4178'
										x1='1'
										y1='324.869'
										x2='1680'
										y2='324.869'
										gradientUnits='userSpaceOnUse'
									>
										<stop stop-color='#7B2BF9' />
										<stop offset='0.5' stop-color='white' />
										<stop offset='1' stop-color='#F861DA' />
									</linearGradient>
								</defs>
							</svg>
							<h2 className={"subtitle"}>{dataAvailability.title}</h2>
						</div>
						<div className={"container"}>
							<div className={"row justify-content-center align-items-center"}>
								<div className={"image-box col-12 col-lg-5"}>
									<div className='image-wrapper'>
										<Image alt={dataAvailability.image.alt} filename={dataAvailability.image.src} />
									</div>
								</div>
								<div className={"text-box col-12 col-lg-5"}>
									<div dangerouslySetInnerHTML={{ __html: dataAvailability.text }} />
									<Button
										class={dataAvailability.button.class}
										type={dataAvailability.button.type}
										text={dataAvailability.button.text}
										url={dataAvailability.button.url}
									/>
								</div>
							</div>
						</div>
					</section>

					<section className={"celestia-underneath-why-celestia"}>
						<div className={"container"}>
							<h2 className={"subtitle"}>{whyCelestia.title}</h2>
							<div className={"row"}>
								<div className={"col-12 col-lg-6 mb-4 mb-lg-0"}>
									<div className='grid-item'>
										<div className='bla'>
											<div className='image-wrapper'>
												<Image alt={whyCelestia.content[0].image.alt} filename={whyCelestia.content[0].image.src} />
											</div>
										</div>
										<h4 className='title'>{whyCelestia.content[0].title}</h4>
										<div dangerouslySetInnerHTML={{ __html: whyCelestia.content[0].text }} />
									</div>
								</div>
								<div className={"col-12 col-lg-6"}>
									<div className='grid-item'>
										<div className='image-wrapper'>
											<Image alt={whyCelestia.content[1].image.alt} filename={whyCelestia.content[1].image.src} />
										</div>
										<h4 className='title'>{whyCelestia.content[1].title}</h4>
										<div dangerouslySetInnerHTML={{ __html: whyCelestia.content[1].text }} />
									</div>
								</div>
								<div className={"col-12 pt-4 px-4"}>
									<div className='grid-item horizontal row justify-content-center align-items-center'>
										<div className='col-12 col-lg-6 pe-0 pe-lg-5'>
											<div className='image-wrapper'>
												<Image alt={whyCelestia.content[2].image.alt} filename={whyCelestia.content[2].image.src} />
											</div>
										</div>
										<div className='col-12 col-lg-6 ps-0 ps-lg-5'>
											<div>
												<h4 className='title'>{whyCelestia.content[2].title}</h4>
												<div dangerouslySetInnerHTML={{ __html: whyCelestia.content[2].text }} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* 
					<section className={"join-the-network"}>
						<div className={"container"}>
							<div className={"row justify-content-center align-items-center"}>
								<h2 className='with-decor'>{joinTheNetwork.title}</h2>
								{joinTheNetwork.description && <div className={"description"}>{joinTheNetwork.description}</div>}
								<div className={"row gx-3 gy-3 pt-lg-4 pb-3"}>
									{joinTheNetwork.items.map(function (item) {
										return (
											<IconCard
												className='icon-card-wrapper col-12 col-md min-width-33'
												key={item.id}
												content={item}
												variant={"anchor no-image"}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</section>

					<section className={"light-nodes"}>
						<div className={"container"}>
							<div className={"row justify-content-center align-items-center"}>
								<div className='d-lg-flex justify-content-between align-items-center'>
									<h2 className='mb-3 mb-lg-0 with-decor'>{lightNode.title}</h2>
									<Button
										class={lightNode.button.class}
										type={lightNode.button.type}
										text={lightNode.button.text}
										url={lightNode.button.url}
									/>
								</div>
								{lightNode.description && <div className={"description"}>{lightNode.description}</div>}
								<div className={"row gx-3 gy-3 pt-4 pb-3"}>
									{lightNode.items.map(function (item) {
										return (
											<IconCard
												className='icon-card-wrapper col-12 col-md min-width-33'
												key={item.id}
												content={item}
												variant={"anchor no-image"}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</section> */}
				</main>
			</div>
		</Layout>
	);
};

export default CelestiaUnderneath;
