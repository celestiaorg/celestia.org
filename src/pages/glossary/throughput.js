import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Throughput";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					A measurement of the capacity of a blockchain. Throughput primarily measures two elements: data throughput and transaction
					throughput. Data throughput determines a blockchain’s data capacity, which is measured in kb/s or mb/s. Data throughput is most
					relevant to data availability layers because their primary job is to provide a high capacity for data.
				</p>

				<p>
					Transaction throughput measures the computational capacity of a blockchain, which is commonly calculated by the number of
					transactions that can be processed per second (TPS). However, TPS is a subjective measure of throughput as transactions can vary
					in size. An objective measurement of throughput is the number of computational units that can be performed per second.
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
