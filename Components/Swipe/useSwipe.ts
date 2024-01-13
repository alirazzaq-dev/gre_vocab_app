import { TouchEvent, useRef, useState } from "react";

interface SwipeInput {
    onSwipedLeft: () => void
    onSwipedRight: () => void
}

interface SwipeOutput {
    onTouchStart: (e: TouchEvent) => void
    onTouchMove: (e: TouchEvent) => void
    onTouchEnd: () => void
}

export default (input: SwipeInput): SwipeOutput => {

    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            input.onSwipedLeft();
        }
        if (isRightSwipe) {
            input.onSwipedRight();
        }

        //   if (isLeftSwipe || isRightSwipe)
        //     console.log('swipe', isLeftSwipe ? 'left' : 'right');
        // add your conditional logic here
    };



    // const [touchStart, setTouchStart] = useState(0);
    // const [touchEnd, setTouchEnd] = useState(0);

    // const minSwipeDistance = 1;

    // const onTouchStart = (e: TouchEvent) => {
    //     setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    //     setTouchStart(e.targetTouches[0].clientX);
    // }

    // const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    // const onTouchEnd = () => {
    //     if (!touchStart || !touchEnd) return;
    //     const distance = touchStart - touchEnd;
    //     const isLeftSwipe = distance > minSwipeDistance;
    //     const isRightSwipe = distance < -minSwipeDistance;
    //     if (isLeftSwipe) {
    //         input.onSwipedLeft();
    //     }
    //     if (isRightSwipe) {
    //         input.onSwipedRight();
    //     }
    // }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    }
}