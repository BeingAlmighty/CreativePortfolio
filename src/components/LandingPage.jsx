import React from 'react'
import Particles from './ParticleBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import Navbar from './Navbar';
import Lenis from 'lenis'
import Skills from './Skills';
import About from './About';
import FlipLink from './Links';
import Project from './Projects'
import HeroSequenceBackground from './HeroSequenceBackground';
import { useEffect } from 'react';

const LandingPage = () => {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
        
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className='bg-zinc-900 h-screen flex flex-col sticky top-0 overflow-x-hidden'>
                {/* Canvas Sequence Background with Overlay */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
                    <HeroSequenceBackground />
                    {/* Sleek dark gradient overlay for professional look and text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-zinc-900/60 to-zinc-900 w-full h-full pointer-events-none"></div>
                </div>
                <div className="masker pointer-events-none px-4 w-full flex-1 flex flex-col justify-center items-center text-center z-10 pt-[12vh]">
                    {["Hello, I'm a", "FULL Stack Dev", "Manas Kapoor"].map((item, index) => {
                        return (
                            <div key={index} className={` ${index == 2 ? 'text-[#3B82F6]' : 'text-white'} text-5xl sm:text-7xl md:text-[8vw] font-bold leading-tight md:leading-[1.1] tracking-tighter pointer-events-none`}>
                                <motion.span
                                    key={index}
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 12,
                                        delay: 0.1 * index
                                    }}
                                    className="block"
                                >
                                    {item}
                                </motion.span>
                            </div>
                        )
                    })}
                </div>
                <div className='relative z-10 w-full h-[31vh] flex flex-col'>
                    <div className='w-full border-t border-white/30'></div>
                    <div className='flex-1 flex justify-center items-center w-full'>
                        <motion.div
                            initial={{ y: "100px" }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
                            className='w-full flex justify-center items-center pointer-events-none z-10 scale-[1.8] sm:scale-[1.4] md:scale-[1.2] lg:scale-100'>
                            <CurvedLoop
                                marqueeText=" Logic • Creativity • Passion • Vision • Innovation • "
                                speed={3}
                                curveAmount={80}
                                direction="right"
                                interactive={true}
                                className="custom-text-style"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
            <Skills />
            <About />
            <Project />
            <section className="grid relative z-10 place-content-center gap-2 bg-zinc-700 px-8 py-24 text-black text-center w-full">
                <FlipLink href="#">Twitter</FlipLink>
                <FlipLink href="#">Linkedin</FlipLink>
                <FlipLink href="#">Facebook</FlipLink>
                <FlipLink href="#">Instagram</FlipLink>
            </section>
        </div>
    )
}

export default LandingPage;
