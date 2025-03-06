import Container from "@/components/Container/Container";
import PrimaryHeroDark from "@/components/Heroes/PrimaryHeroDark";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Body, Display } from "@/macros/Copy";
export default async function Home() {
	return (
		<>
			<PrimaryHeroDark
				headline={`Lazybridging testnet`}
				subheadline={<>Hangout with the Celestia community IRL or online.</>}
				buttons={[
					{ text: "try 1-click interaction", url: "/build" },
					{ text: "Build with lazybridging", url: "#explore-celestia" },
				]}
				backgroundImage='/images/app/lasybridge/celestia_lazybridging_bg.png'
			/>

			<section className='py-24 bg-black'>
				<Container size={"lg"}>
					<Display
						size={"sm"}
						className={`mb-8 max-w-[731px]`}
						style={{
							background: "linear-gradient(58.28deg, #FFFFFF -5.81%, #9747FF 109.36%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							textFillColor: "transparent",
						}}
					>
						Build whatever with instant access to users and assets
					</Display>
					<Body size={"lg"} className={`mb-8 text-white`}>
						Today, buildings apps on rollups often means trading off access to users and liquidity on other chains due to fragmentation.
					</Body>
					<Body size={"md"} className={`mb-8 text-white`}>
						Lazybridging aims to eliminate this tradeoff, enabling a unified onchain experience for end-users while giving developers the
						best of all worlds: the freedom to build whatever and instant access to users and assets on all other major blockchains.
					</Body>
					<PrimaryButton href={"#"} className={"inline-block mr-3 mb-3 group"} noBorder={false}>
						Continue
					</PrimaryButton>
				</Container>
			</section>
			<div className='block h-10 -mb-10 bg-black w-fill'></div>
		</>
	);
}
