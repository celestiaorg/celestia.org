import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import SidebarNavigation from "@/components/SidebarNavigation/SidebarNavigation";
import { Heading, Body, Image, ListItem, Section, Link } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

import Meta from "@/components/Meta/Meta";

export const metadata = Meta({
	title: "An introduction to sovereign rollups",
	description: "What sovereign rollups are and how they're different to other blockchain designs.",
});

const SovereignRollupsAnIntroduction = () => {
	const sidebarData = {
		sections: [
			{
				title: "Summary",
				id: "summary",
			},
			{
				title: "Introduction",
				id: "introduction",
			},
			{
				title: "What is a smart contract rollup?",
				id: "What-is-a-smart-contract-rollup?",
			},
			{
				title: "What is a sovereign rollup?",
				id: "what-is-a-sovereign-rollup",
			},
			{
				title: "The differences",
				id: "the-differences",
			},
		],
	};

	return (
		<TertiaryPageContainer>
			<TertiaryPageContainer.Sidebar>
				<SidebarNavigation title={"An introduction to sovereign rollups"} anchors={sidebarData} />
			</TertiaryPageContainer.Sidebar>
			<TertiaryPageContainer.Body>
				<Section id={"summary"}>
					<Heading tag={"h2"}>Summary</Heading>
					<ListItem type={"number"} index={"1"}>
						Sovereign rollups publish transactions to another blockchain for ordering and data availability, leaving its nodes to
						determine the correct chain.
					</ListItem>
					<ListItem type={"number"} index={"2"}>
						The main difference between a smart contract rollup and sovereign rollup is that transactions are verified by a smart contract
						on Ethereum and the sovereign rollup nodes, respectively.
					</ListItem>
					<ListItem type={"number"} index={"3"}>
						Contrary to popular belief, sovereign rollups do inherit multiple aspects of security and they can have a bridge to the DA
						layer.
					</ListItem>
				</Section>
				<Section id={"introduction"}>
					<Heading tag={"h2"}>Introduction</Heading>
					<Body>
						Sovereign rollups are an idea that emerged from Celestia exploring new blockchain designs. They aren&apos;t exactly like their
						smart contract rollup predecessors on Ethereum. Sovereign rollups incorporate ideas from multiple designs, mainly layer 1s,
						rollups, and early networks on Bitcoin, such as{" "}
						<Link
							href={
								"https://bitcoinmagazine.com/technical/mastercoin-a-second-generation-protocol-on-the-bitcoin-blockchain-1383603310"
							}
						>
							Mastercoin
						</Link>
						.
					</Body>
					<Body>
						That begs the question, what are they? How do they work? And how are they different from smart contract rollups? That is what
						we&apos;ll cover.
					</Body>
				</Section>
				<Section id={"What-is-a-smart-contract-rollup?"}>
					<Heading tag={"h2"}>What is a smart contract rollup?</Heading>
					<Body>
						Smart contract rollups are a type of blockchain that publish their entire blocks to a{" "}
						<Link href={"/learn/intermediates/settlement-in-the-modular-stack"}>settlement layer</Link>, like Ethereum. The settlement
						layer’s job is to order the blocks, check that their data is available, and verify whether the transactions are correct.
					</Body>
					<Body>
						Using Ethereum as an example, in the modular stack the smart contract rollup is responsible for{" "}
						<Link href={"/learn/intermediates/modular-and-monolithic-blockchains/"}>execution</Link>. It offloads the work of{" "}
						<Link href={"/learn/intermediates/modular-and-monolithic-blockchains/"}>consensus, data availability, and settlement</Link> to
						Ethereum.
					</Body>
					<Image src={"/images/app/learn/Intermediates/sovereign-rollups-an-introduction/soverign_rollups_1.jpg"} alt={""} />
					<Body>
						As their name implies, smart contract rollups rely on a set of smart contracts on a settlement layer, like Ethereum, to verify
						its blocks. The smart contracts on the settlement layer become the source of truth for determining the{" "}
						<Link href={"/glossary/fork-choice-rule/"}>correct rollup chain</Link>.
					</Body>
					<Image src={"/images/app/learn/Intermediates/sovereign-rollups-an-introduction/soverign_rollups_2.jpg"} alt={""} />
					<Body>
						Verifying each transaction individually wouldn’t scale well. Instead, smart contract rollups use proofs to efficiently verify
						whether a block is valid (<Link href={"/glossary/validity-proof/"}>validity proof</Link>) or invalid (
						<Link href={"/glossary/state-transition-fraud-proof/"}>fraud proof</Link>
						).
					</Body>
					<Body>
						The set of smart contracts also provides a native{" "}
						<Link href={"/glossary/trust-minimized-bridge/"}>trust-minimized bridge</Link> to the settlement layer. The bridge is
						trust-minimized because verification of the entire block happens on the settlement layer directly. Because of this, only a{" "}
						<Link href={"/glossary/honest-minority-assumption/"}>small number of actors</Link> need to behave honestly for the block to be
						successfully verified as valid or not.
					</Body>
				</Section>
				<Section id={"what-is-a-sovereign-rollup"}>
					<Heading tag={"h2"}>What is a sovereign rollup?</Heading>
					<Body>
						A sovereign rollup is a type of blockchain that publishes its transactions to another blockchain, typically for ordering and{" "}
						<Link href={"/glossary/data-availability/"}>data availability</Link>, but handles its own{" "}
						<Link href={"/learn/intermediates/settlement-in-the-modular-stack/"}>settlement</Link>.
					</Body>
					<Body>
						In the context of the modular stack, sovereign rollups are responsible for execution and settlement, while the DA layer
						handles consensus and data availability.
					</Body>
					<Image src={"/images/app/learn/Intermediates/sovereign-rollups-an-introduction/soverign_rollups_3.jpg"} alt={""} />
					<Body>
						Uniquely, DA layers don’t verify whether sovereign rollup transactions are correct. Nodes verifying the sovereign rollup are
						responsible for verifying whether new transactions are correct.
					</Body>
					<Image src={"/images/app/learn/Intermediates/sovereign-rollups-an-introduction/soverign_rollups_4.jpg"} alt={""} />
					<Body>
						If the nodes verify a transaction that was published to the DA layer and it is invalid, they will reject and ignore it. Now,
						the sovereign rollup is responsible for determining its correct chain, not the DA layer.
					</Body>
					<Body>
						Sovereign rollups typically do not have a native trust-minimized bridge with the DA layer. Although sovereign rollups can have
						a general bridge with the DA layer, it just isn’t used for settling the chain.
					</Body>
				</Section>
				<Section id={"the-differences"}>
					<Heading tag={"h2"}>The differences</Heading>
					<Body>
						We now have an idea of what sovereign rollups are and how they work. Now, how are they different from smart contract rollups?
					</Body>
					<Body>The most notable difference between the two is where transactions are verified as correct.</Body>
					<ListItem>Smart contract rollup: transactions are verified by smart contracts on the settlement layer.</ListItem>
					<ListItem>Sovereign rollup: transactions are verified by nodes of the sovereign rollup.</ListItem>
					<Heading tag={"h3"} size={"sm"}>
						Upgrades and sovereignty
					</Heading>
					<Body>
						With a smart contract rollup, upgrades depend on the smart contracts on the settlement layer. Upgrading the rollup requires
						changing the smart contracts. A multisig may be needed to control who can initiate updates to the smart contracts. While it is
						common for teams to control the upgrade multisig, it may be possible to make the multisig controllable via governance. Since
						the smart contracts live on the settlement layer, they are also bound by the{" "}
						<Link href={"/glossary/social-consensus/"}>social consensus</Link> of the settlement layer.
					</Body>
					<Body>
						Sovereign rollups upgrade through <Link href={"/glossary/fork/"}>forks</Link> like a layer 1 blockchain. New software versions
						are published, and nodes can choose to update their software to the latest version. If nodes disagree with the upgrade, they
						can stay on the old software. Providing a choice lets the community, those that run nodes, decide whether they agree with the
						new changes. They can’t be forced into accepting upgrades, even if most nodes upgrade. This feature, compared to smart
						contract rollups, is what makes sovereign rollups ‘sovereign’.
					</Body>
					<Body>
						The nature of upgrading an smart contract rollup poses a difficult set of tradeoffs. With a sovereign rollup, upgrades through
						forks are standard and allow users (nodes) to opt in or out of upgrades.
					</Body>
					<Heading tag={"h3"} size={"sm"}>
						Bridges
					</Heading>
					<Body>
						The native bridges of smart contract rollups have{" "}
						<Link href={"/glossary/trust-minimized-bridge/"}>trust-minimized security</Link> because the settlement layer verifies the
						entire block. While the native smart contract rollup bridge has ideal trust assumptions in theory, they may still require
						upgradeability through a multisig. As long as the multisig exists, the trust assumptions for the bridge are weaker.
					</Body>
					<Body>
						As for sovereign rollups, they can optionally have a trust-minimized bridge to the DA layer, but it does not determine the
						correct chain for the sovereign rollup. If the DA layer lacks execution, like Celestia, then a bridge to the DA layer would
						require <Link href={"/glossary/honest-majority-assumption/"}>stronger trust assumptions</Link> for security.
					</Body>
					<Body>
						For DA layers that don’t have smart contracts, bridges with sovereign rollups would mainly facilitate the movement of the DA
						layer token. This would let the DA layer token get used in applications (e.g. DeFi & NFTs) and moved throughout the rest of
						the blockchain ecosystem.
					</Body>
				</Section>
			</TertiaryPageContainer.Body>
		</TertiaryPageContainer>
	);
};

export default SovereignRollupsAnIntroduction;
