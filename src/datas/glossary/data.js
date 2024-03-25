export const glossaries = [
	{
		B: [
			{
				url: "blockchain-cluster",
				title: "Blockchain cluster",
				text: "A group of blockchains that can communicate with each other in a trust-minimized way.",
			},
			{
				url: "block-header",
				title: "Block header",
				text: "The header of a block contains a list of relevant metadata.",
			},
			{
				url: "block-producer",
				title: "Block producer",
				text: "A full node that is responsible for producing blocks.",
			},
			{
				url: "block-space",
				title: "Block space",
				text: "The capacity of each block.",
			},
		],
	},
	{
		C: [
			{
				url: "composability",
				title: "Composability",
				text: "The ability for applications on a blockchain to read and write state to each other.",
			},
			{
				url: "consensus",
				title: "Consensus",
				text: "A function of modular blockchains where the ordering of transactions is agreed upon by a set of validators.",
			},
			{
				url: "consensus-algorithm",
				title: "Consensus algorithm",
				text: "A consensus algorithm is a set of rules that blockchains use to determine how nodes produce new blocks and agree to finalize them.",
			},
			{
				url: "consensus-layer",
				title: "Consensus layer",
				text: "A modular blockchain that provides transaction ordering for other modular blockchains, like rollups.",
			},
			{
				url: "cosmos-sdk",
				title: "Cosmos SDK",
				text: "The Cosmos SDK is a development kit for building PoS layer 1 blockchains with CometBFT (based on Tendermint algorithm) as the consensus mechanism.",
			},
			{
				url: "cross-chain-interoperability",
				title: "Cross-chain interoperability",
				text: "The ability for separate blockchains to communicate and interact with each other.",
			},
		],
	},
	{
		D: [
			{
				url: "da",
				title: "DA",
				text: "DA stands for Data Availability.",
			},
			{
				url: "dac",
				title: "DAC",
				text: "DAC stands for Data Availability Committee.",
			},
			{
				url: "das",
				title: "DAS",
				text: "DAS stands for Data Availability Sampling.",
			},
			{
				url: "data-availability-sampling",
				title: "Data availability sampling",
				text: "A technique in which nodes can verify that data is available for a block without having to download the entire block, formerly known as data availability proofs.",
			},
			{
				url: "data-availability",
				title: "Data availability",
				text: "The condition of whether or not transaction data was made available for nodes to download, when a block was proposed.",
			},
			{
				url: "data-availability-committee",
				title: "Data availability committee",
				text: "A data availability committee (DAC) is a permissioned group of nodes responsible for providing data availability to a blockchain.",
			},
			{
				url: "data-availability-layer",
				title: "Data availability layer",
				text: "A blockchain that provides for other types of chains, like rollups.",
			},
			{
				url: "data-throughput",
				title: "Data throughput",
				text: "A measurement of the data capacity of a blockchain. Data throughput is calculated by the amount of data that a blockchain can process, measured in kb/s or mb/s.",
			},
			{
				url: "data-withholding-attack",
				title: "Data withholding attack",
				text: "A type of attack that occurs when a block producer proposes a new block but does not share the underlying transaction data that was used to create the block.",
			},
			{
				url: "dispute-resolution",
				title: "Dispute resolution",
				text: "The handling and resolution of disputes, commonly used as a term in relation to optimistic rollups and their fraud proof mechanism.",
			},
		],
	},
	{
		E: [
			{
				url: "ee",
				title: "EE",
				text: "EE stands for Execution Environment.",
			},
			{
				url: "execution",
				title: "Execution",
				text: "A function of modular blockchains where transactions are executed and the new state of the chain is determined.",
			},
			{
				url: "execution-environment",
				title: "Execution environment",
				text: "The virtual environment within a blockchain where transactions are processed, and accounts and smart contracts live.",
			},
			{
				url: "execution-layer",
				title: "Execution layer",
				text: "A type of modular blockchain whose primary job is hosting smart contracts and executing transactions.",
			},
		],
	},
	{
		F: [
			{
				url: "fee-market",
				title: "Fee market",
				text: "A type of market that blockchains implement to prevent malicious actors from spamming the network.",
			},
			{
				url: "fork",
				title: "Fork",
				text: "A software upgrade that causes the blockchain to split into two chains that may or may not be compatible with each other.",
			},
			{
				url: "fork-choice-rule",
				title: "Fork choice rule",
				text: "An algorithm that nodes use to correctly identify and follow the canonical chain.",
			},
			{
				url: "full-node",
				title: "Full node",
				text: "A type of node that fully verifies a blockchain.",
			},
		],
	},
	{
		H: [
			{
				url: "honest-majority-assumption",
				title: "Honest majority assumption",
				text: "The assumption that a majority of blockchain participants (such as the validator set) are honest and follow the rules of the protocol.",
			},
			{
				url: "honest-minority-assumption",
				title: "Honest minority assumption",
				text: "The assumption that only a minority of blockchain participants are honest and follow the rules of the protocol.",
			},
		],
	},
	{
		I: [
			{
				url: "inter-cluster-communication",
				title: "Inter-cluster communication",
				text: "Communication that occurs between blockchains that are in different clusters.",
			},
			{
				url: "isr",
				title: "ISR",
				text: "ISR stands for Intermediate State Root.",
			},
		],
	},
	{
		L: [
			{
				url: "light-client",
				title: "Light client",
				text: "A type of node that only downloads and verifies block headers, relying on an honest majority assumption that the state of the chain indicated by the block header is valid.",
			},
			{
				url: "light-node",
				title: "Light node",
				text: "In Celestia, a light node is a type of node that verifies block headers and does data availability sampling.",
			},
			{
				url: "liveness",
				title: "Liveness",
				text: "Liveness is a property of blockchains where validators produce new blocks and successfully finalize transactions.",
			},
		],
	},
	{
		M: [
			{
				url: "modular-blockchain",
				title: "Modular blockchain",
				text: "A type of blockchain that specializes in one or two tasks, rather than all of them.",
			},
			{
				url: "modular-stack",
				title: "Modular stack",
				text: "A combination of multiple modular blockchains.",
			},
			{
				url: "monolithic-blockchain",
				title: "Monolithic blockchain",
				text: "A type of blockchain that performs all tasks by itself.",
			},
		],
	},
	{
		N: [
			{
				url: "namespaced-merkle-tree",
				title: "Namespaced Merkle Tree",
				text: "A Namespaced Merkle Tree (NMT) is a type of binary Merkle tree where each node in the tree is tagged by the minimum and maximum namespace of their children.",
			},
			{
				url: "nmt",
				title: "NMT",
				text: "NMT stands for Namespaced Merkle Tree.",
			},
			{
				url: "node",
				title: "Node",
				text: "A node is a device that participates in a blockchain protocol by running its software.",
			},
		],
	},
	{
		O: [
			{
				url: "off-chain-data-availability",
				title: "Off-chain data availability",
				text: "Off-chain data availability occurs when an L2 publishes its transaction data somewhere separate from the L1 it settles on.",
			},
			{
				url: "on-chain-data-availability",
				title: "On-chain data availability",
				text: "On-chain data availability occurs when an L2 publishes its transaction data to its designated L1.",
			},
			{
				url: "optimistic-rollup",
				title: "Optimistic rollup",
				text: "A type of rollup that posts its blocks to a separate chain without any cryptographic proofs that attest to their validity.",
			},
			{
				url: "oru",
				title: "ORU",
				text: "ORU stands for Optimistic Rollup.",
			},
		],
	},
	{
		P: [
			{
				url: "peer-to-peer-network",
				title: "Peer to peer network",
				text: "A network in which nodes are connected and can communicate directly with each other without reliance on a third party to facilitate communication.",
			},
			{
				url: "pfb",
				title: "PFB",
				text: "PFB stands for PayforBlob.",
			},
			{
				url: "proof-of-stake",
				title: "Proof of Stake",
				text: "Proof of Stake is a mechanism that requires blockchain participants to stake a token to participate in consensus.",
			},
		],
	},
	{
		Q: [
			{
				url: "qgb",
				title: "QGB",
				text: "QGB stands for Quantum Gravity Bridge.",
			},
		],
	},
	{
		R: [
			{
				url: "rollup",
				title: "Rollup",
				text: "A type of blockchain that posts their blocks to a separate chain to receive consensus and ensure data availability.",
			},
		],
	},
	{
		S: [
			{
				url: "safety",
				title: "Safety",
				text: "Safety is a property of blockchains that a chain will not fork.",
			},
			{
				url: "scalability",
				title: "Scalability",
				text: "Scalability is the ability of a blockchain to increase its capacity without an equal increase in the cost to run a node that verifies the chain.",
			},
			{
				url: "settlement",
				title: "Settlement",
				text: "A function of modular blockchains where transaction proofs from rollups are verified and disputes are resolved.",
			},
			{
				url: "settlement-layer",
				title: "Settlement layer",
				text: "A modular blockchain whose primary role is to provide proof verification and dispute resolution for rollups.",
			},
			{
				url: "sequencer",
				title: "Sequencer",
				text: "A sequencer is a type of rollup node that is responsible for collecting transactions and producing new blocks.",
			},
			{
				url: "sharding",
				title: "Sharding",
				text: "The process of separating a blockchain from a single chain into multiple chains (shards).",
			},
			{
				url: "shared-security",
				title: "Shared security",
				text: "Security that a blockchain inherits from an external source.",
			},
			{
				url: "slashing",
				title: "Slashing",
				text: "A mechanism employed in PoS blockchains that is used to deter and punish malicious behavior.",
			},
			{
				url: "smart-contract",
				title: "Smart contract",
				text: "A smart contract is a program that runs on a blockchain.",
			},
			{
				url: "social-consensus",
				title: "Social consensus",
				text: "The process by which individuals come to an agreement on a change that will be made to a blockchain.",
			},
			{
				url: "sovereign-application",
				title: "Sovereign application",
				text: "An application that is deployed on its own sovereign blockchain.",
			},
			{
				url: "sovereign-blockchain",
				title: "Sovereign blockchain",
				text: "A blockchain that has independent control over itself and its applications via social consensus.",
			},
			{
				url: "sovereign-rollup",
				title: "Sovereign rollup",
				text: "A type of rollup that does not use a settlement layer to determine its canonical chain and validity rules.",
			},
			{
				url: "state-transition-fraud-proof",
				title: "State transition fraud proof",
				text: "A method for proving that a state transition is invalid.",
			},
			{
				url: "synchrony-assumption",
				title: "Synchrony assumption",
				text: "An assumption that the network is synchronous such that when a message is sent it will be received within a certain amount of time.",
			},
		],
	},
	{
		T: [
			{
				url: "throughput",
				title: "Throughput",
				text: "A measurement of the capacity of a blockchain. Throughput primarily measures two elements: data throughput and transaction throughput.",
			},
			{
				url: "the-data-availability-problem",
				title: "The data availability problem",
				text: "A problem that is concerned with whether the data in the proposed block can be verified that it is available.",
			},
			{
				url: "transaction-throughput",
				title: "Transaction throughput",
				text: "The computational capacity of a blockchain. Transaction throughput is commonly calculated by the number of transactions that can be processed per second (TPS).",
			},
			{
				url: "trust-minimized-bridge",
				title: "Trust minimized bridge",
				text: "A bridge between two blockchains that doesn’t require an intermediary, a committee, or an honest majority assumption to ensure that funds can’t be stolen.",
			},
			{
				url: "trusted-bridge",
				title: "Trusted bridge",
				text: "A bridge between two blockchains that requires either a trusted intermediary, committee, or an honest majority assumption to ensure that funds can’t be stolen.",
			},
		],
	},
	{
		V: [
			{
				url: "validator",
				title: "Validator",
				text: "A full node that is part of the validator set in a PoS blockchain.",
			},
			{
				url: "validator-set",
				title: "Validator set",
				text: "A group of validators that are responsible for directly participating in the consensus of a blockchain through either voting, producing, or proposing blocks.",
			},
			{
				url: "validity-proof",
				title: "Validity proof",
				text: "A type of cryptographic proof that can be used to attest to the validity of a state transition.",
			},
			{
				url: "validium",
				title: "Validium",
				text: "A type of zero-knowledge rollup that posts its data off-chain rather than to its parent chain.",
			},
			{
				url: "volition",
				title: "Volition",
				text: "A zero-knowledge rollup with options for both on-chain and off-chain data availability.",
			},
		],
	},
	{
		Z: [
			{
				url: "zk-rollup",
				title: "zk-Rollup",
				text: "A type of rollup that posts its blocks to a separate chain with a validity proof that attests to the correctness of the block.",
			},
			{
				url: "zkr",
				title: "ZKR",
				text: "ZKR stands for ZK Rollup.",
			},
		],
	},
];
