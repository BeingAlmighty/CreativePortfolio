import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Lenis from 'lenis'
import Carousel from './Carousel'

const Project = () => {
    const lenis = new Lenis({
        autoRaf: true,
    });
    
    // Mobile Ref & Scroll
    const ref = useRef(null);
    const { scrollYProgress: mobileScroll } = useScroll({ target: ref });
    const mobileY = useTransform(mobileScroll, [0, 0.8], ["0vh", "-300vh"]);
    const mobileX = useTransform(mobileScroll, [0.8, 1], ["0vw", "-100vw"]);

    // Desktop Ref & Scroll
    const desktopRef = useRef(null);
    const { scrollYProgress: desktopScroll } = useScroll({ target: desktopRef });
    const desktopX = useTransform(desktopScroll, [0.1, 1], ["0%", "-25%"]);

    return (
        <>
            {/* MOBILE VERSION */}
            <section ref={ref} className="xl:hidden relative h-[500vh] bg-black">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <motion.div
                        style={{ x: mobileX, y: mobileY }}
                        className="flex items-end w-[200vw] h-[400vh]"
                    >
                        <div className="w-[100vw] h-full flex-shrink-0">
                            <Carousel isMobile={true} />
                        </div>

                        <div className="w-[100vw] h-screen overflow-hidden flex items-center justify-center flex-shrink-0">
                            <video
                                src="/website.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover object-center border-l-2 border-white/20"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DESKTOP VERSION */}
            <section ref={desktopRef} className="hidden xl:block relative h-[300vh] bg-black">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <motion.div
                        style={{ x: desktopX }}
                        className="flex w-[200vw] h-full"
                    >
                        <div className="w-screen h-full flex-shrink-0">
                            <Carousel isMobile={false} />
                        </div>

                        <div className="w-1/3 h-screen overflow-hidden flex items-center justify-center flex-shrink-0">
                            <video
                                src="/website.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover object-center border-l-2 border-white/20"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Project;