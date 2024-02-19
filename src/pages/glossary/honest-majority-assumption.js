import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Honest majority assumption";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					The assumption that a majority of blockchain participants (such as the validator set) are honest and follow the rules of the
					protocol. If a majority of participants are dishonest, attacks can be made that are within the rules of the protocol but cause
					negative effects.
				</p>

				<p>
					Honest majority assumptions can come in many forms. For example, light clients make an honest majority assumption about state
					validity because they don't verify transactions. If a majority of validators are dishonest and create invalid blocks, light
					clients can't verify that the blocks are invalid because from their perspective the blocks received consensus from a majority of
					the validator set.
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
