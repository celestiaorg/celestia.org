---
path: "/glossary/"
slug: "/glossary/data-withholding-attack/"
template: "glossaryTemplate"
title: "Data withholding attack"
description: "A type of attack that occurs when a block producer proposes a new block but does not share the underlying transaction data that was used to create the block."
---

A type of attack that occurs when a block producer proposes a new block but does not share the underlying transaction data that was used to create the block. Blockchains typically ensure proposed blocks are available by requiring validators to download the entire block and vote on whether the block was valid or not. If the majority of the validator set is malicious and votes that a block with unavailable data is valid, it will be added to the chain but rejected by full nodes.

While full nodes can verify that the block is invalid by fully downloading it, light clients have no such mechanism as they only download the block header. Techniques such as data availability sampling can provide light clients with a method to verify data availability without having to download the entire block, allowing them to retain minimal resource requirements.