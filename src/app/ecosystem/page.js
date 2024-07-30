import { ecosystemItems } from "@/data/ecosystem/ecosystem";
import SecondaryHero from "@/components/Heroes/SecondaryHero";
import ProjectFilter from "@/components/ProjectFilter/ProjectFilter";
import { getFilterOptions } from "@/utils/getFilterOptions";
import GetInTouch from "@/components/CallToActions/GetInTouch";

import meta from "@/components/Meta/Meta";
import seo from "@/data/ecosystem/seo";

export const metadata = meta(seo);

export default async function Ecosystem() {
  const tableOfContents = {
    Expore: "#projects",
  };

  return (
    <>
      <SecondaryHero
        title={"Celestia Ecosystem"}
        pageIndicator={"2-4"}
        tableIndicator={"0-0"}
        buttons={[
          {
            text: (
              <>
                Learn more{" "}
                <span className={"sr-only"}>about the ecosystem</span>
              </>
            ),
            url: "#projects",
            iconDirection: "down-right",
          },
        ]}
        tableOfContents={tableOfContents}
      />
      <div id="projects">
        <ProjectFilter
          title={"Start exploring"}
          description={
            "Discover a wide range of apps and services built in the Celestia ecosystem."
          }
          filters={getFilterOptions(ecosystemItems, "categories")}
          filterTarget={"categories"}
          items={ecosystemItems}
          showCategoriesOnCard
        />
      </div>

      <GetInTouch />
    </>
  );
}
