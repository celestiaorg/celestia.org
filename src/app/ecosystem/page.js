import EcosystemProjects from "@/components/Ecosystem/EcosystemProjects";

export default async function Ecosystem() {

  return (
    <main className={`flex min-h-screen flex-col p-24`}>
      {/* HERO */}
      <div className={`pb-10`}>
        <h1 className={``}>Celestia Ecosystem</h1>
        <p className={``}>Discover a wide range of apps and services built in the Celestia ecosystem.</p>
      </div>

      <hr />

      <EcosystemProjects />

    </main >
  );
}