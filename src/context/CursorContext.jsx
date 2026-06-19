import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCursorEngine } from '../hooks/useCursorEngine';
import { useSectionTransition } from './TransitionContext';

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
    const engine = useCursorEngine();
    const { transitionState } = useSectionTransition();
    
    const [hoverState, setHoverState] = useState('default'); 
    const [targetSize, setTargetSize] = useState(40);

    useEffect(() => {
        if (transitionState !== 'idle') {
            setTargetSize(0);
            return;
        }
        switch(hoverState) {
            case 'link':
                setTargetSize(130);
                break;
            case 'image':
                setTargetSize(150);
                break;
            case 'button':
                setTargetSize(100);
                break;
            default:
                setTargetSize(40);
                break;
        }
    }, [hoverState]);

    const handleHover = (type) => setHoverState(type);
    const resetHover = () => setHoverState('default');

    return (
        <CursorContext.Provider value={{ engine, hoverState, targetSize, handleHover, resetHover }}>
            {children}
        </CursorContext.Provider>
    );
}
export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}
