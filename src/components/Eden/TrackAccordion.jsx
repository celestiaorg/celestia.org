"use client"
import React, {useEffect, useRef} from 'react';
import TrackItem from "./TrackItem";

const TrackAccordion = ({track, index}) => {
    const [open, setOpen] = React.useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setOpen(false);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className={`w-full pt-8 md:pt-12 transition-all ease-in-out duration-500 ${open ? 'bg-[#F7F7F7]' : 'bg-white'}`}>
            <div className={'w-full flex flex-wrap md:flex-nowrap items-center  px-4 md:px-14 cursor-pointer'} onClick={()=>setOpen(!open)}>
                <div className={'w-full md:w-1/2'}>
                    <div className={'uppercase text-[#00A651] font-aeonik font-[500] tracking-[0.06em] text-sm md:text-base mb-4 md:mb-6'}>{track.subtitle}</div>
                    <div className={'uppercase text-black font-spartan font-[600] text-[28px] md:text-[40px] leading-[0.8em]'}>{track.title}</div>
                </div>
                <div className={'w-full md:w-1/2 md:pl-16'}>
                    <div className={'flex items-center gap-x-14 pt-2 md:pt-0'}>
                        <p className={'font-aeonik text-sm'}>
                            {track.text}
                        </p>
                        <div className={'relative w-10 h-10 aspect-square'}>
                            <span className={'absolute w-[3px] h-5 bg-black rotate-90 left-1/2 top-1/2 -translate-y-1/2'}></span>
                            <span className={`absolute w-[3px] transition-all ease-in-out duration-500 bg-black left-1/2 top-1/2 -translate-y-1/2  ${open ? 'h-0' : 'h-5'}`}></span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={contentRef}
                className={`border-b border-[#D3CED7] transition-all ease-in-out duration-500 overflow-hidden mt-8 md:mt-12`}
                 style={{
                     maxHeight: open ? `${contentRef.current?.scrollHeight}px` : '0',
                 }}
            >
                <div className={'w-full grid grid-cols-1 md:grid-cols-2 divide-solid divide-[#D3CED7]'}>
                    {track.items && track.items.map((item, idx) => (
                        <TrackItem key={idx} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrackAccordion;