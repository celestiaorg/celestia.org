import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "State transition fraud proof";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					A method for proving that a state transition is invalid. Optimistic rollups are a type of blockchain that utilize fraud proofs to
					prove invalid state transitions. Since fraud proofs only assess if fraud took place, they are only required during situations
					where a state transition is disputed.
				</p>

				<p>
					A simple construction of a fraud proof requires nodes to re-execute the transaction(s) that were part of the disputed state
					transition. However, this can become prohibitively expensive if the blockchain they are being re-executed on has high gas fees. To
					avoid this, fraud proofs have been constructed that involve interactive verification games (IVGs) that narrow down the disputed
					state transition to just the key computation step in question, which is then re-executed to assess if it is fraudulent.
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
