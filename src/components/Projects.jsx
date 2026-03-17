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

                    <div className="w-screen h-screen flex items-center justify-center bg-blue-500">
                        Panel 2
                    </div>

                </motion.div>

            </div>

        </section>
    );
};

export default Project;