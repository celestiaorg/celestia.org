"use client";
import ScrollText from "../ScrollText";

const WhatIsCelestiaScrollText = () => {
	return (
		<ScrollText id={"what-is-celestia"} lightMode data-header-theme='light'>
			<ScrollText.Mobile gradientText gradientType='secondary'>
				<>Celestia is</>
				<>the modular</>
				<>blockchain</>
				<>powering</>
				<>unstoppable</>
				<>applications</>
				<>with full-stack</>
				<>customizability.</>
			</ScrollText.Mobile>
			<ScrollText.Desktop gradientText gradientType='secondary'>
				<>Celestia is the modular</>
				<>blockchain powering</>
				<>unstoppable applications</>
				<>with full-stack</>
				<>customizability.</>
			</ScrollText.Desktop>
		</ScrollText>
	);
};

export default WhatIsCelestiaScrollText;
