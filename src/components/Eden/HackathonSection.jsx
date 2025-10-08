import React from 'react';
// @ts-ignore
import data from '../../data/eden/data.json';
import Image from "next/image";

const HackathonSection = () => {
    return (
        <section className={'pt-10 md:pt-20 flex justify-center'}>
            <div className={'max-w-[1280px] w-full pt-10 md:pt-20'}>
                <div className={'w-full'}>
                    <div className={'flex justify-center'}>
                        <div className={'w-full md:w-8/12 lg:w-5/12 flex gap-y-6 flex-wrap'}>
                            <h2 className={'font-spartan font-[500] text-[52px] md:text-[80px] text-center tracking-[-0.05em] leading-[0.9em]'}>{data.hackathon.title}</h2>
                            <p className={'font-aeonik text-[24px] leading-[1.33em] text-[#313131] text-center'}>
                                {data.hackathon.text}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={'w-full pt-10 md:pt-20'}>
                    <div className={'w-full aspect-[1280/512] relative'}>
                        <Image
                            src={data.hackathon.video.thumbnail}
                            alt={data.hackathon.video.title}
                            width={1280}
                            height={512}
                            className={'object-cover w-full h-full'}
                        />

                        <button className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex py-5 px-10 gap-x-3 items-center uppercase font-aeonik text-base font-[500] leading-[1.23em]'}>
                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.3944 8.0001L2 3.7371V12.263L8.3944 8.0001ZM11.376 8.4161L0.77735 15.4818C0.54759 15.635 0.23715 15.5729 0.0839701 15.3432C0.0292201 15.261 0 15.1645 0 15.0658V0.934326C0 0.658176 0.22386 0.434326 0.5 0.434326C0.59871 0.434326 0.69522 0.463546 0.77735 0.518296L11.376 7.584C11.6057 7.7372 11.6678 8.0477 11.5146 8.2774C11.478 8.3323 11.4309 8.3795 11.376 8.4161Z" fill="black"/>
                            </svg>
                            <span>play</span>
                        </button>

                    </div>
                </div>
                <div className={'w-full pt-10 md:pt-20'}>
                    <div className={'grid grid-cols-1 md:grid-cols-3 gap-4'}>
                        {data.hackathon.elements.map((item, index) => (
                            <div key={index} className={`gap-y-[60px] flex flex-wrap text-white p-12 bg-cover bg-no-repeat`} style={{backgroundImage: `url(${item.background})`}}>
                                <div className={'self-start w-full text-[40px] font-[600] font-spartan'}>{item.title}</div>
                                <div className={'self-end w-full font-aeonik text-base font-[500] leading-[1.5em]'}>{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HackathonSection;