import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <div className={'w-full bg-black py-6 md:py-10 flex justify-center text-white'}>
            <div className={'max-w-[1312px] px-4 w-full'}>
                <div className={'flex items-center justify-between w-full flex-wrap md:flex-nowrap'}>
                    <div className={'w-full md:w-auto'}>
                        <div className={'flex flex-wrap md:flex-nowrap items-center w-full gap-y-4'}>
                            <div className={'w-full justify-center flex'}>
                                <Link href={'/'}>
                                    <Image src={'/images/eden/celestia-eden-logo.svg'} alt={''} width={223} height={40}/>
                                </Link>
                            </div>
                            <div className={'flex w-full items-center justify-center gap-x-10 md:pl-10 lg:pl-20'}>
                                <div>
                                    <Link href={'/'}>
                                        <div className={'flex items-center gap-x-4'}>
                                            <span className={'font-aeonik font-[700] uppercase text-sm lg:text-base text-nowrap'}>Eden docs</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 0.579102H11M11 0.579102V10.5791M11 0.579102L1 10.5791" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={'https://celestia.org'} target={'_blank'}>
                                        <div className={'flex items-center gap-x-4'}>
                                            <span className={'font-aeonik font-[700] uppercase text-sm lg:text-base text-nowrap'}>Celestia</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 0.579102H11M11 0.579102V10.5791M11 0.579102L1 10.5791" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'w-full md:w-auto font-aeonik text-xs md:text-base leading-[1.5em] text-white text-center pt-4 md:pt-0'}>
                        ©2025 Celestia Labs
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;