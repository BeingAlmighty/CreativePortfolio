import React, { useState } from 'react'
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div initial={{ opacity: 0, y: "-50px" }} animate={{ opacity: 1, y: 0 }} transition={{
                delay: 0.3, type: "spring", stiffness: 120,
                damping: 12,
            }} className="hidden md:flex fixed z-[999] top-5 left-1/2 -translate-x-1/2 h-[9vh] 
                border border-white/20 shadow-md backdrop-blur-2xl 
                rounded-full bg-white/20 items-center justify-evenly">
                {['Home', 'About', 'Projects', 'Contact'].map((item, index) => {
                    return (
                        <div key={index} className={`text-white text-lg mx-2 font-normal ${index === 0 && 'bg-zinc-900 hover:bg-zinc-900 hover:text-white px-6 py-3'} cursor-pointer hover:text-black transition hover:bg-zinc-300 px-6 py-3 rounded-4xl`}>
                            <a href={`${index===1 && '/about'}`}>{item}</a>
                        </div>
                    )
                })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: "-50px" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
                className="md:hidden fixed z-[999] top-5 left-5 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X className="text-white w-6 h-6" />
                ) : (
                    <Menu className="text-white w-6 h-6" />
                )}
            </motion.div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "-20px" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-20px" }}
                    className="md:hidden fixed z-[998] top-16 left-5 right-5 bg-white/20 border border-white/20 backdrop-blur-2xl rounded-2xl p-4"
                >
                    {['Home', 'About', 'Projects', 'Contact'].map((item, index) => {
                        return (
                            <div key={index} className={`text-white text-lg py-3 px-4 font-normal ${index === 0 && 'bg-zinc-900 rounded-2xl'} cursor-pointer hover:text-black transition hover:bg-zinc-300 rounded-lg mb-2`}>
                                <a href={`${index===1 && '/about'}`}>{item}</a>
                            </div>
                        )
                    })}
                </motion.div>
            )}
        </>
    )
}

export default Navbar
