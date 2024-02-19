import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Execution environment";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					The virtual environment within a blockchain where transactions are processed, and accounts and smart contracts live. The execution
					environment is also responsible for determining the rules that dictate how each block updates the state, known as a state
					transition function.
				</p>

				<p>
					All blockchains have execution environments, however their functionality may vary based on how they are implemented. For example,
					the Ethereum virtual machine (EVM) is Ethereum’s native execution environment, where Ethereum transactions are executed, and
					accounts and smart contracts live. The EVM has also been implemented by other blockchains which allows smart contracts to be
					written in EVM-based programming languages, such as solidity.
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
