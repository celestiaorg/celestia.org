import * as React from "react";

import { heroData } from "../datas/what-is-tia/hero-data";
import { role } from "../datas/what-is-tia/role";
import { wallets } from "../datas/what-is-tia/wallets";
import { FooterBoxes } from "../datas/what-is-tia/content";
import Button from "../components/buttons/button";

import Layout from "../components/layout";
import { AnchorLink } from "gatsby-plugin-anchor-links";

import { seoContent } from "../datas/what-is-tia/seoContent";
import Seo from "../components/seo";
import Image from "../components/imageComponent";

import image1 from "../images/what-is-tia/what-is-tia-custody-1.png";

const WhatIsTIA = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} image={seoContent.image} />
			<div className={"what-is-tia"}>
				<main>
					<section className='hero'>
						<div className={"container"}>
							<h1 className={"main mb-3 mb-md-4"}>{heroData.title}</h1>
							<div className={"main-text row"}>
								<div className={"col-auto"}>
									<div className={"subtitle"} dangerouslySetInnerHTML={{ __html: heroData.text }} />
									<a
										href={`${heroData.buttons[0].url}`}
										className={`mb-3 button button-${heroData.buttons[0]?.class}`}
										target='_blank'
										rel='noreferrer'
									>
										{heroData.buttons[0].text}
									</a>
									<AnchorLink
										to={`/what-is-tia#${heroData.buttons[1].url}`}
										className={"mb-3 button button-" + heroData.buttons[1].class}
										stripHash
									>
										{heroData.buttons[1].text}
									</AnchorLink>
								</div>
							</div>
						</div>
					</section>

					<section className='tia-role'>
						<div className={"container"}>
							<div className={"row flex-wrap align-items-center justify-content-between"}>
								<h2>{role.title}</h2>
								<div className='role-items'>
									<div className='role-card'>
										<div className='role-image-wrapper'>
											<Image alt={role.items[0].title} filename={role.items[0].image} />
										</div>
										<h3 className='role-card-title'>{role.items[0].title}</h3>
										<p className='role-card-text'>{role.items[0].text}</p>
										{role.items[0].links &&
											role.items[0].links.map(function (item) {
												return (
													<div className='link-wrapper'>
														<Button type={item.type} class={"external"} text={item.text} url={item.url} />
													</div>
												);
											})}
									</div>

									<div className='role-card'>
										<div className='role-image-wrapper'>
											<Image alt={role.items[1].title} filename={role.items[1].image} />
										</div>
										<h3 className='role-card-title'>{role.items[1].title}</h3>
										<p className='role-card-text'>{role.items[1].text}</p>
										{role.items[1].links &&
											role.items[1].links.map(function (item) {
												return (
													<div className='link-wrapper'>
														<Button type={item.type} class={"external"} text={item.text} url={item.url} />
													</div>
												);
											})}
									</div>

									<div className='role-card'>
										<div className='role-image-wrapper'>
											<Image alt={role.items[2].title} filename={role.items[2].image} />
										</div>
										<h3 className='role-card-title'>{role.items[2].title}</h3>
										<p className='role-card-text'>{role.items[2].text}</p>
										{role.items[2].links &&
											role.items[2].links.map(function (item) {
												return (
													<div className='link-wrapper'>
														<Button type={item.type} class={"external"} text={item.text} url={item.url} />
													</div>
												);
											})}
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className={"custody-stacking"} id={`${heroData.buttons[1]?.url.replace(/\s+/g, "-").toLowerCase()}`}>
						<div className={"container"}>
							<div className={"d-flex flex-column flex-lg-row custody-stacking-item justify-center align-items-lg-center"}>
								<div className='col-12 col-lg-6 order-1 order-lg-0'>
									<div className={"text-box"}>
										<h2 className='custody-stacking-title'>Wallets</h2>
										<div className='custody-text-box'>
											<p>Anyone can download a non-custodial wallet to freely control and use their Tia.</p>
											<p>
												It’s important to get familiar with basic wallet practices for safely storing and transacting with Tia
												on Celestia.
											</p>
										</div>
									</div>
								</div>
								<div className={"image-box--node col-12 col-lg-6 order-0 order-lg-1"}>
									<div className='image-wrapper'>
										<img className='img' style={{ width: `100%`, maxWidth: `470px` }} src={image1} alt={""} />
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className='wallets'>
						<div className={"container"}>
							<p>{wallets.details}</p>
							<div className={"two-col-flex pt-4 pt-lg-5"}>
								{wallets.items.map(function (item) {
									return (
										<div className='wallet-card-wrapper'>
											<div className={`wallet-blurred-image ${item.backdropClass}`}>
												<Image alt={item.title} filename={item.image} />
											</div>
											<div className='wallet-card'>
												<div className='wallet-container'>
													<div className='wallet-image-wrapper'>
														<Image alt={item.title} filename={item.image} />
													</div>
													<div>
														<h3 className='wallet-card-title'>{item.title}</h3>
														<div className='d-flex justify-content-start'>
															{item.device.map(function (item) {
																return (
																	<div className='wallet-device-item d-flex flex-row align-items-center'>
																		<div className='col-auto pe-2'>
																			<svg
																				width={12}
																				height={9}
																				viewBox='0 0 12 9'
																				fill='none'
																				xmlns='http://www.w3.org/2000/svg'
																			>
																				<path d='M1 4L4.5 7.5L11 1' stroke='#52C01E' strokeWidth='1.5' />
																			</svg>
																		</div>
																		<div className='col'>
																			<p className='wallet-card-text'>{item}</p>
																		</div>
																	</div>
																);
															})}
														</div>
													</div>
												</div>
												<div className='link-wrapper'>
													<Button type={"external"} class={"external"} text={"Download"} url={item.url} />
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>

					{/* <section className={"managing-tia"} id={`${heroData.buttons[0]?.url.replace(/\s+/g, "-").toLowerCase()}`}>
						<div className={"container"}>
							<div className={"row justify-content-between align-items-center"}>
								<div className='col-12 col-lg-6 text-box'>
									<h2 className='title'>Managing TIA as a rollup developer</h2>
									<p>
										Rollup developers need to submit and pay for data in addition to managing their rollup’s TIA balance for
										operation.
									</p>
								</div>
								<div className={"col-12 col-lg-6"}>
									<div className='link-card'>
										<div className='link-title'>Create wallet with celestia-node</div>
										<div className='link-wrapper'>
											<Button
												type={"external"}
												class={"external"}
												text={"Create wallet"}
												url={"https://docs.celestia.org/developers/celestia-node-key/"}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section> */}
				</main>
			</div>
		</Layout>
	);
};

export default WhatIsTIA;
