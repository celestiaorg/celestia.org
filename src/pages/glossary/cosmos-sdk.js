import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Cosmos SDK";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					The <a href='https://v1.cosmos.network/sdk'>Cosmos SDK</a> is a development kit for building applications to run on top of
					Tendermint consensus as a PoS layer 1 blockchain. The SDK provides a framework with which the business logic of new L1 blockchains
					can easily be created by separating the software components into distinct modules. Separation of components through modules
					enables flexibility and customization during the development process.
				</p>
			</div>
		);
	}
}

class GlossarySubpage extends React.Component {
	render() {
		return (
			<Layout footerBoxes={FooterBoxes2}>
				<Seo title={"Celestia - " + title} description={seoContent.description} ogTitle={"Celestia - " + title} image={seoContent.image} />
				<div className={"glossary-subpage"}>
					<main>
						<div className={"container"}>
							<BreadCrumb title={title} />
							<h1 className={"main mb-4"}>{title}</h1>

							<SocialShare title={title} url={this.props.location.href} />

							<GlossaryContent />
						</div>

						<div className={"container wide"}>
							<GlossaryNav url={this.props.location.state && this.props.location.state.url} />
						</div>
					</main>
				</div>
			</Layout>
		);
	}
}

export default GlossarySubpage;
