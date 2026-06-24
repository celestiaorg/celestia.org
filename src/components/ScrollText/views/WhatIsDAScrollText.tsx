"use client";
import ScrollText from "../ScrollText";

const WhatIsDAScrollText = () => {
	return (
		<ScrollText id={"what-is-celestia"} lightMode data-header-theme='light'>
			<ScrollText.Mobile gradientText gradientType='secondary'>
				<>Mammoth</>
				<>blocks for</>
				<>unstoppable</>
				<>apps</>
			</ScrollText.Mobile>
			<ScrollText.Desktop gradientText gradientType='secondary'>
				<>Mammoth blocks</>
				<>for unstoppable apps</>
			</ScrollText.Desktop>
		</ScrollText>
	);
};

export default WhatIsDAScrollText;
