import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Trusted bridge";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					A bridge between two blockchains that requires either a trusted intermediary, committee or an honest majority assumption to ensure
					that funds can’t be stolen. A trusted bridge can be exploited more easily than a trust-minimized bridge because it provides weaker
					guarantees for its security.
				</p>

				<p>
					Examples of trusted bridges are the bridge for WBTC which is run by BitGo, a committee based bridge like Axelar, or the IBC bridge
					between Osmosis and the Cosmos Hub.
				</p>

				<p>
					{" "}
					Read more about <a href='https://blog.celestia.org/clusters/'>clusters and bridging</a>.
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
