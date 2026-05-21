import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [activeWord, setActiveWord] = useState(0); 
    const [phase, setPhase] = useState('loading');

    useEffect(() => {
        let currentProgress = 0;
        
        const interval = setInterval(() => {
            const increment = currentProgress > 80 ? (Math.random() * 3 + 1) : (Math.random() * 6 + 2);
            currentProgress += increment;
            
            if (currentProgress >= 100) {
                currentProgress = 100;
                setProgress(100);
                setActiveWord(3); 
                clearInterval(interval);
                
                setTimeout(() => {
                    setPhase('curtain');
                    
                    
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 800);
                }, 400);
            } else {
                setProgress(Math.floor(currentProgress));

                if (currentProgress < 30) setActiveWord(0);
                else if (currentProgress < 65) setActiveWord(1);
                else setActiveWord(2);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    const wordVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <motion.div 
                className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-[#09090b] overflow-hidden"
                exit={{ opacity: 0, transition: { duration: 0 } }}
                data-lenis-prevent="true"
            >
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-[#09090b] to-[#09090b]"></div>

                <motion.div 
                    className="relative z-10 flex flex-row items-center justify-center gap-4 sm:gap-6 text-3xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase whitespace-nowrap"
                    animate={{ 
                        x: activeWord === 0 ? "33%" : activeWord === 1 ? "0%" : activeWord === 2 ? "-33%" : "0%",
                        scale: activeWord === 3 ? 1 : 1.6
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <AnimatePresence>
                        {activeWord >= 0 && (
                            <motion.div variants={wordVariants} initial="hidden" animate="visible" className="text-white">
                                Welcome
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                        {activeWord >= 1 && (
                            <motion.div variants={wordVariants} initial="hidden" animate="visible" className="text-zinc-500 font-mono text-2xl sm:text-4xl md:text-6xl tracking-widest">
                                to my
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activeWord >= 2 && (
                            <motion.div variants={wordVariants} initial="hidden" animate="visible" className="text-white">
                                Portfolio
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="absolute bottom-[10%] w-[60%] max-w-lg flex flex-col items-center gap-3 z-10">
                    <div className="w-full flex justify-center text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase">
                        System Initialization
                    </div>
                    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.15 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* 
              The Black Curtain Wipe 
            */}
            <motion.div 
                className="fixed inset-0 z-[10000] bg-black pointer-events-none"
                initial={{ y: "100%" }}
                animate={phase === 'curtain' ? { y: "0%" } : { y: "100%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
        </>
    );
};

export default Preloader;
