import React, { useState } from "react";

const Faq = (props) => {
	const [active, setActive] = useState(false);

	const toggleClass = () => {
		setActive(!active);
	};

	return (
		<div className={active ? "faq row justify-content-between opened" : "faq row justify-content-between"}>
			<div className={"col"}>
				<div className={"question"} onClick={toggleClass} role={"button"} tabIndex={0} onKeyDown={toggleClass}>
					{props.faq.question}
				</div>
				<div
					className={"text"}
					dangerouslySetInnerHTML={{
						__html: props.faq.text,
					}}
				></div>
			</div>
			<div className={"col-auto"}>
				<div
					role='button'
					className={"dropdown"}
					onClick={toggleClass}
					onKeyDown={toggleClass}
					aria-label='Dropdown Button'
					tabIndex={0}
				/>
			</div>
		</div>
	);
};

export default Faq;
