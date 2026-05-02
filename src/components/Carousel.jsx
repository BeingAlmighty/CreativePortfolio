'use client'
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { createPortal } from "react-dom";

const projects = [
    {
        title: "Digital Agency",
        src: "/images/project_1.png",
        color: "#000000",
    },
    {
        title: "E-commerce Dash",
        src: "/images/project_2.png",
        color: "#1a1a2e",
    },
    {
        title: "Neon App",
        src: "/images/project_3.png",
        color: "#16003B",
    },
    {
        title: "AI Tool",
        src: "/images/project_4.png",
        color: "#0d0221",
    },
];

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.3 } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.3 } },
};

export default function Carousel({ isMobile = false }) {

    const [modal, setModal] = useState({ active: false, index: 0 });
    const { active, index } = modal;

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const modalContainer = useRef(null);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);

    let xMoveContainer = useRef(null);
    let yMoveContainer = useRef(null);
    let xMoveCursor = useRef(null);
    let yMoveCursor = useRef(null);
    let xMoveCursorLabel = useRef(null);
    let yMoveCursorLabel = useRef(null);

    useEffect(() => {
        if (!mounted) return;
        //Move Container
        xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
        //Move cursor
        xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
        yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
        //Move cursor label
        xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
        yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });
    }, [mounted]);

    const moveItems = (x, y) => {
        if (!xMoveContainer.current) return;
        xMoveContainer.current(x);
        yMoveContainer.current(y);
        xMoveCursor.current(x);
        yMoveCursor.current(y);
        xMoveCursorLabel.current(x);
        yMoveCursorLabel.current(y);
    };

    const manageModal = (active, index, x, y) => {
        moveItems(x, y);
        setModal({ active, index });
    };

    return (
        <main
            onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
            className="flex flex-col md:flex-row items-center justify-center min-h-[50vh] md:min-h-screen w-full md:w-screen text-white overflow-hidden"
        >

            {/* PROJECT LIST */}
            <div className={`w-full h-full flex ${isMobile ? 'flex-col' : 'flex-row'} hide-scrollbar`}>

                {projects.map((project, i) => (
                    <div
                        key={i}
                        onMouseEnter={(e) => manageModal(true, i, e.clientX, e.clientY)}
                        onMouseLeave={(e) => manageModal(false, i, e.clientX, e.clientY)}
                        className={`group relative text-5xl border-white h-screen flex-shrink-0 font-semibold cursor-pointer transition-all duration-500 overflow-hidden ${
                            isMobile ? 'w-full border-b-2' : 'flex-1 w-[25vw] border-r-2'
                        }`}
                    >
                        <img className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" src={project.src} alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/40 transition duration-500"></div>

                        <div className="absolute bottom-10 left-10 text-white z-10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <h2 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h2>
                            <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-lg font-normal flex items-center gap-2">
                                <span>View Project</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            {mounted && createPortal(
                <>
                    {/* IMAGE MODAL */}
                    <motion.div
                        ref={modalContainer}
                        variants={scaleAnimation}
                        initial="initial"
                        animate={active ? "enter" : "closed"}
                        className={`fixed top-1/2 left-1/2 w-[350px] h-[300px] overflow-hidden pointer-events-none z-50 ${isMobile ? 'xl:hidden' : 'hidden xl:block'}`}
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
                        className={`fixed w-[80px] h-[80px] rounded-full bg-blue-600 pointer-events-none z-50 ${isMobile ? 'xl:hidden' : 'hidden xl:block'}`}
                    />

                    {/* CURSOR TEXT */}
                    <motion.div
                        ref={cursorLabel}
                        variants={scaleAnimation}
                        initial="initial"
                        animate={active ? "enter" : "closed"}
                        className={`fixed w-[80px] h-[80px] pointer-events-none z-[80] bg-transparent ${isMobile ? 'xl:hidden' : 'hidden xl:block'}`}
                    >
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium text-base">
                            View
                        </span>
                    </motion.div>
                </>,
                document.body
            )}

        </main>
    );
}