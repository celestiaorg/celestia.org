---
path: ""
slug: "/what-is-da"
edit: ""
title: "What is data availability?"
---

<head>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@CelestiaOrg">
  <meta name="twitter:creator" content="Celestia Labs">
  <meta name="twitter:title" content="What is data availability?">
  <meta name="twitter:description" content="This guide is here to help you understand data availability, what a data availability layer is, and the why’s of Celestia’s DA layer."> 
  <meta name="twitter:image" content="https://celestia.org/article-og.png">
</head>

What’s stopping crypto applications from becoming accessible to everyday people?

Well, it’s all because of the data availability constraint that crypto applications face. Data availability (DA) is a pretty misunderstood and unknown topic that is fundamental to blockchains. This guide is here to help you understand data availability, what a data availability layer is, and the why’s of Celestia’s DA layer.

Now first…

#### Why does data availability even matter?

Web apps have massive data requirements, so cloud companies build vast server warehouses to process enough data. Data availability presents a similar scaling bottleneck for crypto applications on all blockchains.

Especially for rollups and layer 2 blockchains, data availability is a significant constraint. Low DA throughput causes excessive fees, restricting the types of apps that developers can build. Overall, data availability is roughly 95% of the costs that rollups pay. And once DA isn’t a constraint, developers can unlock new monetization opportunities and new capabilities for building fully-onchain applications.

For the rest of this guide, we’ll call any chain that uses Celestia a rollup for simplicity.

But data availability isn’t just a resource that rollups consume. DA allows anyone to directly verify that a blockchain is running correctly. Until now, rollups have had to trust small committees to relieve the DA constraint. That means anyone who wants to interact with the rollup must rely on trusted third parties to access and verify the network. So, fixing the DA constraint with proofs instead of committees allows rollups to regain verifiability.

#### What is data availability?

Data availability is about proving data was published to the network. So, when a chain produces new blocks, nodes verify DA by downloading all the data. Although there is a more efficient way to verify DA (more on this later).

Really, data availability is like streaming a sports game. DA lets anyone download transactions to see what happened, just like streaming lets anyone watch a game if they aren’t at the stadium.

The one thing that data availability doesn’t cover is the long-term storage of transaction data. DA is just about publishing data and temporary storage.

![GATSBY_EMPTY_ALT](./images/DA-vs-DS.png)

The difference might not seem important, but DA and long-term data storage actually have <a href="https://docs.celestia.org/learn/how-celestia-works/data-availability-faq" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">varying security properties</a>.

#### Data availability layers

Now there are specialized providers known as data availability layers (DA layers) that supply DA to other chains. Let’s look at two distinct types of DA layers:

- Data availability committees: a small, permissioned committee that is trusted to provide DA.
- DA layers with <a href="https://celestia.org/what-is-celestia/#what-is-data-availability-sampling" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">data availability sampling (DAS)</a>: a decentralized network that provides DA and allows anyone to efficiently verify via DAS.

And a DA layer with DAS is what Celestia is…

#### Celestia’s DA layer

So, what does Celestia’s DA layer actually do? Well, Celestia provides abundant DA to address the scaling bottleneck. And it does this with data availability sampling (DAS). 

DAS is a new technology that enables Celestia to securely increase its blockspace with more users (light nodes). And the way rollups use Celestia is simple. All they really need to do is use Celestia’s DA layer to publish and temporarily access their transaction data.

Now, with ~95% percent lower DA costs, developers can focus on improving their app without the burden of high fees or unnecessary gas cost optimizations. Ultimately, low-cost DA unlocks new capabilities for developers to build fully onchain apps, like onchain games or generative art. See the <a href="https://www.datalenses.zone/chain/celestia/calculator" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">cost savings for your chain</a> with Celestia underneath.

The other important aspect of DAS is that it enables users to secure and directly verify  Celestia. Without DAS, DA layers have to give up verifiability and security for higher throughput. So users have to trust validators or committees to ensure the chain is running correctly. With DAS, users can secure and directly verify Celestia’s DA layer with proofs instead of a trusted committee.

#### How developers can build on Celestia’s DA layer

You can launch your chain as easily as a smart contract with Celestia underneath. Here’s how you can start:

- Deploy fast with an <a href="https://celestia.org/build/#build" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">Ethereum L2 using leading rollup frameworks</a>.
- Transform nearly any VM into its <a href="https://celestia.org/build/#build" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">own sovereign chains</a>.
- One-click deployment on managed infrastructure using a <a href="https://celestia.org/deploy/" target="_blank" rel="noopener noreferrer" style="color:#7B2BF9;">Rollups-as-a-Service provider</a>.

#### To sum it all up

- Data availability is a core scaling bottleneck for crypto applications and is the vast majority of costs that rollups and Layer 2s pay.
- Data availability is about proving that data was published by allowing anyone to download it for a short period of time.
- A DA layer is a blockchain that rollups and L2s publish their transaction data to.
- Celestia’s DA layer eliminates data availability as a core scaling bottleneck, dropping costs for developers by ~95% and enabling them to build fully-onchain apps.
