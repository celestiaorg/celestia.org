'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import JumpNav from "./JumpNav"
import MenuData from './MenuData';
import PrimaryButton from "../Buttons/PrimaryButton"
import Link from "next/link"
import { useScrollPosition } from '@/utils/scrollLock';

const Nav = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const controls = useAnimation();
    const { setScrollIsLocked } = useScrollPosition();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                if (!hasScrolled) {
                    setHasScrolled(true);
                    controls.start({ backgroundColor: '#17141A' });
                }
            } else {
                if (hasScrolled) {
                    setHasScrolled(false);
                    controls.start({ backgroundColor: '#ffffff' });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled, controls]);

    useEffect(() => {
        if (menuIsOpen) {
            setScrollIsLocked(true);
        } else {
            setScrollIsLocked(false);
        }
    }, [menuIsOpen, setScrollIsLocked]);

    return (
        <>
            <JumpNav />
            <motion.header
                initial={{ backgroundColor: '#ffffff' }}
                animate={controls}
                className={`fixed top-0 left-0 w-full`}

            >
                <div className={`relative flex justify-between items-center py-6 px-4 w-full z-50`}>
                    <Link href={`/`}>
                        <img src={`/images/celestia-logo.svg`} alt={`Celestia logo | Home`} className={`w-full h-auto max-w-32`} />
                    </Link>
                    <PrimaryButton onClick={() => setMenuIsOpen(!menuIsOpen)}>
                        {menuIsOpen ? (
                            <>Close <span className={`sr-only`}>the main</span></>
                        ) : (
                            <><span className={`sr-only`}>Open the main</span> menu</>
                        )}
                    </PrimaryButton>
                </div>
                {menuIsOpen && (
                    <div className={`bg-black text-white fixed top-0 left-0 h-screen w-screen z-40`}>
                        {MenuData.map((item, index) => {
                            return (
                                <React.Fragment key={`menu-item-${index}`}>
                                    {item.type === 'dropdown' &&
                                        <p>Dropdown - {item.name}</p>
                                    }
                                    {item.type === 'link' &&
                                        <p>Link - {item.name}</p>
                                    }
                                </React.Fragment>
                            )
                        })}
                    </div>
                )}
            </motion.header>
        </>
    )
}

export default Nav