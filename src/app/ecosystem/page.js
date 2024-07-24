import { ecosystemItems } from "@/data/ecosystem/ecosystem";
import SecondaryHero from "@/components/Heroes/SecondaryHero";
import { frameworks } from "@/data/build/frameworks";
import ProjectFilter from "@/components/ProjectFilter/ProjectFilter";
import { getFilterOptions } from "@/utils/getFilterOptions";
import GetInTouch from "@/components/CallToActions/GetInTouch";

export default async function Ecosystem() {
  const tableOfContents = {
    Expore: "#projects",
  };

  console.log("number of projects", ecosystemItems.length);
  console.log("project slides", ecosystemItems.length / 4);
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
        />
      </div>

      <GetInTouch />
    </>
  );
}
