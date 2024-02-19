import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Data withholding attack";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					A type of attack that occurs when a block producer proposes a new block but does not share the underlying transaction data that
					was used to create the block. Blockchains typically ensure proposed blocks are available by requiring validators to download the
					entire block and vote on whether the block was valid or not. If the majority of the validator set is malicious and votes that a
					block with unavailable data is valid, it will be added to the chain but rejected by full nodes.
				</p>

				<p>
					While full nodes can verify that the block is invalid by fully downloading it, light clients have no such mechanism as they only
					download the block header. Techniques such as data availability sampling can provide light clients with a method to verify data
					availability without having to download the entire block, allowing them to retain minimal resource requirements.
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
