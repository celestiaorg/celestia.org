---
path: "/glossary/"
slug: "/glossary/state-transition-fraud-proof/"
template: "glossaryTemplate"
title: "State transition fraud proof"
description: "A method for proving that a state transition is invalid."
---

A method for proving that a state transition is invalid. Optimistic rollups are a type of blockchain that utilize fraud proofs to prove invalid state transitions. Since fraud proofs only assess if fraud took place, they are only required during situations where a state transition is disputed.

A simple construction of a fraud proof requires nodes to re-execute the transaction(s) that were part of the disputed state transition. However, this can become prohibitively expensive if the blockchain they are being re-executed on has high gas fees. To avoid this, fraud proofs have been constructed that involve interactive verification games (IVGs) that narrow down the disputed state transition to just the key computation step in question, which is then re-executed to assess if it is fraudulent.