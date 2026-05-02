'use client';

import React, { useRef, useEffect } from 'react';

const TOTAL_FRAMES = 210;

export default function HeroSequenceBackground() {
    const canvasRef = useRef(null);
    const imagesRef = useRef(new Array(TOTAL_FRAMES));
    const smoothedFrameRef = useRef(0);

    // 1. Zero Decode Stalls: Use createImageBitmap for off-main-thread decoding
    useEffect(() => {
        let isCancelled = false;
        const loadBitmaps = async () => {
            // Load sequentially to avoid network/CPU spiking on 210 massive images
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                if (isCancelled) break;
                try {
                    const src = `/seq1/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
                    const response = await fetch(src);
                    const blob = await response.blob();
                    // createImageBitmap decodes off-thread and stores a raw bitmap in GPU memory
                    const bitmap = await createImageBitmap(blob);
                    imagesRef.current[i - 1] = bitmap;
                } catch (err) {
                    console.error("Failed to load/decode frame", i, err);
                }
            }
        };

        loadBitmaps();

        return () => {
            isCancelled = true;
        };
    }, []);

    // 2. Single Render Loop & Alpha Blending
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        // 3. Fast rendering: alpha false optimizes backing store
        const ctx = canvas.getContext('2d', { alpha: false });

        let animationFrameId;

        const render = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 4. Avoid layout thrash: size canvas once per resize
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            // 5. Read scroll once per frame without triggering reflows
            const currentScrollY = window.scrollY;
            const maxScroll = Math.max(1, (document.body.scrollHeight - window.innerHeight) * 0.66);
            
            let progress = currentScrollY / maxScroll;
            progress = Math.max(0, Math.min(1, progress));

            const targetFrame = progress * (TOTAL_FRAMES - 1);
            
            // Continuous state interpolation
            smoothedFrameRef.current += (targetFrame - smoothedFrameRef.current) * 0.08;

            // 6. Sub-frame Alpha Blending
            const currentFrame = smoothedFrameRef.current;
            const frameIndex = Math.floor(currentFrame);
            const nextFrameIndex = Math.min(frameIndex + 1, TOTAL_FRAMES - 1);
            const fractionalFrame = currentFrame - frameIndex;

            const img1 = imagesRef.current[frameIndex];
            const img2 = imagesRef.current[nextFrameIndex];

            if (img1) {
                const imgRatio = img1.width / img1.height;
                const canvasRatio = canvas.width / canvas.height;

                let drawWidth, drawHeight, drawX, drawY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    drawX = 0;
                    drawY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    drawHeight = canvas.height;
                    drawX = (canvas.width - drawWidth) / 2;
                    drawY = 0;
                }

                // Draw base frame
                ctx.globalAlpha = 1;
                ctx.drawImage(img1, drawX, drawY, drawWidth, drawHeight);

                // Blend adjacent frame on top using fractional progression (t = frame - n)
                // This converts discrete frame jumps into continuous visual transitions
                if (img2 && fractionalFrame > 0 && frameIndex !== nextFrameIndex) {
                    ctx.globalAlpha = fractionalFrame;
                    ctx.drawImage(img2, drawX, drawY, drawWidth, drawHeight);
                }
                
                // Reset alpha
                ctx.globalAlpha = 1;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
