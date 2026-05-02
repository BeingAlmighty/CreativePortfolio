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
                    const link = item === 'About' ? '/about' : '#';
                    return (
                        <a key={index} href={link} className={`text-white text-lg mx-2 font-normal ${index === 0 ? 'bg-zinc-900 hover:bg-zinc-800 hover:text-white shadow-md' : ''} cursor-pointer hover:text-zinc-900 transition-all duration-300 hover:bg-white/90 px-6 py-3 rounded-4xl flex items-center justify-center`}>
                            {item}
                        </a>
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
                    className="md:hidden fixed z-[998] top-16 left-5 right-5 bg-white/10 border border-white/20 shadow-xl backdrop-blur-3xl rounded-2xl p-4 flex flex-col gap-2"
                >
                    {['Home', 'About', 'Projects', 'Contact'].map((item, index) => {
                        const link = item === 'About' ? '/about' : '#';
                        return (
                            <a key={index} href={link} className={`text-center text-white text-lg py-3 px-4 font-medium ${index === 0 ? 'bg-zinc-900 shadow-md' : 'bg-transparent'} cursor-pointer hover:text-zinc-900 hover:bg-white/90 transition-all duration-300 rounded-xl`}>
                                {item}
                            </a>
                        )
                    })}
                </motion.div>
            )}
        </>
    )
}

export default Navbar
