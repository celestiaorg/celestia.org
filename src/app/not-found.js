"use client";
import Container from "@/components/Container/Container";
import { useBanner } from "@/context/BannerContext";
import BorderButton from "@/macros/Buttons/BorderButton";
import PrimaryButton from "@/macros/Buttons/PrimaryButton";
import { Display, Body } from "@/macros/Copy";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

export default function NotFound() {
	const { isBannerVisible } = useBanner();

	return (
		<>
			<Nav />
			<section className='relative min-h-screen bg-white flex items-center justify-center overflow-hidden'>
				{/* Decorative background elements */}
				<div className='absolute inset-0 opacity-5'>
					<div className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-black blur-3xl' />
					<div className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-black blur-3xl' />
				</div>

				<Container size='lg' className={`relative z-10 ${isBannerVisible ? "pt-64 lg:pt-40" : "pt-36 lg:pt-20"} pb-20`}>
					<div className='flex flex-col items-center text-center'>
						{/* 404 - Large display number */}
						<Display size='3xl' className='mb-8 tracking-tight'>
							404
						</Display>

						{/* Error message */}
						<Display size='sm' tag='h1' className='mb-6 max-w-3xl'>
							Page not found
						</Display>

						<Body size='lg' className='mb-12 max-w-2xl text-subtle'>
							The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
						</Body>

						{/* CTA Buttons */}
						<div className='flex flex-col sm:flex-row gap-6 mb-12 w-full sm:w-auto'>
							<PrimaryButton href='/' size='lg' className='min-w-[200px]'>
								Go Home
							</PrimaryButton>
							<PrimaryButton href='/build' size='lg' lightMode className='min-w-[200px]'>
								Start Building
							</PrimaryButton>
						</div>

						{/* Helpful links */}
						<div className='w-full max-w-2xl mt-8'>
							<Body size='sm' className='mb-6 text-black-subtle uppercase tracking-wider'>
								Or explore these sections
							</Body>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<BorderButton href='/what-is-celestia' iconDirection='right'>
									What is Celestia
								</BorderButton>
								<BorderButton href='/ecosystem' iconDirection='right'>
									Ecosystem
								</BorderButton>
								<BorderButton href='/learn' iconDirection='right'>
									Learn
								</BorderButton>
								<BorderButton href='/community' iconDirection='right'>
									Community
								</BorderButton>
							</div>
						</div>
					</div>
				</Container>
			</section>
			<Footer />
		</>
	);
}
