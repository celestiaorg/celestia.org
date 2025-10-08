import React, { Suspense } from "react";
import {aeonik, spartan} from "../fonts";

export default function EdenLayout({ children }) {
    return (
        <main id={"main-content"} className={`${aeonik.variable} ${spartan.variable} text-[#17141A]`}>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
    );
}