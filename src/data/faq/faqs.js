import { Link } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

export const faqs = [
  {
    question: "What is Celestia?",
    answer: (
      <>
        Celestia is a new technology that powers, scales, and secures web3
        applications. To achieve this, Celestia introduces a new blockchain
        architecture to solve the core scaling challenges of today’s
        blockchains. This new architecture is what we call modular blockchains.
        <br />
        <br />
        Visit the{" "}
        <Link
          href="https://celestia.org/what-is-celestia"
          target="_blank"
          rel="noreferrer"
        >
          what is Celestia page
        </Link>{" "}
        to learn more.
      </>
    ),
  },
  {
    question: "What is a modular blockchain?",
    answer: (
      <>
        Modular blockchains are a new paradigm in blockchain design. Instead of
        one blockchain doing everything, modular blockchains specialize and
        optimize to perform a given task. This specialization provides
        breakthroughs in scalability, flexibility, and interoperability,
        enabling developers to build blockchain applications for mass adoption.
        <br />
        <br />
        Want to dive in on modular blockchains? Explore{" "}
        <Link
          href="https://celestia.org/learn"
          target="_blank"
          rel="noreferrer"
        >
          Learn Modular
        </Link>
        .
      </>
    ),
  },
  {
    question: "How does Celestia scale?",
    answer:
      "Celestia introduces a new feature called data availability sampling. This feature allows Celestia to safely increase its block size as more light nodes join the network. Importantly, block size increases don’t reduce Celestia’s security or decentralization, unlike traditional blockchains.",
  },
  {
    question: "What programming languages and VMs are supported by Celestia?",
    answer:
      "Because of Celestia’s modular architecture, it can support any programming language or VM. Currently supported languages include Solidity (EVM), Rust & Golang (Cosmos SDK). Developers are free to use any existing language and VM or define their own.",
  },
  {
    question: "Where can developers get started?",
    answer: (
      <>
        Developers can head to the{" "}
        <Link href="https://docs.celestia.org/">docs</Link> to get started with
        building on Celestia.
      </>
    ),
  },
  {
    question: "How do I run a node on Celestia?",
    answer: (
      <>
        Celestia supports multiple testnets that users can run nodes on in
        preparation for mainnet. Information on running testnet nodes is
        available in our{" "}
        <Link
          href="https://docs.celestia.org/"
          target="_blank"
          rel="noreferrer"
        >
          documentation
        </Link>
        .
      </>
    ),
  },
  {
    question: "Will Celestia have a token and if so, what will it be used for?",
    answer:
      "Celestia is designed to have a token used to secure the network via Proof of Stake and to pay for transaction fees on the network, and eventually a fee burn mechanism similar to EIP-1559 in Ethereum.",
  },
];
