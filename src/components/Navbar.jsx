import React from 'react';
import { motion } from 'framer-motion';
import { useSectionTransition } from '../context/TransitionContext';

const Navbar = () => {
    const { transitionState, transitionToSection } = useSectionTransition();
    const isTransitioning = transitionState !== 'idle';

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        transitionToSection(targetId);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }} 
            className={`absolute top-0 left-0 w-full z-[999] px-8 lg:px-24 pt-8 md:pt-12 grid grid-cols-3 items-center pointer-events-none transition-all duration-500 ${isTransitioning ? 'opacity-50 blur-sm' : 'opacity-100'}`}
        >
            <div></div>

            {/* Center: Links */}
            <div className="hidden md:flex justify-center items-center gap-8 lg:gap-12 font-medium text-[13px] tracking-widest uppercase pointer-events-auto" style={{ color: 'var(--hero-text)' }}>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">About</a>
                <a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')} className="hover:text-white transition-colors">Portfolio</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contact</a>
            </div>

            {/* Right: Status */}
            <div className="flex justify-end items-center gap-3 font-semibold text-[13px] tracking-wide uppercase text-white pointer-events-auto cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                Open to work
            </div>
        </motion.div>
    );
}

export default Navbar;
