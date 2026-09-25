"use client";

import { useEffect, useState } from "react";

export default function Counter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentCount = Math.floor(progress * target);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCount);
            }
        };

        let animationFrame = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(animationFrame);
    }, [target]);

    return <span>{count}</span>;
}