import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Execution layer";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					An execution layer is a type of modular blockchain whose primary job is hosting smart contracts and executing transactions. A
					common example of an execution layer is a <a href='https://celestia.org/glossary/rollup/'>rollup</a>. Execution layers utilize one
					or multiple other modular blockchains to fulfill any of the following functions:{" "}
					<a href='https://celestia.org/glossary/settlement/'>settlement</a>,{" "}
					<a href='https://celestia.org/glossary/consensus/'>consensus</a>, or{" "}
					<a href='https://celestia.org/glossary/data-availability/'>data availability</a>.
				</p>

				<p>An execution layer may also refer to the execution environment of a monolithic blockchain.</p>
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
