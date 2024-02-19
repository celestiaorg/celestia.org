import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Light node";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					In Celestia, a light node is a type of node that verifies block headers and does{" "}
					<a href='https://celestia.org/glossary/data-availability-sampling/'>data availability sampling</a>. Data availability sampling
					gives Celestia light nodes increased security compared to typical{" "}
					<a href='https://celestia.org/glossary/light-client/'>light clients</a> because it lets them detect invalid blocks that have had{" "}
					<a href='https://celestia.org/glossary/data-withholding-attack/'>data withheld</a> by block producers.
				</p>

				<p>
					Since light nodes don’t download all block data or execute transactions, they can run on{" "}
					<a href='https://docs.celestia.org/nodes/overview/'>considerably cheaper hardware</a> than full nodes.
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
