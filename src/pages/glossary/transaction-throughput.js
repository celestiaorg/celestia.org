import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Transaction throughput";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					The computational capacity of a blockchain. Transaction throughput is commonly calculated by the number of transactions that can
					be processed per second (TPS). However, TPS is a subjective measure of throughput as transactions can vary in size. Therefore,
					larger transactions will result in lower TPS, and smaller transactions will lead to higher TPS. An objective measurement of
					throughput is the number of computational units that can be performed per second.
				</p>

				<p>
					For example, consider a blockchain that has a limit of 15M computational units per block with a block time of 10 seconds. The
					objective throughput of the blockchain would be 1.5M units per second. Additionally, throughput can also be used to measure other
					parameters of a blockchain, such as data capacity.
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
