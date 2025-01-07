import TertiaryHero from "@/components/Heroes/TertiaryHero";
import TertiaryPageContainer from "@/components/Container/TertiaryPageContainer";
import { Body } from "@/micros/TertiaryPageMicors/TertiaryPageMicors";
import SecondaryButton from "@/macros/Buttons/SecondaryButton";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";

export default function NotFound() {
	return (
		<>
			<TertiaryHero title='404' blurbTitle='Page not found' blurbCopy="The page you're looking for doesn't exist or has been moved." />
			<TertiaryPageContainer>
				<TertiaryPageContainer.Body>
					<div className='flex flex-col items-center justify-center py-10 lg:py-24'>
						<Body className='mb-8 text-center'>Let&apos;s get you back on track. Check out these helpful links:</Body>
						<div className='flex flex-col gap-4 sm:flex-row'>
							<PrimaryButton href='/' size='md' className='uppercase' dark>
								Go home
							</PrimaryButton>
							<SecondaryButton href='/build' size='md' className='uppercase' lightMode hover>
								Start building
							</SecondaryButton>
						</div>
					</div>
				</TertiaryPageContainer.Body>
			</TertiaryPageContainer>
		</>
	);
}
