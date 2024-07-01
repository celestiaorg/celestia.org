---
path: "/glossary/"
slug: "/glossary/the-data-availability-problem/"
template: "glossaryTemplate"
title: "The data availability problem"
description: "A problem that is concerned with whether the data in the proposed block can be verified that it is available."
---

The problem with data availability occurs when the transaction data for a newly proposed block cannot be downloaded and verified. This type of attack by a block producer is called a [data withholding attack](https://celestia.org/glossary/data-withholding-attack), which sees the block producer withhold transaction data of a new block.

Since transaction data is withheld, nodes cannot update to the latest state. Such an attack can have numerous consequences, from halting a chain to gaining the ability to steal funds. The severity of the consequences will depend on the type of blockchain (L1 or L2) and whether data availability is kept on-chain or off-chain. The data availability problem commonly arises around L2 scaling solutions like [rollups](https://celestia.org/glossary/rollup) and [validiums](https://celestia.org/glossary/validium).

Read more about [the data availability problem](https://coinmarketcap.com/alexandria/article/what-is-data-availability/).