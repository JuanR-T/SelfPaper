'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { AnimatedTab } from '../../types/types';

export const AnimatedTabs = ({
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
}: {
    tabs: AnimatedTab[];
    containerClassName?: string;
    activeTabClassName?: string;
    tabClassName?: string;
    contentClassName?: string;
}) => {
    const [active, setActive] = useState<AnimatedTab>(propTabs?.[0]);
    const [tabs, setTabs] = useState<AnimatedTab[]>(propTabs);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTabs(propTabs);
        setActive(propTabs[0]);
    }, [propTabs]);

    const moveSelectedTabToTop = (idx: number) => {
        const newTabs = [...propTabs];
        const selectedTab = newTabs.splice(idx, 1);
        newTabs.unshift(selectedTab[0]);
        setTabs(newTabs);
        setActive(newTabs[0]);
    };

    const [hovering, setHovering] = useState(false);

    return (
        <>
            <div
                ref={containerRef}
                className={cn(
                    'flex flex-row items-center justify-center [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full',
                    containerClassName,
                )}
            >
                {propTabs.map((tab, idx) => (
                    <button
                        key={tab.title}
                        onClick={() => {
                            moveSelectedTabToTop(idx);
                        }}
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        className={cn(
                            'relative px-4 py-2 rounded-full',
                            tabClassName,
                        )}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {active.value === tab.value && (
                            <motion.div
                                layoutId="clickedbutton"
                                transition={{
                                    type: 'spring',
                                    bounce: 0.3,
                                    duration: 0.6,
                                }}
                                className={cn(
                                    'absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ',
                                    activeTabClassName,
                                )}
                            />
                        )}

                        <span className="relative block text-black dark:text-white">
                            {tab.title}
                        </span>
                    </button>
                ))}
            </div>
            <FadeInDiv
                tabs={tabs}
                active={active}
                key={active.value}
                hovering={hovering}
                className={cn('mt-4', contentClassName)}
            />
        </>
    );
};

export const FadeInDiv = ({
    className,
    tabs,
    hovering,
}: {
    className?: string;
    key?: string;
    tabs: AnimatedTab[];
    active: AnimatedTab;
    hovering?: boolean;
}) => {
    const isActive = (tab: AnimatedTab) => {
        return tab.value === tabs[0].value;
    };
    return (
        <div className="relative w-full h-full">
            {tabs.map((tab, idx) => (
                <motion.div
                    key={tab.value}
                    layoutId={tab.value}
                    style={{
                        scale: 1 - idx * 0.1,
                        top: idx * -50,
                        zIndex: -idx,
                        opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                    }}
                    animate={{
                        y: isActive(tab) ? [0, 40, 0] : 0,
                    }}
                    className={cn(
                        'w-full h-full absolute top-0 left-0',
                        className,
                    )}
                >
                    {tab.content}
                </motion.div>
            ))}
        </div>
    );
};
