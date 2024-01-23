import React from "react";
import Image from "./imageComponent";

const Ecosystem = ({ ecosystem }) => {
	console.log(ecosystem);
	return (
		<a href={ecosystem.url} target={"_blank"} rel={"noreferrer"} aria-label={ecosystem.title}>
			<div className={"ecosystem d-flex flex-column"}>
				<div className={"logo-container"}>
					<Image alt={ecosystem.title} filename={ecosystem.image} />
				</div>
				{ecosystem.title && <div className={"title"}>{ecosystem.title}</div>}
				<div className='category-container'>
					{ecosystem.categories.map((category) => (
						<div className={"category"}>{category}</div>
					))}
				</div>
				{ecosystem.description && (
					<div className='description'>
						{ecosystem.description.length > 250 ? `${ecosystem.description.substring(0, 250)}...` : ecosystem.description}
					</div>
				)}
			</div>
		</a>
	);
};

export default Ecosystem;
