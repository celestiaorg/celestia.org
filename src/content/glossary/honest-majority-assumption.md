---
path: "/glossary/"
slug: "/glossary/honest-majority-assumption/"
template: "glossaryTemplate"
title: "Honest majority assumption"
description: "The assumption that a majority of blockchain participants (such as the validator set) are honest and follow the rules of the protocol."
---

The assumption that a majority of blockchain participants (such as the validator set) are honest and follow the rules of the protocol. If a majority of participants are dishonest, attacks can be made that are within the rules of the protocol but cause negative effects.

Honest majority assumptions can come in many forms. For example, light clients make an honest majority assumption about state validity because they don't verify transactions. If a majority of validators are dishonest and create invalid blocks, light clients can't verify that the blocks are invalid because from their perspective the blocks received consensus from a majority of the validator set.