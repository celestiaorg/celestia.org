import React from "react";
import Image from "../imageComponent";
import { Link } from "gatsby";

const FigmaIcon = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='12' height='17' fill='none'>
			<path
				stroke='currentColor'
				stroke-width='2'
				d='M6 8.5C6 7.83696 6.26339 7.20107 6.73223 6.73223C7.20107 6.26339 7.83696 6 8.5 6C9.16304 6 9.79893 6.26339 10.2678 6.73223C10.7366 7.20107 11 7.83696 11 8.5C11 9.16304 10.7366 9.79893 10.2678 10.2678C9.79893 10.7366 9.16304 11 8.5 11C7.83696 11 7.20107 10.7366 6.73223 10.2678C6.26339 9.79893 6 9.16304 6 8.5V8.5Z'
			/>
			<path
				stroke='currentColor'
				stroke-width='2'
				d='M1 13.5C1 12.837 1.26339 12.2011 1.73223 11.7322C2.20107 11.2634 2.83696 11 3.5 11H6V13.5C6 14.163 5.73661 14.7989 5.26777 15.2678C4.79893 15.7366 4.16304 16 3.5 16C2.83696 16 2.20107 15.7366 1.73223 15.2678C1.26339 14.7989 1 14.163 1 13.5Z'
			/>
			<path
				stroke='currentColor'
				stroke-width='2'
				d='M6 1V6H8.5C9.16304 6 9.79893 5.73661 10.2678 5.26777C10.7366 4.79893 11 4.16304 11 3.5C11 2.83696 10.7366 2.20107 10.2678 1.73223C9.79893 1.26339 9.16304 1 8.5 1L6 1Z'
			/>
			<path
				stroke='currentColor'
				stroke-width='2'
				d='M1 3.5C1 4.16304 1.26339 4.79893 1.73223 5.26777C2.20107 5.73661 2.83696 6 3.5 6H6V1H3.5C2.83696 1 2.20107 1.26339 1.73223 1.73223C1.26339 2.20107 1 2.83696 1 3.5Z'
			/>
			<path
				stroke='currentColor'
				stroke-width='2'
				d='M1 8.5C1 9.16304 1.26339 9.79893 1.73223 10.2678C2.20107 10.7366 2.83696 11 3.5 11H6V6H3.5C2.83696 6 2.20107 6.26339 1.73223 6.73223C1.26339 7.20107 1 7.83696 1 8.5Z'
			/>
		</svg>
	);
};

const ArrowIcon = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='none'>
			<path stroke='currentColor' stroke-linecap='round' stroke-width='1.5' d='M6.94723 21.499L20.3823 8.06396' />
			<path stroke='currentColor' stroke-linecap='square' stroke-linejoin='bevel' stroke-width='1.5' d='M21.1895 19.7061V6.97813H8.46153' />
		</svg>
	);
};

export default function PressItem({ imageClass, content, className }) {
	if (content.type === "internal") {
		return (
			<div className={className}>
				<div className={`press-item`} style={{ backgroundColor: `${content.color}` }}>
					<div className='press-item-header row justify-content-between'>
						<div className={`col-auto image-container ${imageClass}`}>
							<Image alt={content.title} filename={content.image} />
						</div>
						<div className='col-auto link-wrapper'>
							<Link className='link' to={`${content.url}`}>
								<ArrowIcon />
							</Link>
						</div>
					</div>
					<div className='text-box'>
						<div className='badge' style={{ opacity: `${content.figma ? 1 : 0}`}} >
							<div className={"badge-icon"}>
								<FigmaIcon />
							</div>
							<div className={"badge-text"}>Figma</div>
						</div>
						<div className={"press-item-title"}>{content.title}</div>
						{content.text && <div className={"press-item-text"}>{content.text}</div>}
					</div>
				</div>
			</div>
		);
	} else if (content.type === "external" || content.type === undefined) {
		return (
			<div className={className}>
				<div className={`press-item`} style={{ backgroundColor: `${content.color}` }}>
					<div className='press-item-header row justify-content-between'>
						<div className={`col-auto image-container ${imageClass}`}>
							<Image alt={content.title} filename={content.image} />
						</div>
						<div className='col-auto link-wrapper'>
							<a className='link' href={content.url} target={"_blank"} rel={"noreferrer"} aria-label={content.text}>
								<ArrowIcon />
							</a>
						</div>
					</div>
					<div className='text-box'>
							<div className='badge' style={{ opacity: `${content.figma ? 1 : 0}`}}>
								<div className={"badge-icon"}>
									<FigmaIcon />
								</div>
								<div className={"badge-text"}>Figma</div>
							</div>
						<div className={"press-item-title"}>{content.title}</div>
						{content.text && <div className={"press-item-text"}>{content.text}</div>}
					</div>
				</div>
			</div>
		);
	}
}