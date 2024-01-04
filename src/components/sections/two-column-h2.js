import * as React from "react";
import Image from "../imageComponent";
import { Link } from "gatsby";

const TwoColumnH2 = ({
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
}) => {
	return (
		<section className={`two-column-h2 ${direction}`}>
			<div className={"row align-items-center"}>
				<div className={`col col-12 col-lg-6 ${direction === "rtl" ? "order-lg-2" : "order-lg-1"}`}>
					<Image alt={title} filename={image} />
				</div>
				<div className={`d-table-cell align-middle col col-12 col-lg-6 ${direction === "rtl" ? "order-lg-1" : "order-lg-2"}`}>
					<div className={"text"}>
						<h2 className={"with-decor mt-4 mt-lg-0"}>{title}</h2>
						<div className='paragraph' dangerouslySetInnerHTML={{ __html: text }} />
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
