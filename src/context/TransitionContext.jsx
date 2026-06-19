import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [transitionState, setTransitionState] = useState('idle'); // idle, exiting, hidden, entering
    const [targetSection, setTargetSection] = useState(null);
    const [transitionType, setTransitionType] = useState('curtain');
    const [isDebugMode, setIsDebugMode] = useState(false);
    
    const lenisRef = useRef(null);
    const isTransitioningRef = useRef(false);

    const setLenis = useCallback((lenisInstance) => {
        lenisRef.current = lenisInstance;
    }, []);

    const transitionToSection = useCallback((targetId, options = {}) => {
        const { type = 'curtain' } = options;

        if (isTransitioningRef.current) return;
        
        isTransitioningRef.current = true;
        setTransitionType(type);
        setTargetSection(targetId);
        
        if (lenisRef.current) {
            lenisRef.current.stop();
        }

        if (isDebugMode) console.log(`[Transition] ${targetId} - START`);

        setTransitionState('exiting');
        if (isDebugMode) console.log(`[Transition] ${targetId} - EXITING`);

        setTimeout(() => {
            
            setTransitionState('hidden');
            if (isDebugMode) console.log(`[Transition] ${targetId} - HIDDEN`);

            setTimeout(() => {
                
                if (lenisRef.current) {
                    lenisRef.current.start();
                    lenisRef.current.scrollTo(targetId, { immediate: true });
                    
                    requestAnimationFrame(() => {
                        if (isTransitioningRef.current && transitionState !== 'idle') {
                            lenisRef.current.stop();
                        }
                    });
                } else {
                    const el = document.querySelector(targetId);
                    if (el) el.scrollIntoView({ behavior: 'auto' });
                }

                setTimeout(() => {
                    setTransitionState('entering');
                    if (isDebugMode) console.log(`[Transition] ${targetId} - ENTERING`);

                    setTimeout(() => {
                        setTransitionState('idle');
                        setTargetSection(null);
                        isTransitioningRef.current = false;
                        
                        if (lenisRef.current) {
                            lenisRef.current.start();
                        }
                        
                        if (isDebugMode) console.log(`[Transition] ${targetId} - IDLE`);
                    }, 1000);
                }, 50);
            }, 100);
        }, 800); 

    }, [isDebugMode]);

    return (
        <TransitionContext.Provider value={{
            transitionState,
            targetSection,
            transitionType,
            transitionToSection,
            setLenis,
            isDebugMode,
            setIsDebugMode
        }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useSectionTransition = () => useContext(TransitionContext);
