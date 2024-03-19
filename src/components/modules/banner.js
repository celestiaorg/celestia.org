import * as React from "react";
// import Image from "../imageComponent";

export default class Banner extends React.Component {
	constructor() {
		super();
		this.state = {
			banner: true,
		};
	}
	closeBanner = () => {
		const self = this;
		document.getElementById("banner").classList.add("hide");
		setTimeout(function () {
			localStorage.setItem("modular-fellows-banner", "true");
			self.setState({ banner: false });
		}, 600);
	};

	componentDidMount() {
		if (localStorage.getItem("modular-fellows-banner")) {
			this.setState({ banner: false });
		}
	}

	render() {
		return this.state.banner === true ? (
			<div id={"banner"} className='banner'>
				<div className={"close-banner"} onClick={this.closeBanner}>
					<i className={"icon-close"}></i>
				</div>
				<div className={"container"}>
					<div className={"gap-2 gap-lg-4 justify-content-center align-items-center d-flex flex-column flex-lg-row"}>
						<div className={"banner-text col-auto"}>
							Get ready for the first Celestia hackathon! Infinite Space Bazaar begins on April 2
							{/* <div className={`emoji`}>☄️</div> */}
						</div>

						<a className={"col-auto"} href='https://bazaar.celestia.org' target={"_blank"} rel={"noreferrer"}>
							<div>
								<button className={"button-simple"}>Register now</button>
							</div>
						</a>
					</div>
				</div>
			</div>
		) : (
			""
		);
	}
}
