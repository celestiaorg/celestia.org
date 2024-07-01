---
path: "/glossary/"
slug: "/glossary/liveness/"
template: "glossaryTemplate"
title: "Liveness"
description: "Liveness is a property of blockchains where validators produce new blocks and successfully finalize transactions."
---

Liveness is a property of blockchains where validators produce new blocks and successfully finalize transactions. In the case where a blockchain stops producing blocks, it is said to have halted and had a liveness failure. An example of a liveness failure would be if ⅓ of stake in a Tendermint chain stops signing new blocks so no new blocks can get finalized. Simply put, liveness should guarantee that something good eventually happens.