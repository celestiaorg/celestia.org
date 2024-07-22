import Container from "@/components/Container/Container";
import {
  Heading,
  Body,
  Image,
  ListItem,
  Section,
} from "@/micros/TertiaryPageMicors/TertiaryPageMicors";

const ModularBlockchainsForBeginners = () => {
  return (
    <Container size={"lg"}>
      <div className="block lg:flex flex-row-reverse lg:gap-20 items-stretch">
        <div className="w-full lg:w-1/4">
          <div className="py-10 lg:py-20 lg:sticky lg:top-[120px] z-20">
            PLACEHOLDER FOR SIDEBAR NAVIFGATION
          </div>
        </div>
        <div className="w-full lg:w-3/4 py-10 lg:py-20">
          <Section id={"limits-of-monolith"}>
            <Heading tag={"h2"}>The limits of monolithic</Heading>
            <Body>
              Most blockchains today are monolithic, so it only makes sense to
              understand what they are before we explain what modular means.
            </Body>
            <Body>
              A monolithic chain is a generalist blockchain that performs all
              tasks. Really, the monolithic approach is “do everything
              yourself”.
            </Body>
            <Image
              src={
                "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
              }
              alt={""}
            />
            <Body>
              Some blockchains that fall into this monolithic category include
              Solana and Sui.
            </Body>
            <Body>
              We can’t forget that monolithic chains were a big first step. They
              showed us that you could build all sorts of new applications using
              blockchains. Once people started building and using apps on them,
              they ran into some difficulties.
            </Body>
            <ListItem>
              You can’t build anything you like. Sharing space on someone else’s
              blockchain limits what you can build for your app.
            </ListItem>
            <ListItem>
              Expensive apps. High fees can creep up, making apps unaffordable.
            </ListItem>
            <ListItem>
              Access isn’t open to all. Raising capacity usually means fewer
              people can afford to check that the network is running correctly.
            </ListItem>
            <Body>
              Many of these difficulties make monolithic blockchains difficult
              to use or miss the reasons why we use blockchains in the first
              place.
            </Body>
          </Section>
          <Section id={"what-is-a-modular-blockchain"}>
            <Heading tag={"h2"}>What is a modular blockchain?</Heading>
            <Body>
              In the last few years, a new approach to building blockchains
              emerged. That new approach is what people are calling “modular
              blockchains”. But what are they exactly?
            </Body>
            <Body>
              Well, modular blockchains are specialists. They perform only one
              or two tasks - the opposite of monolithic chains.
            </Body>
            <Image
              src={
                "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
              }
              alt={""}
            />
            <Body>
              Modular chains don’t sit alone, though. Multiple of them combine
              to perform all the tasks a monolithic chain does by itself. This
              combination of chains is what we call a modular stack.
            </Body>
            <Image
              src={
                "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
              }
              alt={""}
            />
            <Body>
              There might be some unfamiliar terms in the image above, like data
              availability or execution. Don’t worry. We’ll go over those in
              later articles.
            </Body>
            <Body>
              You can think about modular blockchains like Lego pieces. You can
              mix and match Legos to create different structures, just like you
              can mix and match modular blockchains to create different modular
              stacks.
            </Body>
            <Body>
              In the modular category we have blockchains like Celestia
              and rollups. Rollups host applications and do many of the same
              things that monolithic blockchains do. What makes a rollup modular
              is that it uses another blockchain, like Celestia, to complete the
              tasks it doesn’t do.
            </Body>
            <Image
              src={
                "/images/app/learn/beginners/modular-blockchains-for-beginners/limits-of-monolithic.jpg"
              }
              alt={""}
            />
            <Body>
              As you can tell, modular chains specialize and work together to do
              all the tasks a single monolithic chain does. If there’s one thing
              you should take away about modular and monolithic chains, it’s
              that:
            </Body>
            <ListItem>Monolithic = generalis</ListItem>
            <ListItem>Modular = specialist</ListItem>
          </Section>
          <Section id={"why-modular-blockchains"}>
            <Heading tag={"h2"}>Why is modular an improvement?</Heading>
            <Body>
              You know what modular blockchains are now. But, how do they
              improve upon the difficulties that monolithic blockchains face?
            </Body>
            <Heading size={"sm"} tag={"h3"}>
              Modular chains let you build whatever you want
            </Heading>
            <Body>
              Celestia is really simple for a reason. Without execution,
              Celestia has way fewer restrictions on how applications and
              modular blockchains can be built on it. The wide design space
              includes everything from new virtual machines to unique privacy
              models and new types of blockchain architectures. That only
              scratches the surface.
            </Body>
            <Body>Really, devs can build whatever they want.</Body>
            <Heading size={"sm"} tag={"h3"}>
              Modular chains let you make apps cheap to use
            </Heading>
            <Body>
              And of course, we want to do all of this while keeping it cheap
              for users to play around with applications.
            </Body>
            <Body>
              Data availability sampling is the technology that Celestia uses to
              make this happen. The name might sound confusing. But, all it
              means is that Celestia can provide more capacity for applications
              as more users join the network.
            </Body>
            <Heading size={"sm"} tag={"h3"}>
              Modular chains let you create open access for all
            </Heading>
            <Body>
              But, if people can’t afford to check the chain, then it’s not that
              much different than using a centralized application. That’s why
              it&apos;s essential to keep it inexpensive for people to confirm
              the blockchain is running correctly.
            </Body>
            <Body>
              Technologies like data availability sampling and fraud or validity
              proofs are used by modular blockchains to make this possible. As
              you journey down the modular rabbit hole, you’ll see these terms
              come up quite a bit. All you need to know for now is that they can
              help make blockchains really inexpensive for people to check
              they’re running correctly.
            </Body>
          </Section>
          <Section id={"conclusion"}>
            <Heading tag={"h2"}>Conclusion</Heading>
            <Body>
              And that’s the simplified version of modular and monolithic
              blockchains. Monolithic blockchains came first to show us what was
              possible with decentralized applications. And now we have modular
              blockchains to take the ideas further, while sticking to the
              values we love about blockchains.
            </Body>
          </Section>
        </div>
      </div>
    </Container>
  );
};

export default ModularBlockchainsForBeginners;
