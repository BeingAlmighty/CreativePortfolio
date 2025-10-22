import { useState } from "react";
import SplitText from "./Loader.jsx";
import CodeEditor from "./CodeEditor.jsx";

export default function Example() {

  const [loader, setLoader] = useState(true)
  const [leetcode, setLeetcode] = useState({
    totalSolved: '',
    Easy: '',
    Medium: '',
    Hard: '',
    totalEasy: '',
    totalMedium: '',
    totalHard: '',
    totalQuestions: ''
  })

 const leetcodeData = async () => {
  try {
    const response = await fetch('/api/AlmightyBeing');
    
    if (!response.ok) {
      throw new Error('Primary API failed');
    }

    const data = await response.json();

    setLeetcode(prev => ({
      ...prev,
      totalSolved: data.totalSolved,
      Easy: data.easySolved,
      Medium: data.mediumSolved,
      Hard: data.hardSolved,
      totalQuestions: data.totalQuestions,
      totalEasy: data.totalEasy,
      totalMedium: data.totalMedium,
      totalHard: data.totalHard,
    }));
  } catch (error) {
    console.warn('Primary API failed, switching to fallback:', error.message);
    
    try {
      const fallbackResponse = await fetch('/api2/AlmightyBeing');
      
      if (!fallbackResponse.ok) throw new Error('Fallback API failed too');
      
      const fallbackData = await fallbackResponse.json();

      setLeetcode(prev => ({
        ...prev,
        totalSolved: fallbackData.totalSolved,
        Easy: fallbackData.easySolved,
        Medium: fallbackData.mediumSolved,
        Hard: fallbackData.hardSolved,
        totalQuestions: fallbackData.totalQuestions,
        totalEasy: fallbackData.totalEasy,
        totalMedium: fallbackData.totalMedium,
        totalHard: fallbackData.totalHard,
      }));
    } catch (fallbackError) {
      console.error('Both APIs failed:', fallbackError.message);
    }
  } finally {
    setLoader(false);
  }
};
  leetcodeData();


  const SolvedCard = ({ type, totalType, typeName }) => {
    const getColor = () => {
      if (typeName === "Easy") return "#00FF00";
      if (typeName === "Medium") return "#FFFF00";
      return "#EF4444";
    };

    return (
      <div className="w-35 h-20 bg-zinc-800 text-white flex flex-col justify-center items-center rounded-lg">
        <h1><span style={{ color: getColor() }}>{typeName}</span> Solved</h1>
        <span><span style={{ color: getColor() }}>{type}</span> /{totalType}</span>
      </div>
    )
  }



  const gap = 2;
  const arcStart = 225;
  const arcAngle = 270 / 360;

  const easyPerc = leetcode.totalSolved > 0 ? (leetcode.Easy / leetcode.totalSolved) * 100 * arcAngle : 0;
  const mediumPerc = leetcode.totalSolved > 0 ? (leetcode.Medium / leetcode.totalSolved) * 100 * arcAngle : 0;
  const hardPerc = leetcode.totalSolved > 0 ? (leetcode.Hard / leetcode.totalSolved) * 100 * arcAngle : 0;

  const easyEnd = easyPerc - gap / 2;
  const medStart = easyPerc + gap / 2;
  const medEnd = easyPerc + mediumPerc - gap / 2;
  const hardStart = easyPerc + mediumPerc + gap / 2;

  const conicGradientStyle = {
    backgroundImage: `conic-gradient(
      from ${arcStart}deg,
      #00FF00 0% ${easyEnd}%,
      #00000000 ${easyEnd}% ${medStart}%,
      #FFFF00 ${medStart}% ${medEnd}%,
      #00000000 ${medEnd}% ${hardStart}%,
      #EF4444 ${hardStart}% 75%,
      #00000000 75% 100%
    )`,
  };

  return (
    <div className="bg-zinc-900 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-400"> <span className="bg-white py-2 px-6 rounded-3xl">India</span></h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          That's all About me
        </p>
        <div className=" grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Leetcode Performance</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  I'm not much into leetcode but still...
                </p>
              </div>
              <div className="flex flex-col mt-6 items-center gap-5 relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">

                {loader ? <SplitText
                  text="Loading..."
                  className="text-2xl font-semibold text-center text-white my-[14vh]"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                /> : <div className="w-60 h-60 relative justify-center items-center mt-5 flex flex-col">
                  <div
                    className="w-full h-full rounded-full"
                    style={conicGradientStyle}
                  ></div>
                  <div className="absolute inset-2 bg-zinc-900 rounded-full"></div>

                  <div className="text-2xl absolute text-white flex flex-col justify-center items-center gap-2">{leetcode.totalSolved} / {leetcode.totalQuestions} <span className="text-green-500">Solved</span></div>
                </div>}
                <div className="flex flex-wrap justify-center items-center gap-6 mt-5">
                  <SolvedCard typeName="Easy" type={leetcode.Easy} totalType={leetcode.totalEasy} />
                  <SolvedCard typeName="Medium" type={leetcode.Medium} totalType={leetcode.totalMedium} />
                  <SolvedCard typeName="Hard" type={leetcode.Hard} totalType={leetcode.totalHard} />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-5 sm:px-10 sm:pt-8">
                <p className="text-lg font-medium tracking-tight text-white max-lg:text-center">Core Skills</p>
                <p className="my-2  max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Key area's where I excel and bring value.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <div className="w-full space-y-4">
                  {/* MERN Stack */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">MERN Stack</span>
                      <span className="text-xs text-gray-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: '90%' }}></div>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-400 flex-wrap">
                      <span className="px-2 py-1 bg-gray-700 rounded">MongoDB</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">Express</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">React</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">Node.js</span>
                    </div>
                  </div>

                  {/* DSA */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">Data Structures & Algorithms</span>
                      <span className="text-xs text-gray-400">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-400 flex-wrap">
                      <span className="px-2 py-1 bg-gray-700 rounded">Arrays</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">Trees</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">Graphs</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">DP</span>
                    </div>
                  </div>

                  {/* Python & AI */}
                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">Python & AI</span>
                      <span className="text-xs text-gray-400">88%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400" style={{ width: '88%' }}></div>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-400 flex-wrap">
                      <span className="px-2 py-1 bg-gray-700 rounded">ML</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">Agentic AI</span>
                      <span className="px-2 py-1 bg-gray-700 rounded">TensorFlow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-3 sm:px-10 sm:pt-5">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">My Approach</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  I believe in a structured approach for every challenge, from initial design to final analysis.
                </p>
              </div>
              <div className="flex flex-col gap-4 px-8 py-6 sm:px-10">
                {/* Architect */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">Architect</h3>
                    <p className="text-xs text-gray-400 mt-1">Designing robust, secure, and well-planned foundations.</p>
                  </div>
                </div>

                {/* Build & Scale */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">Build & Scale</h3>
                    <p className="text-xs text-gray-400 mt-1">Implementing efficient solutions that are ready for real-world growth.</p>
                  </div>
                </div>

                {/* Analyze & Iterate */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div className="flex-1 mb-4">
                    <h3 className="text-sm font-semibold text-white">Analyze & Iterate</h3>
                    <p className="text-xs text-gray-400 mt-1">Using data and feedback to measure, learn, and improve.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">My Journey</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  A look at my journey through academia and competitive coding.
                </p>
              </div>

              <div className="position relative left-10 mt-8">
                <CodeEditor />
              </div>

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>

    </div>
  )
}
