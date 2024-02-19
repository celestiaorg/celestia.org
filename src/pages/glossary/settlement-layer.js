import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Settlement layer";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					A settlement layer refers to a modular blockchain whose primary role is to provide proof verification and{" "}
					<a href='https://celestia.org/glossary/dispute-resolution/'>dispute resolution</a> for{" "}
					<a href='https://celestia.org/glossary/rollup/'>rollups</a>. A settlement layer may also provide other features for rollups, such
					as a liquidity source or bridging hub. 'Settlement layer' may also refer to a monolithic blockchain used by rollups for the
					function of <a href='https://celestia.org/glossary/settlement/'>settlement</a>.
				</p>

				<p>
					Read{" "}
					<a href='https://celestia.org/learn/modular-settlement-layers/settlement-in-the-modular-stack/'>
						settlement in the modular stack
					</a>{" "}
					for more information on settlement layers.
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
