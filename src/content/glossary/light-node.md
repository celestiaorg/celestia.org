---
path: "/glossary/"
slug: "/glossary/light-node/"
template: "glossaryTemplate"
title: "Light node"
description: "In Celestia, a light node is a type of node that verifies block headers and does data availability sampling."
---

In Celestia, a light node is a type of node that verifies block headers and does [data availability sampling](https://celestia.org/glossary/data-availability-sampling/). Data availability sampling gives Celestia light nodes increased security compared to typical [light clients](https://celestia.org/glossary/light-client/) because it lets them detect invalid blocks that have had [data withheld](https://celestia.org/glossary/data-withholding-attack/) by block producers.

Since light nodes don’t download all block data or execute transactions, they can run on [considerably cheaper hardware](https://docs.celestia.org/nodes/overview/) than full nodes.