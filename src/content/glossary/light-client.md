---
path: "/glossary/"
slug: "/glossary/light-client/"
template: "glossaryTemplate"
title: "Light client"
description: "A type of node that only downloads and verifies block headers, relying on an honest majority assumption that the state of the chain indicated by the block header is valid."
---

A type of node that only downloads and verifies block headers, relying on an honest majority assumption that the state of the chain indicated by the block header is valid.

Since light clients aren’t required to download and execute transactions like full nodes, they are able to run on considerably cheaper hardware, at the expense of weaker security guarantees.

However, Celestia light clients (known as light nodes) do not make an honest majority assumption for state validity because they can also verify the body of the block through data availability sampling.