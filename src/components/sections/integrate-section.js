import React from "react";

const IntegrateSection = ({ content, anchorId }) => {
	return (
		<section className={"integrate-section pb-0"} id={`${content.items[anchorId].title.replace(/\s+/g, "-").toLowerCase()}`}>
			<div className={"container"}>
				<div className={"row"}>
					<div className={"row"}>
						<div className={"col box me-md-1"}>
							<div className={"title"}>Blobstream</div>
							<div className={"text"}>Use Celestia as the DA layer for your Ethereum L2.</div>
							<a
								href={"https://docs.celestia.org/developers/blobstream/"}
								className={"button button-simple plausible-event-name=Blobstream--Developer_Portal-Integrate_Section"}
								target='_blank'
							>
								Blobstream documentation
							</a>
						</div>
						<div className={"col box ms-md-1"}>
							<div className={"title"}>Node API</div>
							<div className={"text"}>Use the celestia-node API to publish and retrieve transactions from Celestia.</div>
							<a
								href={"https://node-rpc-docs.celestia.org/?version=v0.12.0/"}
								className={"button button-simple plausible-event-name=Node_API--Developer_Portal-Integrate_Section"}
								target='_blank'
							>
								Node API Documentation
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default IntegrateSection;
