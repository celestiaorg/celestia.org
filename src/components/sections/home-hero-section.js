import * as React from "react";
import Button from "../buttons/button";

export default class HomeHeroSection extends React.Component {
	render() {
		return (
			<section className={"home-hero-section"}>
				<div className={"container"}>
					<div className={"row justify-content-center"}>
						<div className={"col-auto"}>
							<h1>{this.props.heroData.title}</h1>
						</div>
						<div className={"col-auto"}>
							<div className={"text"} dangerouslySetInnerHTML={{ __html: this.props.heroData.text }} />
						</div>
						<div className={"col-12 justify-content-center d-flex"}>
							{this.props.heroData.buttons.map((button, index) => (
								<Button key={index} class={button.class} type={button.type} text={button.text} url={button.url} />
							))}
						</div>
					</div>
				</div>
			</section>
		);
	}
}
