'use client'
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { div } from "motion/react-client";

const projects = [
    {
        title: "C2 Montreal",
        src: "https://picsum.photos/600/400?1",
        color: "#000000",
    },
    {
        title: "Office Studio",
        src: "https://picsum.photos/600/400?2",
        color: "#8C8C8C",
    },
    {
        title: "Locomotive",
        src: "https://picsum.photos/600/400?3",
        color: "#EFE8D3",
    },
    {
        title: "Silencio",
        src: "https://picsum.photos/600/400?4",
        color: "#706D63",
    },
];

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.3 } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.3 } },
};

export default function Carousel() {

    const [modal, setModal] = useState({ active: false, index: 0 });
    const { active, index } = modal;

    const modalContainer = useRef(null);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);

    const moveItems = (x, y) => {
        gsap.to(modalContainer.current, { left: x, top: y, duration: 0.5 });
        gsap.to(cursor.current, { left: x, top: y, duration: 0.3 });
        gsap.to(cursorLabel.current, { left: x, top: y, duration: 0.2 });
    };

    const manageModal = (active, index, x, y) => {
        moveItems(x, y);
        setModal({ active, index });
    };

    return (
        <main
            onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
            className="flex items-center justify-center min-h-screen w-screen text-white"
        >

            {/* PROJECT LIST */}
            <div className="w-screen flex">

                {projects.map((project, i) => (
                    <div
                        key={i}
                        onMouseEnter={(e) =>
                            manageModal(true, i, e.clientX, e.clientY)
                        }
                        onMouseLeave={(e) =>
                            manageModal(false, i, e.clientX, e.clientY)
                        }
                        className="relative text-5xl flex-1 border-r-2 border-white h-screen w-[25vw] font-semibold cursor-pointer hover:opacity-60 transition "
                    >
                        <img className="w-full h-screen object-cover" src={project.src} alt="" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>

                        <div className="absolute bottom-10 left-10 text-white z-10">
                            <h2 className="text-3xl font-semibold">{project.title}</h2>
                            <p className="opacity-0 group-hover:opacity-100 transition duration-500">
                                View Project
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            {/* IMAGE MODAL */}
            <motion.div
                ref={modalContainer}
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
                className="fixed top-1/2 left-1/2 w-[350px] h-[300px] overflow-hidden pointer-events-none z-50"
            >

                <div
                    style={{ transform: `translateY(${-index * 100}%)` }}
                    className="h-full w-full transition-transform duration-500"
                >
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            style={{ backgroundColor: project.color }}
                            className="h-[300px] w-full flex items-center justify-center"
                        >
                            <img
                                src={project.src}
                                className="w-[80%] object-cover"
                            />
                        </div>
                    ))}
                </div>

            </motion.div>

            {/* CURSOR CIRCLE */}
            <motion.div
                ref={cursor}
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
                className="fixed w-[80px] h-[80px] rounded-full bg-blue-600 pointer-events-none z-50"
            />

            {/* CURSOR TEXT */}
            <motion.div
                ref={cursorLabel}
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
                className="fixed w-[80px] h-[80px] flex items-center justify-center text-white pointer-events-none z-50"
            >
                View
            </motion.div>

        </main>
    );
}