"use client";
import { Body, Heading } from "@/macros/Copy";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { usePlausible } from "next-plausible";

const MediaRow = ({ title, body, buttons, videoSrc, className, index, totalRows }) => {
	const videoRight = index % 2 === 0 ? true : false;
	const trackEvent = usePlausible();

	const handleButtonClick = (buttonText, url, trackEventName) => {
		if (!trackEventName) return;

		trackEvent(trackEventName, {
			props: {
				button: buttonText,
				url: url,
				location: "media_row_section",
				path: window.location.pathname,
			},
		});
	};

	return (
		<div className={`${className}`}>
			<div className={"block relative w-full h-[100vw] overflow-hidden lg:w-1/2 lg:h-auto lg:overflow-visible"}>
				<div className={`lg:absolute lg:top-0 ${videoRight ? "lg:left-0" : "lg:right-0"} lg:h-full lg:w-[50vw]`}>
					<VideoPlayer src={videoSrc} />
				</div>
			</div>
			<div className={"w-full lg:w-1/2 px-4 py-10 lg:py-24 xl:py-44 lg:px-20 xl:px-32"}>
				<div className={`w-full flex`}>
					<div className={"w-3/4 mb-8"}>
						<Heading size={"lg"} tag={"h2"}>
							{title}
						</Heading>
					</div>
					<div className={"w-1/4"}>
						<Body size='sm' className={"text-right"}></Body>
					</div>
				</div>
				<div className={"mb-8"}>
					{body.map((text, index) => {
						return (
							<Body size={"md"} key={index} className={"mb-3 text-black-subtle"}>
								{text}
							</Body>
						);
					})}
				</div>
				{buttons.map((button, index) => {
					return (
						<>
							{button.type === "primary" ? (
								<PrimaryButton
									key={index}
									href={button.url}
									className={"inline-block mr-3 mb-3 group"}
									lightMode
									noBorder={false}
									onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
								>
									{button.text}
								</PrimaryButton>
							) : (
								<SecondaryButton
									key={index}
									href={button.url}
									className={"inline-block mr-3 mb-3 group"}
									lightMode={false}
									noBorder={false}
									onClick={() => handleButtonClick(button.text, button.url, button.trackEvent)}
								>
									{button.text}
								</SecondaryButton>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
};

export default MediaRow;
