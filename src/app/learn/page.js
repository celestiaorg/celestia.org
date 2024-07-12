import TertiaryHero from "@/components/Heroes/TertiaryHero";

export default async function Learn() {
  return (
    <>
      {/* HERO */}
      <TertiaryHero
        title={"Dive into modular"}
        pageIndicator={"2-4"}
        ctaIndicator={"0-0"}
        buttons={[
          {
            text: "Suggest an edit",
            url: "#",
          },
        ]}
        blurbTitle={"Modular blockchains are amazing, right?"}
        blurbCopy={
          <>
            You’ve probably heard something along those lines. Maybe from a
            friend or someone on twitter. Now you’re trying to figure out what a
            modular blockchain is. Well, this page is for you.
            <br />
            <br />
            Whether you’re a developer, researcher, or a blockchain enthusiast,
            Learn Modular was made to help anyone easily understand modular
            blockchains.
          </>
        }
      />

      {/* INTRO */}
      <div className={`pb-10`}>
        <p>
          Celestia is a modular data availability (DA) network that securely
          scales with the number of users, making it easy for anyone to launch
          their own blockchain.
        </p>
        <p>
          Rollups and L2s use Celestia as a network for publishing and making
          transaction data available for anyone to download. For them, Celestia
          provides high-throughput DA that can be verified easily with a light
          node.
        </p>
        <p>
          And by making the blockchain stack modular, anyone can launch their
          own blockchain without needing a validator set.
        </p>
      </div>

      <hr />

      {/* WHY */}
      <div className={`pb-10`}>
        <h2>Why Celestia?</h2>
        <h3 className={"why-use-title"}>Deploy fast</h3>
        <p className={"why-use-text"}>
          Deploy your own customizable blockchain as easily as a smart contract.
        </p>
        <h3 className={"why-use-title"}>Use any VM</h3>
        <p className={"why-use-text"}>
          Transform nearly any virtual machine into your own sovereign chain.
        </p>
        <h3 className={"why-use-title"}>Access abundant throughput</h3>
        <p className={"why-use-text"}>
          Unlock dynamic throughput that scales with the number of users.
        </p>
        <a
          className="link"
          href="https://celestia.org/build/"
          target="_blank"
          rel="noreferrer"
        >
          Build whatever
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
          >
            <path
              stroke="#7B2BF9"
              strokeLinecap="square"
              strokeWidth="1.5"
              d="M3.61218 12.0721L11.0761 4.60823"
            />
            <path
              stroke="#7B2BF9"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              strokeWidth="1.5"
              d="M11.5254 11.0752V4.00413H4.45432"
            />
          </svg>
        </a>
      </div>

      <hr />

      {/* WHAT */}
      <div className={`pb-10`}>
        <h2>What is data availability and why does it matter?</h2>
        <p>
          Data availability answers the question, has the data for this
          blockchain been published? It is critical to the security of any
          blockchain because it ensures that anyone can inspect the ledger of
          transactions and verify it.
        </p>
        <p>
          Users of a monolithic blockchain usually download all the data to
          check that it is available.
        </p>
        <p>
          As blocks get bigger, it becomes impractical for normal users to
          download all the data meaning that they can’t verify the chain.
          Modular chains solve this problem by making it possible for users to
          verify very large blocks using a technology called data availability
          sampling.
        </p>

        <h2 className="title">Now what&apos;s data availability sampling?</h2>
        <div className={"image-box--different"}>
          <div className="image-wrapper">placeholder image</div>
        </div>
        <p>
          Data availability sampling (DAS) is the new primitive that enables
          Celestia light nodes to verify DA efficiently. Instead of downloading
          all data, light nodes only download a tiny portion of each block.
        </p>
        <p>
          Importantly, DAS allows Celestia to scale with the number of users
          (light nodes). So, as the light node network grows over time, Celestia
          can scale to the data throughput needed for millions of rollups
          without compromising on security for end users.
        </p>

        <h2 className="title">And what is a modular blockchain?</h2>
        <div className={"image-box--different"}>
          <div className="image-wrapper">placeholder image</div>
        </div>
        <p>
          Modular blockchains are a new paradigm in blockchain design. Instead
          of one blockchain doing everything, modular blockchains specialize and
          optimize to perform a given function. This specialization provides
          breakthroughs in scalability, flexibility, and interoperability,
          enabling developers to build blockchain applications for mass
          adoption.
        </p>
      </div>
    </>
  );
}
