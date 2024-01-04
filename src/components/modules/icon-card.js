import React from "react";
import Image from "../imageComponent";
import Button from "../buttons/button";
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default function IconCard({ imageClass, content, variant, iconPosition = "top", className, btnClass = "" }) {
	return (
		<div className={className}>
			<div className={`icon-card ${variant} d-flex flex-column h-100`}>
				{content.image && (
					<div className={`logo-container ${iconPosition} ${imageClass}`} data-image={content.image}>
						<Image alt={content.title} filename={content.image} />
					</div>
				)}
				<div className='text-box'>
					<div className={"title"}>{content.title}</div>
					{content.text && <div className={"text"}>{content.text}</div>}
				</div>
				<div className='link-wrapper'>
					{content.link && content.type === "internal" && (
						<Button type={"internal"} class={"external " + btnClass} text={content.link.text} url={content.link.url} />
					)}
					{content.link && (content.type === "external" || content.type === undefined) && content.link.text !== "Coming Soon" && (
						<Button type={"external"} class={"external " + btnClass} text={content.link.text} url={content.link.url} />
					)}
					{content.link && (content.type === "external" || content.type === undefined) && content.link.text === "Coming Soon" && (
						<div className={"coming-soon"}>{content.link.text}</div>
					)}
					{content.link && content.type === "anchor" && (
						<AnchorLink
							className={`link ${btnClass}`}
							to={`/build#${content.anchorToId ? content.anchorToId : content.title.replace(/\s+/g, "-").toLowerCase()}`}
							stripHash
						>
							{content.link.text}
							<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
								<path stroke='#7B2BF9' strokeLinecap='square' strokeWidth='1.5' d='M6.89106 1.34961L6.89106 11.9052' />
								<path
									stroke='#7B2BF9'
									strokeLinecap='square'
									strokeLinejoin='bevel'
									strokeWidth='1.5'
									d='M2 7.64941L7 12.6494L12 7.64942'
								/>
							</svg>
						</AnchorLink>
					)}
					{content.links &&
						content.links.map((link) => {
							if (link.type === "internal") {
								return <Button type={"internal"} class={"external " + btnClass} text={link.text} url={link.url} />;
							} else if (link.type === "external" || link.type === undefined) {
								return <Button type={"external"} class={"external " + btnClass} text={link.text} url={link.url} />;
							} else if (link.type === "anchor") {
								return (
									<AnchorLink
										className='link'
										to={`/build#${link.anchorToId ? link.anchorToId : link.title.replace(/\s+/g, "-").toLowerCase()}`}
										stripHash
									>
										{link.text}
										<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
											<path stroke='#7B2BF9' strokeLinecap='square' strokeWidth='1.5' d='M6.89106 1.34961L6.89106 11.9052' />
											<path
												stroke='#7B2BF9'
												strokeLinecap='square'
												strokeLinejoin='bevel'
												strokeWidth='1.5'
												d='M2 7.64941L7 12.6494L12 7.64942'
											/>
										</svg>
									</AnchorLink>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
}
