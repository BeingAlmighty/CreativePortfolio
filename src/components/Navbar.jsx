import React from 'react'
import { motion } from 'motion/react';

const Navbar = () => {
    return (
        <motion.div initial={{ opacity: 0, y: "-50px" }} animate={{ opacity: 1, y: 0 }} transition={{
         delay: 0.3, type: "spring", stiffness: 120,
            damping: 12,
        }} className="fixed z-[999] top-5 left-1/2 -translate-x-1/2 h-[9vh] 
                border border-white/20 shadow-md backdrop-blur-2xl 
                rounded-full bg-white/20 flex items-center justify-evenly">
            {['Home', 'About', 'Projects', 'Contact'].map((item, index) => {
                return (
                    <div key={index} className={`text-white text-lg mx-2 font-normal ${index === 0 && 'bg-zinc-900 hover:bg-zinc-900 hover:text-white px-6 py-3'} cursor-pointer hover:text-black transition hover:bg-zinc-300 px-6 py-3 rounded-4xl`}>
                        <a href={`${index===1 && '/about'}`}>{item}</a>
                    </div>
                )
            })}
        </motion.div>
    )
}

export default Navbar
