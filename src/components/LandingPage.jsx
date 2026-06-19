import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import Navbar from './Navbar';
import Lenis from 'lenis';
import Skills from './Skills'
import About from './About';
import FlipLink from './Links';
import Project from './Projects';
import Hero from './Hero';
import CursorMask from './CursorMask';
import { CursorProvider } from '../context/CursorContext';
import { TransitionProvider, useSectionTransition } from '../context/TransitionContext';
import TransitionOverlay from './TransitionOverlay';

const LandingPageContent = () => {
    const { setLenis, transitionState } = useSectionTransition();

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.05,
            smoothWheel: true,
        });
        
        setLenis(lenis);

        return () => {
            lenis.destroy();
            setLenis(null);
        };
    }, [setLenis]);

    const contentVariants = {
        idle: { opacity: 1, y: 0 },
        exiting: { opacity: 0, y: 20, transition: { duration: 0.7 } },
        hidden: { opacity: 0, y: 0 },
        entering: { opacity: 1, y: 0, transition: { duration: 0 } }
    };

    return (
        <CursorProvider>
            <TransitionOverlay />
            <Navbar />

            <motion.div 
                variants={contentVariants}
                initial="idle"
                animate={transitionState}
            >
                {/* BACKGROUND HERO */}
                <div className='fixed top-0 left-0 w-full h-screen z-0 pointer-events-auto'>
                    <CursorMask>
                        <Hero />
                    </CursorMask>

                    {/* CURVED LOOP MARQUEE*/}
                    <div className="absolute bottom-0 left-0 w-full z-20 flex justify-center items-end pb-8 pointer-events-none">
                        <div className='w-full flex justify-center items-center scale-[1.8] sm:scale-[1.4] md:scale-[1.2] lg:scale-100 pointer-events-auto'>
                            <CurvedLoop
                                marqueeText=" Logic • Creativity • Passion • Vision • Innovation • "
                                speed={3}
                                curveAmount={80}
                                direction="right"
                                interactive={true}
                                className="custom-text-style"
                                style={{ color: '#ffffff' }}
                            />
                        </div>
                    </div>
                </div>

                <div className='relative h-[180vh] sm:h-[210vh] w-full pointer-events-none'></div>

                {/* Sub-sections */}
                <Skills />
                <About />
                <Project />
                <motion.section 
                    id="contact" 
                    initial="hidden"
                    animate={transitionState === 'idle' || transitionState === 'entering' ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
                    }}
                    className="grid relative z-10 place-content-center gap-2 bg-zinc-700 px-8 py-24 text-black text-center w-full"
                >
                    <FlipLink href="https://drive.google.com/file/d/1lhxT4RBWlrfRiIyTlCMk44zeCW8bjNIH/view?usp=sharing">
                        Resume
                    </FlipLink>
                    <FlipLink href="https://www.linkedin.com/in/manas-kapoor-2588b4274/">
                        Linkedin
                    </FlipLink>
                    <FlipLink href="https://github.com/BeingAlmighty">
                        Github
                    </FlipLink>
                    <FlipLink href="https://wa.me/919650419638">
                        Whatsapp
                    </FlipLink>
                </motion.section>
            </motion.div>
        </CursorProvider>
    )
}

const LandingPage = () => {
    return (
        <TransitionProvider>
            <LandingPageContent />
        </TransitionProvider>
    );
};

export default LandingPage;
