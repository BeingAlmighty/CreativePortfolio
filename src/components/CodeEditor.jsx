import React from 'react';

const CodeEditor = () => {
  return (
    <div className="relative rounded-lg bg-slate-900 p-2">
      <div className="relative flex text-center">
        <div className="flex pl-3.5 pt-3"><svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20">
            <circle r={12} cy={12} cx={12} />
          </svg><svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20">
            <circle r={12} cy={12} cx={12} />
          </svg><svg viewBox="0 0 24 24" fill="currentColor" className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20">
            <circle r={12} cy={12} cx={12} />
          </svg></div><span className="absolute inset-x-0 top-2 text-xs text-slate-500">Life.jsx</span>
      </div>
      <div className="mt-5 space-y-2 px-5 pb-10 text-xs">

        <p className="mt-4 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Life</span><span className="text-slate-500">&gt;</span>
        </p>
        
        {/* Education Section */}
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Education</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-6 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Institution</span><span className="text-slate-500">&gt;</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"><span className="relative text-blue-400">NIT Delhi</span></span><span className="text-slate-500">&lt;/</span><span className="text-pink-400">Institution</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-6 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Branch</span><span className="text-slate-500">&gt;</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"><span className="relative text-blue-400">ECE</span></span><span className="text-slate-500">&lt;/</span><span className="text-pink-400">Branch</span><span className="text-slate-500">&gt;</span>
        </p>
        
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;/</span><span className="text-pink-400">Education</span><span className="text-slate-500">&gt;</span>
        </p>

        {/* Experience Section */}
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Experience</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-6 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Milestone</span><span className="text-slate-500">&gt;</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"><span className="relative text-blue-400">Led teams in hackathons like SIH, CodeSlayer.</span></span><span className="text-slate-500">&lt;/</span><span className="text-pink-400">Milestone</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-6 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Milestone</span><span className="text-slate-500">&gt;</span><span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"><span className="relative text-blue-400">Secured 2nd Place at the SmartCodeWeb 1.0 hackathon.</span></span><span className="text-slate-500">&lt;/</span><span className="text-pink-400">Milestone</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;/</span><span className="text-pink-400">Experience</span><span className="text-slate-500">&gt;</span>
        </p>

        {/* Philosophy Section */}
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Philosophy</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-6 font-mono font-normal tracking-wide text-violet-400">
          <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"><span className="relative text-blue-400">Applying academic rigor to build agile, real-world solutions.</span></span>
        </p>
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;/</span><span className="text-pink-400">Philosophy</span><span className="text-slate-500">&gt;</span>
        </p>

        {/* Goal Section */}
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;</span><span className="text-pink-400">Goal</span><span className="text-slate-500">&gt;</span>
        </p>
        <p className="ml-6 font-mono font-normal tracking-wide text-violet-400">
          <span className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"><span className="relative text-blue-400">To create scalable and intelligent systems.</span></span>
        </p>
        <p className="ml-3 font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;/</span><span className="text-pink-400">Goal</span><span className="text-slate-500">&gt;</span>
        </p>

        <p className="font-mono font-normal tracking-wide text-violet-400">
          <span className="text-slate-500">&lt;/</span><span className="text-pink-400">Life</span><span className="text-slate-500">&gt;</span>
        </p>
      </div>
    </div>
  );
}

export default CodeEditor;
