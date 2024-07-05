import React from 'react';
import { Publication } from '../../types/types';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from 'framer-motion';

export const HeroParallax = ({
    publications,
}: {
    publications: Publication[];
}) => {
    const firstRow = publications.slice(0, 5);
    const secondRow = publications.slice(5, 10);
    const thirdRow = publications.slice(10, 15);

    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig,
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig,
    );
    return (
        <div
            ref={ref}
            className="h-[auto] py-36 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                className="py-36"
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((publication) => (
                        <PublicationCard
                            publication={publication}
                            translate={translateX}
                            key={publication.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row mb-20 space-x-20 ">
                    {secondRow.map((publication) => (
                        <PublicationCard
                            publication={publication}
                            translate={translateXReverse}
                            key={publication.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {thirdRow.map((publication) => (
                        <PublicationCard
                            publication={publication}
                            translate={translateX}
                            key={publication.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="max-w-7xl flex align-middle flex-col relative mx-auto px-4">
            <h1>
                Mes enquêtes phares
            </h1>
        </div>
    );
};

export const PublicationCard = ({
    publication,
    translate,
}: {
    publication: Publication;
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            whileHover={{
                y: -20,
            }}
            key={publication.title}
            //TODO Apply a regular class with linear gradient and url to use it programatically
            style={{
                x: translate,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.062745098)), url("/toi_meme_logo.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="cursor-pointer group/publication h-[24rem] w-[28rem] rounded-xl relative flex-shrink-0"
        >
            <a
                href={publication.link}
                className="block group-hover/publication:shadow-2xl"
            ></a>
            <div className="absolute inset-0 rounded-xl h-full w-full opacity-0 group-hover/publication:opacity-40 bg-black pointer-events-none"></div>
            <h2 className="absolute top-0 left-4 text-white">
                {publication.title}
            </h2>
            <p className="absolute top-11 left-4 text-white">
                {publication.publicationDate}
            </p>
            <p className="card-excerpt font-extrabold opacity-0 group-hover/publication:opacity-100 overflow-hidden w-[100%] mt-72 p-5 bottom-10 left-4 text-white">
                {publication.description}
            </p>
        </motion.div>
    );
};
