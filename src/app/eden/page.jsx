import React from "react";
import Meta from "../../components/Meta/Meta";
import seo from "../../data/mammoth/seo";
import Footer from "../../components/Eden/Footer";
import Tracks from "../../components/Eden/Tracks";
import HackathonSection from "../../components/Eden/HackathonSection";

export const metadata = Meta(seo);

export default async function Eden() {
    return <>
        <HackathonSection/>
        <Tracks/>
        <Footer/>
    </>;
}