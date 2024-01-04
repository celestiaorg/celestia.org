import * as React from "react";
import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default class Button extends React.Component {
	render() {
		var buttonTitle = this.props.text;

		if (this.props.class.includes("external") || this.props.class.includes("external-big")) {
			buttonTitle = this.props.text + '<i class="icon-external-link"></i>';
		}
		if (this.props.class === "icon") {
			buttonTitle = this.props.text + '<i class="icon-' + this.props.icon + '"></i>';
		}

		if (this.props.type === "internal") {
			return (
				<Link to={`${this.props.url}`} className={"button button-" + this.props.class} dangerouslySetInnerHTML={{ __html: buttonTitle }} />
			);
		} else if (this.props.type === "external" || this.props.type === "external-big") {
			return (
				<a
					href={`${this.props.url}`}
					target={"_blank"}
					rel='noreferrer'
					className={"button button-" + this.props.class}
					aria-label={this.props.text}
					dangerouslySetInnerHTML={{ __html: buttonTitle }}
				/>
			);
		} else if (this.props.type === "anchor") {
			let path = typeof window !== "undefined" ? window.location.pathname : "/";
			return (
				<AnchorLink to={`${path}#${this.props.url}`} className={"button button-" + this.props.class}>
					{buttonTitle}
				</AnchorLink>
			);
		}
	}
}
