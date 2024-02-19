import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Composability";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					The ability for applications on a blockchain to read and write state to each other. Composability allows applications to
					coordinate with and build on top of one another such that it enables an ecosystem of interconnected applications.
				</p>

				<p>
					For example, an application that automates liquidity strategies on Uniswap requires it to be reading and writing the state of
					Uniswap’s contracts.
				</p>
			</div>
		);
	}
}

class GlossarySubpage extends React.Component {
	render() {
		return (
			<Layout footerBoxes={FooterBoxes2}>
				<div className={"glossary-subpage"}>
					<Seo
						title={"Celestia - " + title}
						description={seoContent.description}
						ogTitle={"Celestia - " + title}
						image={seoContent.image}
					/>
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
