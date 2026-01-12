import Link from "next/link";
import Container from "@/components/Container/Container";

const links = [
	{ path: "/", label: "Home" },
	{ path: "/build/", label: "Build" },
	{ path: "/contact/", label: "Contact" },
	{ path: "/private-da/", label: "Private DA" },
	{ path: "/what-is-celestia/", label: "What is Celestia" },
	{ path: "/what-is-tia/", label: "What is TIA" },
	{ path: "/what-is-da/", label: "What is DA" },
	{ path: "/ecosystem/", label: "Ecosystem" },
	{ path: "/community/", label: "Community" },
	{ path: "/learn/", label: "Learn" },
	{ path: "/learn/beginners/modular-blockchains-for-beginners/", label: "Learn - Beginners: Modular Blockchains" },
	{ path: "/learn/beginners/modular-blockchains-and-first-principles/", label: "Learn - Beginners: First Principles" },
	{ path: "/learn/beginners/modular-blockchains-are-user-first/", label: "Learn - Beginners: User First" },
	{ path: "/learn/beginners/the-modular-stack/", label: "Learn - Beginners: Modular Stack" },
	{ path: "/learn/intermediates/modular-and-monolithic-blockchains/", label: "Learn - Intermediate: Modular vs Monolithic" },
	{ path: "/learn/intermediates/benefits-of-modular-blockchains/", label: "Learn - Intermediate: Benefits" },
	{ path: "/learn/intermediates/the-modular-stack/", label: "Learn - Intermediate: Modular Stack" },
	{ path: "/learn/intermediates/the-differences-of-modular-software/", label: "Learn - Intermediate: Software Differences" },
	{ path: "/learn/intermediates/settlement-in-the-modular-stack/", label: "Learn - Intermediate: Settlement" },
	{ path: "/learn/intermediates/sovereign-rollups-an-introduction/", label: "Learn - Intermediate: Sovereign Rollups Intro" },
	{ path: "/learn/intermediates/sovereign-rollups-misconceptions/", label: "Learn - Intermediate: Rollups Misconceptions" },
	{ path: "/glossary/", label: "Glossary" },
	{ path: "/careers/", label: "Careers" },
	{ path: "/press/", label: "Press" },
	{ path: "/past-events/", label: "Past Events" },
	{ path: "/run-a-light-node/", label: "Run a Light Node" },
	{ path: "/privacy/", label: "Privacy" },
	{ path: "/tos/", label: "Terms of Service" },
];

export default function LinksPage() {
	return (
		<div className='bg-white min-h-screen pt-32 pb-20' data-header-theme='light'>
			<Container size='lg'>
				<h1 className='text-4xl font-bold mb-8'>All Pages</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{links.map((link) => (
						<Link
							key={link.path}
							href={link.path}
							className='block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors'
						>
							<p className='font-medium text-black'>{link.label}</p>
							<p className='text-sm text-gray-500'>{link.path}</p>
						</Link>
					))}
				</div>
			</Container>
		</div>
	);
}
