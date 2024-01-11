import * as React from "react";

import { heroData } from "../datas/build/hero-data";
import { getStarted } from "../datas/build/get-started";
import { frameworks } from "../datas/build/frameworks";
import { rollups } from "../datas/build/rollups";
import { discover } from "../datas/build/discover";
import { FooterBoxes } from "../datas/build/content";
import Layout from "../components/layout";
import IconCard from "../components/modules/icon-card";

import { seoContent } from "../datas/build/seoContent";
import Seo from "../components/seo";
import FrameworkTabs from "../components/framework-tabs";
import ContactSection from "../components/sections/contact-section";
import IntegrateSection from "../components/sections/integrate-section";
import LottieVersion1 from "../components/lottie-version-1";
import LottieVersion2 from "../components/lottie-version-2";
import LottieVersion3 from "../components/lottie-version-3";

const Lottie = () => {
    return (
        <Layout footerBoxes={FooterBoxes}>
            <div className={"lottie-page"}>
                <main>
                    <section className='hero'>
                        <div className={"container"}>
                            <div className={"row justify-content-center"}>
                                <div className={"col-auto"}>
                                    <h1 className={"text-center"}>Animation examples</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <LottieVersion1/>

                    <section className='get-started pt-3'>
                        <div className={"container"}>
                            {getStarted.description && <div className={"description"}>{getStarted.description}</div>}
                            <div className={"row gx-3 gy-3 pt-4 pb-3"}>
                                {getStarted.items.map(function (item) {
                                    return (
                                        <IconCard
                                            className='icon-card-wrapper col-12 col-md min-width-33'
                                            key={item.id}
                                            content={item}
                                            variant={"vertical anchor no-image"}
                                            btnClass={`plausible-event-name=${item.title.replace(/ /g, "_")}--Developer_Portal-Hero_Section`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <LottieVersion2/>

                    <FrameworkTabs content={getStarted} categories={frameworks} anchorId={0} section={"Framework"} />

                    <LottieVersion3/>

                    <ContactSection />
                </main>
            </div>
        </Layout>
    );
};

export default Lottie;
