import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Data availability sampling";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					Data availability sampling is a mechanism for light nodes to verify data availability without having to download all data for a
					block. Data availability sampling (DAS) works by having light nodes conduct multiple rounds of random sampling for small portions
					of block data. As a light node completes more rounds of sampling for block data, it increases its confidence that data is
					available. Once the light node successfully reaches a predetermined confidence level (e.g. 99%) it will consider the block data as
					available.
				</p>

				<p>
					When implemented in blockchain designs like Celestia, data availability sampling enables light nodes to contribute to both the
					security and throughput of the network with significantly cheaper hardware than that of full nodes.
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
