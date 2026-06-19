import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function CursorMask({ children }) {
    const { engine, targetSize } = useCursor();
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        const checkSupport = () => {
            const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsSupported(!isTouch && !prefersReducedMotion);
        };
        checkSupport();
        window.addEventListener('resize', checkSupport);
        return () => window.removeEventListener('resize', checkSupport);
    }, []);

    if (!isSupported || !engine) {
        return <div className="theme-base w-full h-full">{children}</div>;
    }

    return <ActiveMask engine={engine} targetSize={targetSize}>{children}</ActiveMask>;
}

function ActiveMask({ engine, targetSize, children }) {
    // Combine framer-motion MotionValues (engine.x) with the animated CSS variable (--mask-size)
    const maskImage = useMotionTemplate`radial-gradient(
        circle var(--mask-size) at ${engine.x}px ${engine.y}px,
        black 0%,
        black 98%,
        transparent 100%
    )`;

    return (
        <div className="relative w-full h-full overflow-hidden theme-base">
            {/* Base Layer - handles pointer events */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Reveal Layer - strictly visual overlay */}
            <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none z-50 theme-reveal"
                animate={{ '--mask-size': `${targetSize}px` }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage
                }}
            >
                {/* Clone the children and pass variant="reveal" so components know they are in the alternate universe */}
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { variant: 'reveal' });
                    }
                    return child;
                })}
            </motion.div>
        </div>
    );
}
