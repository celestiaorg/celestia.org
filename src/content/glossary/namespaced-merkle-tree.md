---
path: "/glossary/"
slug: "/glossary/namespaced-merkle-tree/"
template: "glossaryTemplate"
title: "Namespaced Merkle Tree"
description: "A Namespaced Merkle Tree (NMT) is a type of binary Merkle tree where each node in the tree is tagged by the minimum and maximum namespace of their children."
---

A Namespaced Merkle Tree (NMT) is a type of binary Merkle tree where each node in the tree is tagged by the minimum and maximum namespace of their children. The leaves in the tree are ordered by the namespace identifiers of the messages. This enables Merkle proofs of inclusion to be created that prove to a verifier all elements of the tree of a specific namespace have been included. Celestia uses an NMT to make it easy to prove inclusion of data for rollups.