import * as React from "react";
import Image from "../components/imageComponent";
import Button from "../components/buttons/button";

import { heroData } from "../datas/run-a-node/hero-data";
import { whatIsANode } from "../datas/run-a-node/what-is-a-node";
import { joinTheNetwork } from "../datas/run-a-node/join-the-network";
import { lightNode } from "../datas/run-a-node/light-node";
import { FooterBoxes } from "../datas/run-a-node/content";

import Layout from "../components/layout";
import IconCard from "../components/modules/icon-card";

import { seoContent } from "../datas/run-a-node/seoContent";
import Seo from "../components/seo";

const DevPortal = () => {
	return (
		<Layout footerBoxes={FooterBoxes}>
			<Seo title={seoContent.title} description={seoContent.description} image={seoContent.image} />
			<div className={"run-a-node"}>
				<main>
					<section className='hero'>
						<div className={"container"}>
							<h1 className={"main mb-3 mb-md-4"}>{heroData.title}</h1>
							<div className={"row"}>
								<div className={"col-auto"}>
									<div className={"text"} dangerouslySetInnerHTML={{ __html: heroData.text }} />
									{heroData.buttons.map((button, index) => (
										<Button key={index} class={button.class} type={button.type} text={button.text} url={button.url} />
									))}
								</div>
							</div>
						</div>
					</section>

					<section className={"what-is-a-node"}>
						<div className={"container"}>
							<div className={"row justify-content-between align-items-center"}>
								<div className={"image-box--node col-12 col-lg-6"}>
									<div className='image-wrapper'>
										<Image alt={whatIsANode.title} filename={whatIsANode.image} />
									</div>
								</div>
								<div className={"text-box col-12 col-lg-6"}>
									<h2 className='title'>{whatIsANode.title}</h2>
									<div className={"text"} dangerouslySetInnerHTML={{ __html: whatIsANode.text }} />
								</div>
							</div>
						</div>
					</section>

					<section className={"join-the-network"} id={`${heroData.buttons[0]?.url.replace(/\s+/g, "-").toLowerCase()}`}>
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

					<section className={"light-nodes"} id={`${heroData.buttons[1]?.url.replace(/\s+/g, "-").toLowerCase()}`}>
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
					</section>
				</main>
			</div>
		</Layout>
	);
};

export default DevPortal;
