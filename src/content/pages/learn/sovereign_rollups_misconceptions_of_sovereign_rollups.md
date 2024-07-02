---
order: 10
path: "/learn/"
slug: "/learn/sovereign-rollups/misconceptions/"
edit: "https://github.com/celestiaorg/celestia.org/blob/main/src/pages/markdown-pages/learn/sovereign%20rollups-misconceptions%20of%20sovereign%20rollups.md"
date: "2023-03-21"
icon: ""
category: "Intermediate"
subcategory: "Sovereign rollups"
title: "Misconceptions of sovereign rollups"
description: "Answers to common misconceptions about sovereign rollups."
---

<head>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@CelestiaOrg">
  <meta name="twitter:creator" content="@likebeckett">
  <meta name="twitter:title" content="Misconceptions of sovereign rollups">
  <meta name="twitter:description" content="Answers to common misonceptions about sovereign rollups."> 
  <meta name="twitter:image" content="https://raw.githubusercontent.com/celestiaorg/celestia.org/main/src/pages/markdown-pages/learn/images/sovereign-rollups-twitter-card.png">
</head>

#### Summary
- Sovereign rollups inherit multiple aspects of security from the DA layer, such as <a href="https://celestia.org/glossary/liveness/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">liveness</a>, <a href="https://celestia.org/glossary/safety/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">safety</a>, re-org resistance, and censorship resistance.
- Sovereign rollups can have a bridge to the DA layer. The design space for bridging between sovereign rollups is wide.
- Sovereign rollups don’t need a settlement layer because they <a href="https://celestia.org/learn/sovereign-rollups/an-introduction/#what-is-a-sovereign-rollup" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">do their own settlement</a>.

#### Intro
Sovereign rollups combine features from multiple different blockchain designs. The unique design can create misconceptions about sovereign rollups, such as how they work, what security they have, or what kinds of features are possible.

We’re going to explore and answer some of those misconceptions.

#### Sovereign rollups don’t inherit security of the DA layer
Security covers multiple aspects. Sovereign rollups do inherit multiple aspects of security from the DA layer.

##### Data availability
The most obvious security feature that sovereign rollups inherit from DA layers is <a href="https://celestia.org/glossary/data-availability/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">data availability</a>. The two key properties that data availability provides are:

- <a href="https://celestia.org/glossary/liveness/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">Liveness</a>: The blockchain is making progress.
- <a href="https://celestia.org/glossary/safety/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">Safety</a>: Invalid transactions get rejected.

ZK sovereign rollups use <a href="https://celestia.org/glossary/validity-proof/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">validity proofs</a> to prove that all their transactions are correct - this covers the safety aspect. What data availability guarantees in this case is liveness. Without data availability, a ZK sovereign rollup can’t finalize new blocks, causing the chain to halt. Transactions can continue to successfully finalize in blocks so long as the sovereign rollup nodes can read and write data to the DA layer.

For an optimistic sovereign rollup, <a href="https://celestia.org/glossary/state-transition-fraud-proof/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">fraud proofs</a> are used to prove if any transactions are invalid. All transaction data for a block is necessary for fraud proofs to work. That means without data availability, invalid transactions can’t get rejected. Therefore, optimistic sovereign rollups inherit security for liveness and safety guarantees from the DA layer.

##### Re-org resistance & consensus
Another element of security that sovereign rollups inherit is re-org resistance. A re-org attack occurs when a fork changes the blockchain’s history. The history change may remove transactions that were finalized or transactions that were in the process of finalizing.

![GATSBY_EMPTY_ALT](./images/misconceptions-1.png)

Sovereign rollups are protected against re-org attacks because their transactions receive consensus from the DA layer. The DA layer provides consensus to sovereign rollup transactions by ordering and finalizing them on the DA layer. 

Once sovereign rollup transactions get finalized on the DA layer, they will stay finalized as long as the DA layer doesn’t experience a re-org. Therefore, sovereign rollups inherit resistance from re-org attacks and consensus from the DA layer.

##### Censorship resistance
Optionally, sovereign rollups can also inherit censorship resistance from the DA layer. Censorship resistance is a property that sovereign rollups may want to inherit from the DA layer because it can help protect users against malicious or centralized sequencers from censoring their transactions.

There’s two main ways censorship resistance can come from the DA layer:

- **No sequencers**: Users have their transactions sent directly to the DA layer. The DA layer is responsible for including finalizing each individual transaction. Now, the sovereign rollup inherits censorship resistance from the DA layer.
- **Sequencers**: User transactions are published in a block to the DA layer. If the sequencer tries to censor a user, they can send a special inbox transaction directly to the DA layer. The inbox transaction would let users get their transactions included in the rollup chain even if a sequencer was censoring.

#### Sovereign rollups lack bridging options
The native bridges of smart contract rollups have <a href="https://celestia.org/glossary/trust-minimized-bridge/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">trust-minimized</a> security because the settlement layer verifies the rollup’s entire block. Sovereign rollups can’t bridge to the DA layer if it doesn’t verify its transactions, right?

Sovereign rollups can have a bridge with their DA layer. If the DA layer supports smart contracts, the bridge can be trust-minimized, although the bridge may require governance for the rollup to preserve sovereignty. If there is no smart contract support, like with Celestia, then the bridge would require stronger trust assumptions.

Importantly, sovereign rollups can have bridges between each other. These bridges can be trust-minimized if both sovereign rollups use the same DA layer and have fraud or validity proofs. This is possible through light clients that verify proofs of bridged transactions.

![GATSBY_EMPTY_ALT](./images/misconceptions-2.png)

The design space is broad, with <a href="https://blog.celestia.org/sovereign-rollup-chains/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">many possible solutions</a> for secure bridging between sovereign rollups.

#### Sovereign rollups need a settlement layer
Smart contract rollups on Ethereum need a settlement layer. Isn’t that also true for sovereign rollups?

Sovereign rollups do not need a settlement layer because they <a href="https://celestia.org/learn/sovereign-rollups/an-introduction/#what-is-a-sovereign-rollup" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">do their own settlement</a>. The main component of settlement, in this case is <a href="https://celestia.org/learn/modular-settlement-layers/settlement-in-the-modular-stack/#settlement-layers-provide-multiple-purposes-for-rollups" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">transaction verification</a>. Sovereign rollups don’t use the DA layer to verify their transactions. Verification is done by the sovereign rollup nodes instead.

![GATSBY_EMPTY_ALT](./images/soverign-rollups-4.png)

This means sovereign rollups can use a blockchain as a DA layer even if it doesn't support smart contracts like Celestia.

Now, imagine a developer who wants to build a smart contract rollup on a DA layer that doesn't support smart contracts. They can deploy their smart contract rollup on an existing sovereign rollup. The sovereign rollup acts as the <a href="https://celestia.org/learn/modular-settlement-layers/settlement-in-the-modular-stack/#settlement-in-the-modular-stack" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">settlement layer</a>, with a native bridge connection and proof verification.

![GATSBY_EMPTY_ALT](./images/misconceptions-4.png)

These possibilities allow DA layers, even minimal ones like Celestia, to support a wide variation of rollups and other blockchain designs.
