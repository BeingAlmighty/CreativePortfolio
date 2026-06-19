import React from 'react';
import { useSectionTransition } from '../context/TransitionContext';

const TransitionDebug = () => {
    const { transitionState, targetSection, transitionType, isDebugMode, setIsDebugMode } = useSectionTransition();

    if (!isDebugMode && process.env.NODE_ENV !== 'development') return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100000] bg-black/80 text-[#00FF00] font-mono text-[10px] p-3 rounded-lg border border-[#00FF00]/30 shadow-[0_0_20px_rgba(0,255,0,0.1)] pointer-events-auto backdrop-blur-md flex flex-col gap-1 min-w-[200px]">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#00FF00]/20">
                <span className="font-bold tracking-widest uppercase">Transition Core</span>
                <button 
                    onClick={() => setIsDebugMode(!isDebugMode)}
                    className="px-2 py-0.5 bg-[#00FF00]/10 hover:bg-[#00FF00]/20 rounded transition-colors"
                >
                    {isDebugMode ? 'ON' : 'OFF'}
                </button>
            </div>
            
            {isDebugMode && (
                <>
                    <div className="flex justify-between">
                        <span className="opacity-60">State:</span>
                        <span className="text-white">{transitionState}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="opacity-60">Target:</span>
                        <span className="text-white">{targetSection || 'none'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="opacity-60">Type:</span>
                        <span className="text-white">{transitionType}</span>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-[#00FF00]/20 text-[9px] opacity-50 flex justify-between">
                        <span>engine: Lenis</span>
                        <span>UI: Framer</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default TransitionDebug;
