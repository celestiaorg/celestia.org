import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Slashing";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					A mechanism employed in PoS blockchains that is used to deter and punish malicious behavior. Slashing was originally conceived as
					a method to solve the nothing at stake problem, which presented the problem that validators weren’t restricted by the number of
					forks they could vote on – unlike in PoW where miners only have a limited amount of hash power to dedicate to forks.
				</p>

				<p>
					To become a validator, a node is typically required to stake a minimum amount of the network’s native token. If the validator is
					caught double-voting or voting for any competing fork other than the canonical chain, the validator's stake is reduced (slashed).
					The degree by which validators are slashed varies by network and the severity of the malicious behavior.
				</p>

				<p>
					Slashing can also occur for behavior that is deemed dishonest despite any lack of malicious intent. Dishonest behavior can include
					going offline or missing network duties. Slashing as a deterrent for dishonest behavior is important for blockchains that employ
					BFT-like consensus mechanisms, where ≥1/3 of voting power can halt the network if they are offline or refuse to vote.
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
