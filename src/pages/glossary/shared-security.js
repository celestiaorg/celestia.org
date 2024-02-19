import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Shared security";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					Security that a blockchain inherits from an external source. This security can come in the forms such as preventing invalid state
					transitions or re-org attacks. Since security of the external blockchain can be shared, multiple blockchains can derive benefits
					from harnessing its security.
				</p>

				<p>
					For example, Celestia will provide shared security to blockchains that deploy on it because they will inherit security from the
					consensus and data availability Celestia provides, which is shared among all chains that will utilize it.
				</p>

				<p>
					Interchain security is another example of shared security where security isn’t inherited from the blockchain itself. Rather, the
					Cosmos Hub validator set will be able to opt-in to become a validator for other zones.
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
