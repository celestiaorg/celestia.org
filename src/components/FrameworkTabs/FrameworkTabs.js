'use client';
import React, { useState } from "react";

const FrameworkTabs = ({ categories, anchorId, section }) => {
    const [selectedTab, setSelectedTab] = useState("All");

    const allUniqueCategories = [...new Set(categories.items.flatMap((item) => item.category))];

    return (
        <section className='frameworks' id={anchorId}>
            <div className={"container"}>
                <div className={"subtitle"}>{categories.subtitle}</div>
                <h2 className={"text-center"}>{categories.title}</h2>
                {categories.description && <div className={"description text-center mx-auto mt-3"}>{categories.description}</div>}

                <div className={"tabs row justify-content-center"}>
                    {allUniqueCategories.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className={`col-auto tab-item ${selectedTab === category && "active"} plausible-event-name=${category.replace(
                                    /\s+/g,
                                    "-"
                                )}_Tab_Click--Developer_Portal-${section}_section`}
                                onClick={() => setSelectedTab(category)}
                            >
                                {category}
                            </div>
                        );
                    })}
                </div>

                <div className={""}>
                    <div className={"row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-5 gy-md-3 my-2 pt-0 pt-md-4 pb-3"}>
                        {categories.items
                            .filter((item) => item.category.includes(selectedTab))
                            .map((item, index) => (
                                <a key={index} href={item.url} className={"card"}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrameworkTabs;
