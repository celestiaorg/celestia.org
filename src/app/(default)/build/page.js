import Meta from "@/components/Meta/Meta";
import BuildHero from "@/components/NewPages/Build/BuildHero";
import BuildDevResources from "@/components/NewPages/Build/BuildDevResources";
import BuildFilterSection from "@/components/NewPages/Build/BuildFilterSection";
import { frameworks } from "@/data/build/frameworks";
import { rollups } from "@/data/build/rollups";
import seo from "@/data/build/seo";

export const metadata = Meta(seo);

export default function BuildPage() {
	return (
		<div className='bg-[#040207]'>
			<BuildHero />
			<BuildDevResources />
			<BuildFilterSection
				id='frameworks'
				sectionLabel='Build'
				title='Choose a framework'
				description='Get started quickly by using Celestia with leading rollup frameworks.'
				items={frameworks}
				filterKey='categories'
			/>
			<BuildFilterSection
				id='rollups'
				sectionLabel='Deploy'
				title='Rollups-as-a-Service'
				description='Deploy end-to-end managed infrastructure using a Rollup-as-a-Service provider.'
				items={rollups}
				filterKey='categories'
			/>
		</div>
	);
}
