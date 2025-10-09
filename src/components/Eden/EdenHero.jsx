"use client"
import React from 'react';
import data from '../../data/eden/data.json';
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Eden/Header";
import {motion} from "framer-motion";

const EdenHero = () => {
    return (
        <section className={'relative'}>
            <Header/>
            <div className={'flex items-center justify-center h-[500px] md:h-[700px] xl:h-[800px]'}>
                <div className={'absolute left-0 top-0 w-full h-full z-[0]'}>
                    <Image src={data.hero.image} alt={data.hero.title} width={1920} height={1080} className={'w-full h-full object-cover'}/>
                </div>
                <div className={'relative z-[1] flex flex-wrap justify-center'}>
                    <motion.h1
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, ease: "easeOut"}}
                        className={'w-full text-center text-[48px] sm:text-[80px] md:text-[100px] lg:text-[120px] xl:text-[168px] font-[500] tracking-[-0.029em] font-spartan text-white leading-[0.8em]'}>
                        {data.hero.title}
                    </motion.h1>
                    <motion.div
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.8, ease: "easeOut", delay: 0.3}}
                        className={'py-5 px-6 md:py-8 md:px-12 flex flex-wrap justify-center max-w-[300px] md:max-w-[470px] relative mt-5 lg:mt-0'}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="11" viewBox="0 0 24 11" fill="none" className={'absolute top-0 left-0'}>
                            <path d="M1 11V1H24" stroke="white"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="11" viewBox="0 0 24 11" fill="none" className={'absolute bottom-0 left-0'}>
                            <path d="M1 0V10H24" stroke="white"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="11" viewBox="0 0 24 11" fill="none" className={'absolute top-0 right-0'}>
                            <path d="M23 11V1H0" stroke="white"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="11" viewBox="0 0 24 11" fill="none" className={'absolute bottom-0 right-0'}>
                            <path d="M23 0V10H0" stroke="white"/>
                        </svg>

                        <div className={'w-fit flex flex-wrap justify-center gap-y-4 md:gap-y-6'}>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, ease: "easeOut", delay: 0.8}}
                                className={'w-fit font-spartan text-[20px] md:text-[38px] font-[600] tracking-[0.56em] uppercase text-white leading-[0.8em]'}>
                                <span className={'mr-[-0.56em]'}>{data.hero.subtitle}</span>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, ease: "easeOut", delay: 0.9}}
                                className={'w-fit text-white uppercase text-sm md:text-[24px] font-[700] font-aeonik flex items-center leading-[1em] gap-x-4'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 25" fill="none" className={'w-4 h-5 md:w-[22px] md:h-[25px]'}>
                                    <path d="M6.66667 1.66663V5.99996M15.3333 1.66663V5.99996M1.25 10.3333H20.75M3.41667 3.83329H18.5833C19.78 3.83329 20.75 4.80334 20.75 5.99996V21.1666C20.75 22.3632 19.78 23.3333 18.5833 23.3333H3.41667C2.22005 23.3333 1.25 22.3632 1.25 21.1666V5.99996C1.25 4.80334 2.22005 3.83329 3.41667 3.83329Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>
                                    {data.hero.date}
                                </span>
                            </motion.div>
                            <div className={'w-full'}>
                                <Link href={data.hero.cta.url} target={'_blank'}>
                                    <motion.button
                                        initial={{opacity: 0, scale: 0}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.3, type: "spring", bounce: 0.1, delay: 0.8}}
                                        className={'py-3 md:py-5 px-8 md:px-14 bg-white uppercase w-full font-aeonik font-[700] text-center text-[#075833] text-[20px] hover:bg-white/90 transition-all duration-300 ease-in-out'}>
                                        {data.hero.cta.label}
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EdenHero;