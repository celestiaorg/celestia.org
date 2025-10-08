import React from 'react';
import data from '../../data/eden/data.json';
import Link from "next/link";
import TrackAccordion from "./TrackAccordion";


const Tracks = () => {
    return (
        <section className={"w-full pt-10 md:pt-20 flex justify-center"}>
            <div className={'max-w-[1280px] w-full'}>
                <div className={'px-4 w-full flex flex-wrap md:flex-nowrap items-end justify-between'}>
                    <div className={'w-full md:w-auto'}>
                        <h2 className={'font-spartan text-[52px] md:text-[80px] text-[#17141A] tracking-[-0.025em] font-[600] leading-[1em]'}>{data.tracks.title}</h2>
                    </div>
                    <div className={'w-full md:w-auto pb-4'}>
                        <Link href={data.tracks.cta.url} target={'_blank'}>
                            <button className={'bg-[#7E6EBE] text-white px-6 py-4 font-aeonik font-[500] text-base uppercase leading-[0.75em]'}>
                                {data.tracks.cta.label}
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={'w-full pt-8'}>
                    {data.tracks.elements.map((track, index) => (
                        <TrackAccordion key={index} track={track} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Tracks;