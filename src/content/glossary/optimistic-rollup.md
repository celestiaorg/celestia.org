---
path: "/glossary/"
slug: "/glossary/optimistic-rollup/"
template: "glossaryTemplate"
title: "Optimistic rollup"
description: "A type of rollup that posts its blocks to a separate chain without any cryptographic proofs that attest to their validity."
---

A type of rollup that posts its blocks to a parent chain without any cryptographic proofs that attest to their validity. The parent chain receives the block with the corresponding signatures and optimistically assumes the transactions are correct.

If a block is suspected to be invalid, a dispute window is provided where the blocks are open to be challenged. If a block is challenged, a fraud proof will be used to verify whether it is invalid. Once the dispute window has closed, the block is considered final and no new challenges can be made.

Read more about [optimistic rollups](https://coinmarketcap.com/alexandria/article/optimistic-rollups-for-the-rest-of-us/).