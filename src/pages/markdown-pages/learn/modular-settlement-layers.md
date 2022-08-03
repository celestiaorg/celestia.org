---
path: "/learn/"
slug: "/learn/modular-settlement-layers"
edit: "https://github.com/celestiaorg/celestia.org/tree/main/src/pages/markdown-pages/learn/modular-settlement-layers.md"
date: "2022-04-01"
icon: "/images/modular-settlement-layer.png"
title: "Modular settlement layers"
description: "Settlement layers in the modular paradigm."
---

<head>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@CelestiaOrg">
  <meta name="twitter:creator" content="@likebeckett">
  <meta name="twitter:title" content="Modular Settlement Layers">
  <meta name="twitter:description" content="By beginning with the first principles of modular blockchains, their purpose and goals will become easier to understand.">
  <meta name="twitter:image" content="https://raw.githubusercontent.com/celestiaorg/celestia.org/main/src/pages/markdown-pages/learn/images/learn-modular-twitter-card.png">
<head/>


#### Summary 
* A settlement layer is a blockchain used in either of the following ways; providing finality for transactions or as a bridging hub.
* Settlement layers provide multiple purposes for rollups, which include proof verification & dispute resolution, a hub to facilitate cross-rollup bridging, and a source of liquidity.
* An ideal settlement layer can provide maximal block space for execution layers by disincentivizing applications from deploying on the settlement layer.
* By introducing fraud or validity proofs, a settlement layer can enhance the security of light clients, allowing them to verify valid or invalid blocks.

#### Introduction
The modular blockchain paradigm creates many potential configurations in which blockchains can connect. Since modular blockchains only handle a subset of functions, more specialization can be facilitated. Settlement is one function, in particular, that can become optimized and specialized by a modular blockchain. 


#### Settlement layers
A settlement layer is a chain that is used in either of the following ways; providing finality for transactions or as a bridging hub.

Transactions executed on a rollup receive finality from a settlement layer once validity proofs have been verified or once a dispute window has passed, depending on whether it's an optimistic or zk rollup. For example, Ethereum is a settlement layer because it provides finality to rollups that use it.

A chain that enables tokens to get bridged from one chain to another is also a settlement layer. For example, the Cosmos Hub is used in the Cosmos ecosystem as a hub to facilitate token transfers between other Cosmos chains. Additionally, rollups can use the same settlement layer to bridge between each other.

##### Settlement layers provide multiple purposes for rollups:
* Proof verification & dispute resolution: A place for rollups to publish their proofs for external verification. This is especially useful for optimistic rollups that rely on interactive fraud proofs. 
* Hub to facilitate bridging: Rollups can bridge between each other if they through a common settlement layer. A hub removes the need for all rollups to have a bridge between each other.
* Liquidity source: Liquidity that lives on the settlement layer can be utilized by all rollups on top.

#### Settlement in the modular stack 
Many blockchains can be used as settlement layers, though most of them are monolithic chains that are not specialized for settlement. A settlement layer in the modular stack can decouple the settlement functionality, which is execution, from the remaining functions, consensus, and data availability. Since a modular settlement layer can take the form of a rollup, it can also be referred to as a settlement rollup.

![GATSBY_EMPTY_ALT](./images/modular-stack.png)

In the three-layer modular stack, the rollup at the top is where user-facing applications live. Like a typical rollup, it publishes batches of transactions to a settlement layer and pays a fee in its designated token. From there, the rollup doesn’t need to have any direct contact with Celestia. The settlement layer will independently build its own batches, which will include transaction data from the rollup, and publish them to Celestia.

Alternatively, the rollup could publish its transaction data directly to Celestia and its proofs to the settlement layer separately. Regardless, the process is abstracted away from users and apps as they are only exposed to the requirements on the rollup, such as the gas token and wallet type.

#### Specialized settlement layers
The primary purpose of settlement layers is to cater to the rollups that deploy on top. To create an optimal settlement layer for them, multiple optimizations are possible.
Settlement layers can provide maximal block space to rollups by restricting or heavily disincentivizing applications from launching on the settlement layer. If users are interacting with settlement layer applications, they are simultaneously competing with the rollups for block space. Instead, user-facing applications should live on dedicated execution layers. A settlement layer without user-facing applications can provide maximal capacity for its rollups.

By introducing fraud or validity proofs, the settlement layer can create trust-minimized light clients. Security increases because settlement layer light clients can receive and verify a proof that a block is valid or invalid. Now light clients can reject invalid blocks, unlike naive light clients that get fooled by a dishonest majority of validators. As a result, any execution layers that want to verify the settlement layer don’t have to run a full node but can instead run a secure light node. 
