import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Carousel from './Carousel'
import { useSectionTransition } from '../context/TransitionContext'

const Project = () => {
    const { transitionState } = useSectionTransition();
    const isVisible = transitionState === 'idle' || transitionState === 'entering';
    // For Mobile Scrolling
    const ref = useRef(null);
    const { scrollYProgress: mobileScroll } = useScroll({ target: ref });
    const mobileY = useTransform(mobileScroll, [0, 0.8], ["0vh", "-300vh"]);
    const mobileX = useTransform(mobileScroll, [0.8, 1], ["0vw", "-100vw"]);

    // For Desktop Scrolling
    const desktopRef = useRef(null);
    const { scrollYProgress: desktopScroll } = useScroll({ target: desktopRef });
    const desktopX = useTransform(desktopScroll, [0.1, 1], ["0%", "-25%"]);

    return (
        <div id="portfolio">
            <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } }
                }}
                className="w-full h-full"
            >
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
            </motion.div>
        </div>
    );
};

export default Project;