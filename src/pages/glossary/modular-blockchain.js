import * as React from "react";

import { FooterBoxes2 } from "../../datas/glossary/content";
import Layout from "../../components/layout";
import BreadCrumb from "../../components/breadcrumb";
import SocialShare from "../../components/socialShare";
import GlossaryNav from "../../components/glossary-nav";

import { seoContent } from "../../datas/glossary/seoContent";
import Seo from "../../components/seo";

const title = "Modular blockchain";

class GlossaryContent extends React.Component {
	render() {
		return (
			<div className={"glossary-content"}>
				<p>
					Modular blockchains are specialists that only perform one or two functions. The functions that modular blockchains can specialize
					in are:
				</p>

				<ol>
					<li>
						<a href='https://celestia.org/glossary/execution/'>Execution</a>
					</li>
					<li>
						<a href='https://celestia.org/glossary/settlement/'>Settlement</a>
					</li>
					<li>
						<a href='https://celestia.org/glossary/consensus/'>Consensus</a>
					</li>
					<li>
						<a href='https://celestia.org/glossary/data-availability/'>Data availability</a>
					</li>
				</ol>

				<p>
					Modular chains don’t sit alone, though. Multiple of them combine to perform all the tasks a monolithic chain does by itself. This
					combination of chains is what we call a <a href='https://celestia.org/glossary/modular-stack/'>modular stack</a>.
				</p>

				<p>
					For example, Celestia is a modular blockchain that specializes in providing consensus and data availability for other types of
					chains.
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
