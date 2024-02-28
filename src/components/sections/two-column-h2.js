import * as React from "react";
import Image from "../imageComponent";
import { Link } from "gatsby";
import Lottie from "lottie-react";
import { useEffect, useMemo, useRef, useState } from "react";
import handleViewport, { useInViewport } from "react-in-viewport";

const TwoColumnH2 = ({
	className,
	direction,
	title,
	image,
	text,
	buttonPrimaryUrl,
	buttonPrimaryClass,
	buttonPrimaryTitle,
	buttonSecondaryUrl,
	buttonSecondaryClass,
	buttonSecondaryTitle,
	anim,
	animVersion,
	animSegment,
}) => {
	const lottieRef = useRef(null);

	const myRef = useRef();

	const { inViewport, enterCount, leaveCount } = useInViewport(myRef);

	enterCount === 1 && lottieRef.current && lottieRef.current.play();
	console.log(anim);
	return (
		<section className={`two-column-h2 ${direction} ${className}`}>
			<div className={"row align-items-center"}>
				<div className={`col col-12 col-lg-6 anim-col ${animVersion === 2 && "px-2"} ${direction === "rtl" ? "order-lg-2" : "order-lg-1"}`}>
					{anim && (
						<Lottie
							width='100%'
							height='100%'
							resizeMode='cover'
							className={`lottie-anim-${animVersion}`}
							lottieRef={lottieRef}
							quality={"high"}
							animationData={anim}
							loop={false}
							autoplay={false}
							renderer={"canvas"}
						/>
					)}
					{!anim && <Image alt={title} filename={image} />}
				</div>
				<div className={`d-table-cell align-middle col col-12 col-lg-6 ${direction === "rtl" ? "order-lg-1" : "order-lg-2"}`}>
					<div className={"text"}>
						<h2 className={"with-decor mt-4 mt-lg-0"}>{title}</h2>
						<div className='paragraph' dangerouslySetInnerHTML={{ __html: text }} />
						<div className={"lottie-anchor"} ref={myRef} />
						<div className={"flex mt-4"}>
							<Link to={buttonPrimaryUrl} className={`button button-simple me-4 ${buttonPrimaryClass}`}>
								{buttonPrimaryTitle}
							</Link>
							{buttonSecondaryTitle && (
								<Link to={buttonSecondaryUrl} className={`button button-white ${buttonSecondaryClass}`}>
									{buttonSecondaryTitle}
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TwoColumnH2;
