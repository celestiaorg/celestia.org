import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "The data availability problem";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					The problem with data availability occurs when the transaction data for a newly proposed block cannot be downloaded and verified.
					This type of attack by a block producer is called a{" "}
					<a href='https://celestia.org/glossary/data-withholding-attack'>data withholding attack</a>, which sees the block producer
					withhold transaction data of a new block.
				</p>

				<p>
					Since transaction data is withheld, nodes cannot update to the latest state. Such an attack can have numerous consequences, from
					halting a chain to gaining the ability to steal funds. The severity of the consequences will depend on the type of blockchain (L1
					or L2) and whether data availability is kept on-chain or off-chain. The data availability problem commonly arises around L2
					scaling solutions like <a href='https://celestia.org/glossary/rollup'>rollups</a> and{" "}
					<a href='https://celestia.org/glossary/validium'>validiums</a>.
				</p>

				<p>
					Read more about{" "}
					<a href='https://coinmarketcap.com/alexandria/article/what-is-data-availability/'>the data availability problem</a>.
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
