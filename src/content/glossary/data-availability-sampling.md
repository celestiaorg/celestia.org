---
path: "/glossary/"
slug: "/glossary/data-availability-sampling/"
template: "glossaryTemplate"
title: "Data availability sampling"
description: "A technique in which nodes can verify that data is available for a block without having to download the entire block, formerly known as data availability proofs."
---

Data availability sampling is a mechanism for light nodes to verify data availability without having to download all data for a block. Data availability sampling (DAS) works by having light nodes conduct multiple rounds of random sampling for small portions of block data. As a light node completes more rounds of sampling for block data, it increases its confidence that data is available. Once the light node successfully reaches a predetermined confidence level (e.g. 99%) it will consider the block data as available.

When implemented in blockchain designs like Celestia, data availability sampling enables light nodes to contribute to both the security and throughput of the network with significantly cheaper hardware than that of full nodes.