import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Lenis from 'lenis'
import Carousel from './Carousel'

const Project = () => {
    const lenis = new Lenis({
        autoRaf: true,
    });
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const x = useTransform(scrollYProgress, [0.3, 1], ["0%", "-25%"]);

    return (
        <section ref={ref} className="relative h-[300vh] bg-black">

            <div className="sticky top-0 h-screen overflow-hidden">

                <motion.div
                    style={{ x }}
                    className="flex w-[200vw] h-full"
                >
                    <Carousel />

                    <div className="w-1/3 h-screen overflow-hidden flex items-center justify-center">
                        <video
                            src="/website.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default Project;