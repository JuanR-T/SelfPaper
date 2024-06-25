declare module 'react-spring-carousel' {
    import { FC, ReactNode } from 'react';

    interface CarouselProps {
        initialStartingPosition: string,
        items: any[];
        autoplay?: boolean;
        loop?: boolean;
        slideWidth?: number;
        itemsPerSlide?: number;
        withLoop: boolean;
    }

    export const useSpringCarousel: FC<CarouselProps>;
}