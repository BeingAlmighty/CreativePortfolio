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

const LandingPage = () => {
    const lenis = new Lenis({
        autoRaf: true,
    });

    return (
        <div>
            <Navbar />
            <div className='bg-zinc-900 h-screen flex flex-col justify-end items-start sticky top-0 overflow-x-hidden'>
                <div className="container absolute inset-0">
                    <Particles
                        particleColors={["#ffffff"]}
                        particleCount={300}
                        particleSpread={14}
                        speed={0.1}
                        particleBaseSize={100}
                        sizeRandomness={1}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                        pixelRatio={1}
                    />
                </div>
                <div className="masker pointer-events-none pl-[3vw] h-[55vh] flex flex-col justify-center z-10">
                    {["Hello, I'm a", "Talented Dev", "Manas Kapoor"].map((item, index) => {
                        return (
                            <div key={index} className={` ${index == 2 ? 'text-[#3B82F6]' : 'text-white'} ${index === 1 && 'flex justify-center items-center'} text-[8vw] font-bold leading-[14vh] tracking-tighter pointer-events-none`}>
                                {index === 1 && <motion.div initial={{ x: "-250px" }} animate={{ x: 0 }} transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 120, damping: 12, delay: 0.3 }} className='bg-blue-500 mt-3 mr-5 rounded-4xl w-[15vw] h-[10vh] text-3xl tracking-normal flex justify-center items-center overflow-hidden'>
                                    <img className='object-cover rounded-4xl ' src="https://images.gr-assets.com/hostedimages/1412267837ra/11348431.gif" alt="" />
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
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
                    className='w-full flex justify-center items-center pointer-events-none z-10'>
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
            <Project />
            <section className="grid relative z-10 place-content-center gap-2 bg-zinc-700 px-8 py-24 text-black">
                <FlipLink href="#">Twitter</FlipLink>
                <FlipLink href="#">Linkedin</FlipLink>
                <FlipLink href="#">Facebook</FlipLink>
                <FlipLink href="#">Instagram</FlipLink>
            </section>
        </div>
    )
}

export default LandingPage;
