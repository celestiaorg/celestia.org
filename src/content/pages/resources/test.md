---
path: "/resources/"
slug: "/resources/test"
date: "2020-11-11"
title: "Optimistic Rollups for the Rest of Us"
image: "resources/test-resource/main-image.png"
author: {name: "John Doe", avatar: "authors/JohnAdler.png"}
sidemenu: "true"
---

Optimistic rollups (ORUs) are the most promising avenue for scaling Ethereum - and blockchains in general - today. But what are they, and why are Ethereum developers and scalability researchers so excited about them?

In this post, we’ll explore the fundamentals of ORUs in an approachable manner. For a more technical deep-dive, see here.

#### Features

###### ORUs have many desirable features, the combination of which is mostly unmatched across all blockchain scaling techniques. A properly-designed system will have all these properties:**


1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.
1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.
1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.
1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.
1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.
1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.
1. Trustless. Unlike traditional sidechains, ORUs are trustless (or, if you want to be technical, trust-minimized). You don't have to trust that a majority of the URU's block producers are honest to always be able to withdraw your funds from the rollup.

#### A Brief History of Optimistic Rollups

One of the earliest attempts to improve and extend Bitcoin was sidechains. A sidechain is a blockchain that runs alongside a parent chain, and can have different properties: shorter block times, larger blocks, more expressive smart contracts, etc. However, plain sidechains have a fatal flaw: user funds can be stolen if a majority of a sidechain’s miners/validators are dishonest.

There were many techniques throughout the years that attempted to augment sidechains by guaranteeing user funds cannot be stolen even under such a dishonest majority (called a trust-minimized two-way peg). Earlier examples include merged mining, shadow chains and later Plasma and ZK rollups. Interestingly, a very close precursor to ORU is delayed state execution in the context of sharding (we’ll come back to this soon!).

The research happening on these many fronts culminated in the publishing of a concrete description of the technique we now know as "optimistic rollups" in June 2019 under the title Minimal Viable Merged Consensus. Since then, the Ethereum community has embraced ORUs wholeheartedly as a way to scale Ethereum-style smart contract execution without having to wait for Serenity Phase 2.

> Dorothy followed her through many of the beautiful rooms in her castle.

#### How Do Optimistic Rollups Work?


[^1]: This is the footnote.
