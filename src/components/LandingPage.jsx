import React from 'react'
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CurvedLoop from './CurvedLoop';
import Navbar from './Navbar';
import Lenis from 'lenis'
import Skills from './Skills';
import About from './About';
import RevealLinks from './Links';

const LandingPage = () => {
    const lenis = new Lenis({
        autoRaf: true,
    });

    return (
        <div>
            <Navbar />
            <div className='bg-zinc-900 h-screen z-[-999] flex flex-col justify-end items-start sticky top-0'>
                <div className="container">

                </div>
                <div className="masker pl-[3vw] h-[55vh] flex flex-col justify-center ">
                    {["Hello, I'm a", "Talented Dev", "Manas Kapoor"].map((item, index) => {
                        return (
                            <div key={index} className={`text-white ${index === 1 && 'flex justify-center items-center'} text-[8vw] font-bold leading-[14vh] tracking-tighter`}>
                                {index === 1 && <motion.div initial={{ x: "-250px" }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 120, damping: 12, delay: 0.3 }} className='bg-blue-500 mt-3 mr-5 rounded-4xl w-[15vw] h-[10vh] text-3xl tracking-normal flex justify-center items-center'>
                                    Hello Bhai
                                </motion.div>}
                                <motion.span
                                    key={index}
                                    initial={{ x: "-150px" }}
                                    animate={{ x: index === 1 ? 10 : 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 12,
                                        delay: 0.3
                                    }}
                                >
                                    {item}
                                </motion.span>
                            </div>
                        )
                    })}
                </div>
                <div className='w-full border-[1px] border-white/30 mt-[8vh]'></div>

                <motion.div
                    initial={{ y: "200px" }}
                    animate={{y:0}}
                    transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
                className='w-full flex justify-center items-center'>
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
            <Skills />
            <About />
            <RevealLinks />
        </div>
    )
}

export default LandingPage;
