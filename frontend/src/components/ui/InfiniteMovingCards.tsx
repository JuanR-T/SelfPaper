import { cn } from '../../lib/cn';
import React, { useEffect, useState } from 'react';
import { Publication } from '../../types/types';

export const InfiniteMovingCards = ({
    items,
    direction = 'left',
    speed = 'fast',
    pauseOnHover = true,
    className,
}: {
    items: Publication[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            addAnimation();
        }
    }, []);

    const [start, setStart] = useState(false);
    console.log('animationStart', start);
    const addAnimation = () => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                scrollerRef?.current?.appendChild(duplicatedItem);
            });

            setDirection();
            setSpeed();
            setStart(true);
        }
    };

    const setDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                '--animation-direction',
                direction === 'left' ? 'normal' : 'reverse',
            );
        }
    };

    const setSpeed = () => {
        if (containerRef.current) {
            let duration;
            switch (speed) {
                case 'fast':
                    duration = '20s';
                    break;
                case 'normal':
                    duration = '40s';
                    break;
                case 'slow':
                    duration = '80s';
                    break;
                default:
                    duration = '40s';
            }
            containerRef.current.style.setProperty(
                '--animation-duration',
                duration,
            );
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
                className,
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
                    start && 'animate-scroll',
                    pauseOnHover && 'hover:[animation-play-state:paused]',
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
                        style={{
                            background:
                                'linear-gradient(180deg, var(--slate-800), var(--slate-900))',
                        }}
                        key={idx}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                                {item.excerpt}
                            </span>
                            <div className="relative z-20 mt-6 flex flex-row items-center">
                                <span className="flex flex-col gap-1">
                                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                                        {item.title}
                                    </span>
                                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                                        {item.title}
                                    </span>
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
