import React from 'react';
import { motion } from 'framer-motion';
import { useSectionTransition } from '../context/TransitionContext';

const TransitionOverlay = () => {
    const { transitionState, transitionType } = useSectionTransition();
    
    const isActive = transitionState !== 'idle';
    
    const pathVariants = {
        idle: { 
            d: "M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z",
            transition: { duration: 0 } 
        },
        exiting: {
            d: [
                "M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z",
                "M 0 50 Q 30 -20 100 50 L 100 100 Q 50 100 0 100 Z",
                "M 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z"
            ],
            transition: { duration: 0.8, times: [0, 0.6, 1], ease: [0.76, 0, 0.24, 1] }
        },
        hidden: { 
            d: "M 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z",
            transition: { duration: 0 }
        },
        entering: {
            d: [
                "M 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z",
                "M 0 0 Q 50 0 100 0 L 100 50 Q 70 120 0 50 Z",
                "M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z"
            ],
            transition: { duration: 1.0, times: [0, 0.4, 1], ease: [0.76, 0, 0.24, 1] }
        }
    };

    if (transitionType !== 'curtain') return null;

    return (
        <div className={`fixed inset-0 z-[9999] pointer-events-none ${isActive ? 'block' : 'hidden'}`}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    variants={pathVariants}
                    initial="idle"
                    animate={transitionState}
                    fill="#050505"
                    style={{ filter: 'drop-shadow(0px -10px 20px rgba(79, 139, 255, 0.15))' }}
                />
            </svg>
        </div>
    );
};

export default TransitionOverlay;
