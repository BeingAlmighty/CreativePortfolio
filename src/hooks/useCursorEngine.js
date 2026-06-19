import { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export function useCursorEngine() {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const targetSize = useMotionValue(60);

    const springConfig = { stiffness: 260, damping: 30, mass: 0.45 };

    const x = useSpring(rawX, springConfig);
    const y = useSpring(rawY, springConfig);
    const size = useSpring(targetSize, { stiffness: 400, damping: 15 });

    const velocityX = useMotionValue(0);
    const velocityY = useMotionValue(0);

    const scaleX = useTransform(velocityX, [-2000, 0, 2000], [1.3, 1, 1.3]);
    const scaleY = useTransform(velocityY, [-2000, 0, 2000], [0.8, 1, 0.8]);

    const rotation = useMotionValue(0);

    useEffect(() => {
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isTouch || prefersReducedMotion) return;

        let lastTime = performance.now();
        let lastX = 0;
        let lastY = 0;
        let frameId;

        const updateCursor = (e) => {
            const currentX = e.clientX;
            const currentY = e.clientY;
            const currentTime = performance.now();
            const dt = Math.max(1, currentTime - lastTime);

            const vx = ((currentX - lastX) / dt) * 1000;
            const vy = ((currentY - lastY) / dt) * 1000;

            rawX.set(currentX);
            rawY.set(currentY);
            velocityX.set(vx);
            velocityY.set(vy);

            const speed = Math.sqrt(vx * vx + vy * vy);
            if (speed > 50) {
                const angle = Math.atan2(vy, vx) * (180 / Math.PI);
                rotation.set(angle);
            }

            lastX = currentX;
            lastY = currentY;
            lastTime = currentTime;
        };

        const tick = () => {
            velocityX.set(velocityX.get() * 0.9);
            velocityY.set(velocityY.get() * 0.9);
            frameId = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', updateCursor, { passive: true });
        frameId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            cancelAnimationFrame(frameId);
        };
    }, [rawX, rawY, velocityX, velocityY, rotation]);

    return { x, y, size, targetSize, scaleX, scaleY, rotation, rawPositions: { x: rawX, y: rawY } };
}
