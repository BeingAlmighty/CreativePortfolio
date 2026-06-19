import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { useSectionTransition } from '../context/TransitionContext';

export default function Hero({ variant = "base" }) {
    const { handleHover, resetHover } = useCursor();
    const isReveal = variant === 'reveal';

    const portraitVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
    };

    const rightColVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.1 } }
    };

    return (
        <div className={`absolute inset-0 w-full h-full flex flex-col overflow-hidden ${isReveal ? 'theme-reveal pointer-events-none' : 'theme-base'}`} style={{ backgroundColor: 'var(--hero-bg)' }}>
            
            {/* Background Grid */}
            <div 
                className="absolute inset-0 w-full h-full z-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]"
                style={{
                    maskImage: 'radial-gradient(circle 800px at 50% 100%, black 20%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle 800px at 50% 100%, black 20%, transparent 100%)'
                }}
            ></div>
            
            {/* Animated noise texture on reveal */}
            {isReveal && (
                <div 
                    className="absolute inset-0 w-full h-full z-0 opacity-[var(--hero-noise-opacity)] mix-blend-screen"
                    style={{ backgroundImage: 'url("/images/noise.png")', backgroundSize: '100px 100px' }}
                ></div>
            )}

            {/* Vignette Overlay for depth */}
            <div className="absolute inset-0 w-full h-full z-0" style={{ background: 'radial-gradient(circle 800px at 50% 50%, transparent 20%, var(--hero-bg) 100%)' }}></div>

            <div className="relative flex-1 w-full flex items-center justify-center z-10 h-full mt-24 md:mt-12">

                {/* MASSIVE BACKGROUND TEXT (MANAS) */}
                <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center text-center z-0 pointer-events-none">
                    <h1 
                        className="text-[7.5vw] font-sora font-black uppercase leading-[1.2] select-none tracking-[-0.05em] whitespace-nowrap cursor-default scale-y-[1.5] origin-center" 
                        style={{ filter: 'drop-shadow(0 0 25px var(--hero-glow))' }}
                    >
                        <span style={{ color: 'var(--hero-heading)' }}>MANAS</span>
                        <span className="opacity-0 inline-block translate-x-[4vw] md:translate-x-[6vw]">KAPOOR</span>
                    </h1>
                </div>

                {/* PORTRAIT IMAGE CUTOUT */}
                <motion.div
                    variants={portraitVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[100vh] flex justify-center items-end pointer-events-none z-10"
                >
                    {/* AMBIENT GLOW BEHIND PORTRAIT */}
                    <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] max-w-[800px] max-h-[600px] opacity-20 blur-[120px] rounded-[100%] pointer-events-none -z-10" style={{ backgroundColor: 'var(--hero-glow)' }}></div>

                    <div
                        className="w-[95%] md:w-[80%] h-full relative pointer-events-none"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',
                            maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',
                            filter: 'var(--hero-rim-light)'
                        }}
                    >
                        <img
                            src="/images/image.png"
                            alt="Manas Kapoor"
                            className={`w-full h-full object-contain object-bottom drop-shadow-[0_0_50px_rgba(59,130,246,0.15)] ${!isReveal ? 'grayscale contrast-125 brightness-90' : ''}`}
                        />
                    </div>
                </motion.div>

                {/* MASSIVE BACKGROUND TEXT (KAPOOR) */}
                <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center text-center z-20 pointer-events-none">
                    <h1 
                        className="text-[7.5vw] font-sora font-black uppercase leading-[1.1] select-none tracking-[-0.05em] whitespace-nowrap cursor-default scale-y-[1.5] origin-center" 
                        style={{ filter: 'drop-shadow(0 0 25px var(--hero-glow))' }}
                    >
                        <span className="opacity-0">MANAS</span>
                        <span className="inline-block translate-x-[4vw] md:translate-x-[6vw]" style={{ color: 'var(--hero-heading)' }}>KAPOOR</span>
                    </h1>
                </div>

                {/* BULLETPROOF INVISIBLE HOVER ZONES */}
                {!isReveal && (
                    <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
                        <div 
                            className="absolute top-[10%] left-0 w-full h-[15vw] pointer-events-auto bg-black/1"
                            onMouseEnter={() => handleHover('button')}
                            onMouseLeave={resetHover}
                        ></div>
                        <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[600px] h-[75vh] pointer-events-auto bg-black/1"
                            onMouseEnter={() => handleHover('image')}
                            onMouseLeave={resetHover}
                        ></div>
                    </div>
                )}

                {/* LEFT COLUMN - Intro & CTA */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute left-8 lg:left-24 top-[45%] -translate-y-1/2 w-[320px] h-[160px] z-20 hidden md:flex flex-col gap-6"
                >
                    <p 
                        className={`text-[18px] md:text-[22px] leading-snug font-medium px-6 py-4 -mx-6 -my-4 ${isReveal ? 'pointer-events-none' : 'pointer-events-auto cursor-default'}`} 
                        style={{ color: 'var(--hero-text)' }}
                        onMouseEnter={() => handleHover('link')}
                        onMouseLeave={resetHover}
                    >
                        Hey there! I'm a Full Stack Software Architect working in the global marketplace.
                    </p>
                </motion.div>

                {/* RIGHT COLUMN - Skills */}
                <motion.div 
                    variants={rightColVariants}
                    initial="hidden"
                    animate="visible"
                    className={`absolute right-8 lg:right-24 top-[50%] -translate-y-1/2 z-20 hidden md:flex flex-col items-start gap-3 w-[340px] ${isReveal ? 'pointer-events-none' : 'pointer-events-auto'}`}
                >
                    <ul className="space-y-6 text-[22px] md:text-[26px] leading-tight font-medium flex flex-col items-start w-full">
                        {(isReveal 
                            ? ["Creativity", "Discipline", "Leadership", "Vision"]
                            : ["Full Stack Development", "Multi-Agent Systems", "Workflow Automation", "System Design"]
                        ).map((skill, idx) => (
                            <li 
                                key={idx}
                                className="flex items-center group cursor-default px-8 py-4 -mx-8 -my-4"
                                onMouseEnter={() => handleHover('link')}
                                onMouseLeave={resetHover}
                            >
                                <span 
                                    className={`tracking-wide transition-all duration-300 ${
                                        idx === 0 
                                        ? 'font-extrabold opacity-100' 
                                        : `font-medium group-hover:opacity-100 ${isReveal ? 'opacity-100' : 'opacity-40'}`
                                    }`}
                                    style={{ 
                                        color: isReveal 
                                            ? (idx === 0 ? '#ffffff' : '#000000') 
                                            : (idx === 0 ? 'var(--hero-heading)' : 'var(--hero-text)') 
                                    }}
                                >
                                    {skill}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

            </div>


            
        </div>
    );
}
