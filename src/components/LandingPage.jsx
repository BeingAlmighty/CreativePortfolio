import React from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import Navbar from './Navbar';
import Lenis from 'lenis'
import Skills from './Skills';
import About from './About';
import FlipLink from './Links';
import Project from './Projects'
import CreativeHeroBackground from './CreativeHeroBackground';
import { useEffect } from 'react';

const LandingPage = () => {
    // Magnetic Hover for Text
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const magneticSpringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
    const magneticSpringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((clientX - centerX) * 0.2);
        mouseY.set((clientY - centerY) * 0.2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const { scrollY } = useScroll();

    // Text 1 -  0 to 500px
    const badgeY = useTransform(scrollY, [100, 400], ["0vh", "-4vh"]);
    const badgeOpacity = useTransform(scrollY, [120, 420], [1, 0]);
    const badgeRotateX = useTransform(scrollY, [100, 400], [0, 90]);

    // Line 1 
    const line1Y = useTransform(scrollY, [0, 380], ["0vh", "-10vh"]);
    const line1Opacity = useTransform(scrollY, [30, 350], [1, 0]);
    const line1X = useTransform(scrollY, [0, 380], ["0vw", "-10vw"]);
    const line1SkewX = useTransform(scrollY, [0, 380], [0, -20]);

    // Line 2 
    const line2Y = useTransform(scrollY, [0, 420], ["0vh", "-12vh"]);
    const line2Opacity = useTransform(scrollY, [50, 390], [1, 0]);
    const line2X = useTransform(scrollY, [0, 420], ["0vw", "10vw"]);
    const line2RotateY = useTransform(scrollY, [0, 420], [0, 45]);

    // Name scaling
    const nameY = useTransform(scrollY, [0, 480], ["0vh", "-16vh"]);
    const nameScale = useTransform(scrollY, [0, 480], [1, 2.2]);
    const nameOpacity = useTransform(scrollY, [360, 480], [1, 0]);
    const nameBlur = useTransform(scrollY, [350, 480], ["blur(0px)", "blur(15px)"]);

    // Text 2 - 350px to 1000px
    const t2Opacity = useTransform(scrollY, [900, 1000], [1, 0]); // No fade in, only fade out at end
    const t2Scale = useTransform(scrollY, [350, 1000], [0.9, 1.2]);
    const t2Y = useTransform(scrollY, [350, 650, 1000], ["100vh", "0vh", "-15vh"]);
    const t2RotateX = useTransform(scrollY, [350, 550, 900, 1000], [45, 0, 0, -45]);
    const t2Blur = useTransform(scrollY, [350, 500, 900, 1000], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(15px)"]);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.05,
            smoothWheel: true,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div>
            <Navbar />
            <div className='h-[230vh] relative'>
                <div className='bg-zinc-900 h-screen w-full flex flex-col fixed top-0 left-0 -z-10 overflow-hidden'>
                    // Background
                    <div className="absolute inset-0 w-full h-full bg-[#09090b] z-0">
                        <CreativeHeroBackground />
                    </div>

                    <div className="relative w-full flex-1 z-10 pointer-events-none pt-[10vh]">

                        {/* Stage 1 text */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">


                            {/* Line 1 */}
                            <motion.div
                                style={{ y: line1Y, opacity: line1Opacity, x: line1X, skewX: line1SkewX }}
                                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4"
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-zinc-400 text-3xl sm:text-5xl md:text-[4vw] font-semibold tracking-tight"
                                >
                                    Hello, I'm a
                                </motion.span>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className="pointer-events-auto px-5 py-1 sm:py-1.5 rounded-full bg-[#132338] border border-[#3B82F6]/30 text-[#3B82F6] text-lg sm:text-3xl md:text-[2.5vw] font-mono font-semibold shadow-inner flex items-center gap-2 cursor-default"
                                >
                                    <span className="text-white font-sans text-sm sm:text-base">✦</span> Creative
                                </motion.div>
                            </motion.div>

                            {/* Line 2 */}
                            <motion.div
                                style={{ y: line2Y, opacity: line2Opacity, x: line2X, rotateY: line2RotateY }}
                                className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-3 sm:mb-5"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.4 }}
                                >
                                    <motion.div
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ x: magneticSpringX, y: magneticSpringY }}
                                        whileHover={{ scale: 1.02 }}
                                        className="pointer-events-auto px-6 sm:px-10 py-1.5 sm:py-3 rounded-[2rem] sm:rounded-[3rem] bg-[#3B82F6] text-white text-4xl sm:text-7xl md:text-[7.5vw] font-extrabold tracking-tight shadow-[0_10px_30px_rgba(59,130,246,0.3)] select-none cursor-default"
                                    >
                                        FULL STACK
                                    </motion.div>
                                </motion.div>
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-white text-4xl sm:text-7xl md:text-[7.5vw] font-extrabold tracking-tight"
                                >
                                    DEVELOPER
                                </motion.span>
                            </motion.div>

                            {/* Line 3 */}
                            <motion.div
                                style={{ y: nameY, scale: nameScale, opacity: nameOpacity, filter: nameBlur }}
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.6 }}
                                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 sm:mt-4 pointer-events-auto"
                            >
                                <span className="text-white text-5xl sm:text-7xl md:text-[7vw] font-black tracking-tighter drop-shadow-md">Manas</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-cyan-400 text-5xl sm:text-7xl md:text-[7vw] font-black tracking-tighter drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">Kapoor.</span>
                            </motion.div>
                        </div>

                        {/* Stage 2 Text */}
                        <motion.div
                            style={{ opacity: t2Opacity, scale: t2Scale, y: t2Y, rotateX: t2RotateX, filter: t2Blur }}
                            className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
                        >

                            <h2 className="text-white text-5xl sm:text-8xl md:text-[8vw] font-black tracking-tighter leading-none mb-2 sm:mb-4">
                                WHO CODES WITH
                            </h2>
                            <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-700 text-5xl sm:text-8xl md:text-[8vw] font-black tracking-tighter leading-none">
                                PURPOSE
                            </h2>
                        </motion.div>

                    </div>

                    <div className='relative z-10 w-full h-[31vh] flex flex-col mt-auto'>
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
            </div>
            <Skills />
            <About />
            <Project />
            <section className="grid relative z-10 place-content-center gap-2 bg-zinc-700 px-8 py-24 text-black text-center w-full">

                <FlipLink href="#"
                >
                    Resume
                </FlipLink>

                <FlipLink
                    href="https://www.linkedin.com/in/manas-kapoor-2588b4274/"

                >
                    Linkedin
                </FlipLink>

                <FlipLink
                    href="https://github.com/BeingAlmighty"
                >
                    Github
                </FlipLink>

                <FlipLink
                    href="https://wa.me/919650419638"
                >
                    Whatsapp
                </FlipLink>

            </section>
        </div>
    )
}

export default LandingPage;
