"use client";
import ScrollText from "../ScrollText";

const CareersScrollText = () => {
	return (
		<ScrollText id={"what-is-celestia"} lightMode data-header-theme='light'>
			<ScrollText.Mobile gradientText gradientType='secondary'>
				<>Make chains</>
				<>as easy to</>
				<>deploy as</>
				<>smart contracts</>
			</ScrollText.Mobile>
			<ScrollText.Desktop gradientText gradientType='secondary'>
				<>Make chains as</>
				<>easy to deploy</>
				<>as smart contracts</>
			</ScrollText.Desktop>
		</ScrollText>
	);
};

export default CareersScrollText;
