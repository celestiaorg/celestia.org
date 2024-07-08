const content = {
  title: 'Technology',
  subtitle: 'Celestia is pioneering a new paradigm in blockchain design. A minimal, modular consensus layer for rollups.',
  columnSection: {
    title: 'Celestia is for decentralized apps what cloud computing is for the traditional web.',
    subtitle: 'Web infrastructure evolved from individual servers, to shared hosting services and finally individual virtual machines on a shared server. Similarly, decentralized infrastructure is evolving from individual execution chains to shared execution chains and finally individual execution chains on a shared consensus layer.',
    columns: [{
      title: 'Early web<br/>(1990s)',
      text: 'Each website had its own physical server.',
      image: 'technology/column-1.svg',
    }, {
      title: 'Early crypto ecosystem <br/> (2008+)',
      text: 'Each dapp had its own blockchain and consensus.',
      image: 'technology/column-2.svg'
    }, {
      title: 'Developing web <br/> (2000s)',
      text: 'Website used shared hosting providers.',
      image: 'technology/column-3.svg'
    }, {
      title: 'Developing crypto ecosystem<br/>(2014+)',
      text: 'Dapps used shared smart contract blockchains.',
      image: 'technology/column-4.svg'
    }, {
      title: 'Modern web <br/>(2010s)',
      text: 'Websites run on virtual machines, that share physical machines.',
      image: 'technology/column-5.svg'
    }, {
      title: 'Modern crypto ecosystem<br/>(2021+)',
      text: 'Dapps run on app-specific chains, that share consensus layers.',
      image: 'technology/column-6.svg'
    },
    ]
  }
}


const Technologies = [
  {
    title: 'Separation of consensus and execution layers',
    text: 'Standard “world computer" blockchains bundle consensus and execution while Celestia decouples them. Celestia provides a pluggable consensus layer, allowing developers to deploy their own execution layers to run on top. This enables more customizability and sovereignty for applications built on Celestia.',
    direction: 'ltr'
  }, {
    title: 'Data availability proofs',
    text: 'Celestia uses a 2-dimensional reed-solomon encoding scheme to encode block data such that only a small sample of data is enough to verify with statistical certainty that the entire block has been published. If data is incorrectly encoded, the network is notified via a data availability fraud proof.',
    direction: 'rtl'
  }, {
    title: 'Rollups for off-chain execution',
    text: 'Celestia is perfectly suited for a novel scaling solution called rollups which push state execution off-chain and rely on a base chain for consensus and data availability. Optimistic rollups require data availability to detect fraud and zero-knowledge rollups require data availability to reconstruct the state of the chain.',
    direction: 'ltr'
  }, {
    title: 'Secure light clients for interoperability',
    text: 'Cross-chain interoperability relies on light clients which are typically not secure because they make an honest majority assumption. Light clients in Celestia do not make an honest majority assumption, unlocking truly secure cross-chain interoperability. Connecting chains will be as simple as deploying a smart contract.',
    direction: 'rtl'
  }
]

const FooterBoxes = [
  {
    title: 'Journey into modular',
    text: 'Start your deep dive on modular blockchains.',
    button: {
      text: 'Learn modular',
      href: '/learn/',
      id: 'operator',
      type: 'simple'
    }
  }, {
    title: 'Build on testnet',
    text: 'Join a growing modular ecosystem of developers building on testnet.',
    button: {
      text: 'Get started',
      href: 'https://docs.celestia.org/',
      id: 'operator',
      type: 'simple'
    }
  }
]



export default async function Technology() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>{content.title}</h1>
        <p className={``}>{content.text}</p>
      </div>

      <hr />

      {/* TECHNOLOGY */}
      <div className={`pb-10`}>
        {Technologies.map((technology, index) => (
          <div key={index}>
            <h2>{technology.title}</h2>
            <p>{technology.text}</p>
          </div>
        ))}
      </div>

      {/* TECHNOLOGY */}
      <div className={`pb-10`}>
        <h2 className={``}>{content.columnSection.title}</h2>
        <p className={``}>{content.columnSection.subtitle}</p>
        {content.columnSection.columns.map((section, index) => (
          <div key={index}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </main >
  );
}