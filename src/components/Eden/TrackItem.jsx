import React from 'react';

const TrackItem = ({item, index}) => {
    return (
        <div className={`w-full px-6 md:px-10 pb-10 border-t border-[#D3CED7] ${index %2 === 1 ? 'md:border-l' : ''}`}>
            <div className={'w-full pb-5'}>
                <div className={'text-white font-[600] font-spartan bg-[#00A651] leading-[0em] pt-1 flex items-center justify-center w-8 h-12'}>
                    {index+1}
                </div>
            </div>
            <div className={'w-full'}>
                <span className={'font-spartan text-black font-[600] uppercase text-[24px]'}>{item.title}</span>
            </div>
            <div className={'w-full pt-2'}>
                <p className={'font-aeonik text-sm font-[500] leading-[1.71em]'}>{item.text}</p>
            </div>
        </div>
    );
};

export default TrackItem;