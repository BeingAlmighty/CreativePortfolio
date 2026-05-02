import { useState, useEffect, useRef } from "react";
import SplitText from "./Loader.jsx";
import CodeEditor from "./CodeEditor.jsx";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const TechFocus = () => {
  const data = [
    { cat: 'Full Stack', tech: ['Node.js', 'Express', 'PostgreSQL', 'Next.js'] },
    { cat: 'AI Systems', tech: ['LangChain', 'Python', 'TensorFlow', 'Pinecone'] },
    { cat: 'Frontend', tech: ['React', 'Framer', 'GSAP', 'Tailwind'] }
  ];

  return (
    <div className="flex flex-col justify-center h-full gap-0 sm:gap-1 px-6 sm:px-8 py-2 group/list">
      {data.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          className="group/row relative flex flex-col items-start gap-1.5 px-4 py-2.5 -mx-4 rounded-xl cursor-default transition-all duration-300 opacity-100 group-hover/list:opacity-30 hover:!opacity-100 hover:bg-white/[0.04]"
        >
          {/* Crisp Structural Marker */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-zinc-200 scale-y-0 origin-top transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:scale-y-100 rounded-full"></div>

          <span className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase transition-all duration-300 group-hover/row:text-zinc-200 group-hover/row:translate-x-1">
            {row.cat}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {row.tech.map((t, index) => (
              <div
                key={index}
                className="px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-[11px] font-mono tracking-tight text-zinc-400 transition-all duration-300 group-hover/row:bg-white/10 group-hover/row:border-white/20 group-hover/row:text-white group-hover/row:-translate-y-[2px] group-hover/row:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const HowIBuild = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"]
  });

  const steps = [
    { num: '01', title: 'Problem First' },
    { num: '02', title: 'System Design' },
    { num: '03', title: 'Rapid Build' },
    { num: '04', title: 'Performance & UX' }
  ];

  return (
    <div ref={containerRef} className="relative flex flex-col justify-between gap-6 px-6 sm:px-8 py-4 h-full min-h-[250px]">
      {/* Background Track */}
      <div className="absolute left-[2.75rem] sm:left-[3.25rem] top-8 bottom-8 w-[2px] bg-white/5 rounded-full"></div>

      {/* Animated Scroll Highlight Line */}
      <motion.div
        className="absolute left-[2.75rem] sm:left-[3.25rem] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#3B82F6] to-[#06B6D4] origin-top rounded-full shadow-[0_0_10px_#3B82F6]"
        style={{ scaleY: scrollYProgress }}
      />

      {steps.map((step, i) => {
        const start = i * 0.25;
        const end = (i + 1) * 0.25;

        const opacity = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], [0.3, 1, 1, 0.3]);
        const textShadow = useTransform(scrollYProgress, [start, start + 0.1], ["0px 0px 0px transparent", "0px 0px 12px rgba(6,182,212,0.5)"]);
        const color = useTransform(scrollYProgress, [start, start + 0.1], ["#71717A", "#FFFFFF"]);

        return (
          <motion.div key={i} style={{ opacity }} className="relative flex items-center gap-6 group">
            <span className="text-4xl font-bold text-white/5 font-mono select-none w-10 text-right tracking-tighter">
              {step.num}
            </span>
            <div className="z-10 flex-1">
              <motion.h4 style={{ textShadow, color }} className="text-[13px] font-bold uppercase tracking-wider">
                {step.title}
              </motion.h4>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function AboutContent() {

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
      const response = await fetch('https://leetcode-api-faisalshohag.vercel.app/AlmightyBeing');
      if (!response.ok) throw new Error('Primary API failed');
      const data = await response.json();

      setLeetcode(prev => ({
        ...prev,
        totalSolved: data.totalSolved, Easy: data.easySolved, Medium: data.mediumSolved, Hard: data.hardSolved,
        totalQuestions: data.totalQuestions, totalEasy: data.totalEasy, totalMedium: data.totalMedium, totalHard: data.totalHard,
      }));
    } catch (error) {
      console.warn('Primary API failed, switching to fallback:', error.message);
      try {
        const fallbackResponse = await fetch('https://alfa-leetcode-api.onrender.com/AlmightyBeing/solved');
        if (!fallbackResponse.ok) throw new Error('Fallback API failed too');
        const fallbackData = await fallbackResponse.json();

        setLeetcode(prev => ({
          ...prev,
          totalSolved: fallbackData.solvedProblem || fallbackData.totalSolved, Easy: fallbackData.easySolved, Medium: fallbackData.mediumSolved, Hard: fallbackData.hardSolved,
          totalQuestions: fallbackData.totalQuestions, totalEasy: fallbackData.totalEasy, totalMedium: fallbackData.totalMedium, totalHard: fallbackData.totalHard,
        }));
      } catch (fallbackError) {
        console.error('Both APIs failed:', fallbackError.message);
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    leetcodeData();
  }, []);

  const MiniCard = ({ title, solved, total, colorCode }) => {
    return (
      <div className="bg-[#132338] rounded-md p-2 sm:p-3 w-35 flex flex-col items-center justify-center border border-white/5 shadow-none">
        <div style={{ color: colorCode }} className="font-medium text-sm">{title}</div>
        <div className="text-zinc-300 text-sm font-semibold mt-1 flex items-baseline gap-0.5">
          {solved}<span className="text-zinc-600 text-xs font-normal">/{total}</span>
        </div>
      </div>
    );
  }

  const arcStart = 225;

  // Refined Leetcode official colors
  const colorEasy = "#00b8a3"; // Teal
  const bgEasy = "#00b8a333";
  const colorMed = "#ffc01e";  // Yellow
  const bgMed = "#ffc01e33";
  const colorHard = "#ef4743"; // Red
  const bgHard = "#ef474333";

  const fillEasy = leetcode.totalEasy > 0 ? (leetcode.Easy / leetcode.totalEasy) * 24 : 0;
  const fillMed = leetcode.totalMedium > 0 ? (leetcode.Medium / leetcode.totalMedium) * 24 : 0;
  const fillHard = leetcode.totalHard > 0 ? (leetcode.Hard / leetcode.totalHard) * 24 : 0;

  const conicGradientStyle = {
    backgroundImage: `conic-gradient(
      from ${arcStart}deg,
      ${colorEasy} 0% ${fillEasy}%,
      ${bgEasy} ${fillEasy}% 24%,
      #00000000 24% 25.5%,
      ${colorMed} 25.5% ${25.5 + fillMed}%,
      ${bgMed} ${25.5 + fillMed}% 49.5%,
      #00000000 49.5% 51%,
      ${colorHard} 51% ${51 + fillHard}%,
      ${bgHard} ${51 + fillHard}% 75%,
      #00000000 75% 100%
    )`,
  };

  return (
    <div className="bg-[#0B0F19] sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-[#3B82F6]"> <span className="bg-[#111827] border border-white/5 py-2 px-6 rounded-3xl shadow-lg">India</span></h2>
        <p className="mx-auto mt-6 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-zinc-100 sm:text-5xl">
          That's all About me
        </p>
        <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">

          {/* LeetCode Card (Left, Spans 2 Rows) */}
          <div className="relative lg:row-span-2 group">
            <div className="absolute inset-px rounded-lg bg-[#111827] lg:rounded-l-4xl border border-white/5 transition-colors duration-500 group-hover:border-white/10" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Problem Solving</p>
                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                  Data structures, algorithms, and logical foundations.
                </p>
              </div>
              <div className="flex flex-col mt-6 items-center gap-5 relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">

                {loader ? <SplitText
                  text="Loading..."
                  className="text-2xl font-semibold text-center text-zinc-500 my-[14vh]"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                /> : (
                  <>
                    <div className="w-48 h-48 sm:w-60 sm:h-60 relative justify-center items-center mt-5 flex flex-col rounded-full">
                      <div
                        className="w-full h-full rounded-full transition-all duration-1000 ease-in-out opacity-80"
                        style={conicGradientStyle}
                      ></div>
                      <div className="absolute inset-2 sm:inset-3 bg-[#111827] rounded-full shadow-inner flex flex-col justify-center items-center">
                        <div className="flex items-baseline gap-1 mt-1 sm:mt-2">
                          <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">{leetcode.totalSolved}</span>
                          <span className="text-zinc-400 text-sm sm:text-base font-medium">/{leetcode.totalQuestions}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 sm:mt-2">
                          <svg className="w-4 h-4 text-[#00b8a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm sm:text-base text-zinc-300 font-medium">Solved</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 mt-5 w-full">
                      <div className="flex justify-center items-center gap-4 sm:gap-6">
                        <MiniCard title="Easy" solved={leetcode.Easy} total={leetcode.totalEasy} colorCode={colorEasy} />
                        <MiniCard title="Med." solved={leetcode.Medium} total={leetcode.totalMedium} colorCode={colorMed} />
                      </div>
                      <MiniCard title="Hard" solved={leetcode.Hard} total={leetcode.totalHard} colorCode={colorHard} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/5 lg:rounded-l-4xl" />
          </div>

          {/* Tech Focus (Middle Top) */}
          <div className="relative max-lg:row-start-1 group">
            <div className="absolute inset-px rounded-lg bg-[#111827] border border-white/5 max-lg:rounded-t-4xl transition-colors duration-500 group-hover:border-white/10" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="text-lg font-medium tracking-tight text-white max-lg:text-center">Tech Focus</p>
                <p className="my-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                  Systems, engineering, and architecture.
                </p>
              </div>
              <div className="flex flex-1 flex-col justify-start pb-4 sm:pb-6">
                <TechFocus />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/5 max-lg:rounded-t-4xl" />
          </div>

          {/* How I Build (Middle Bottom) */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 group">
            <div className="absolute inset-px rounded-lg bg-[#111827] border border-white/5 transition-colors duration-500 group-hover:border-white/10" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <p className="text-lg font-medium tracking-tight text-white max-lg:text-center">How I Build</p>
                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                  Process over tools. Logic over luck.
                </p>
              </div>
              <div className="flex-1 pb-4 sm:pb-6">
                <HowIBuild />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/5" />
          </div>

          {/* My Journey (Right, Spans 2 Rows) */}
          <div className="relative lg:row-span-2 group">
            <div className="absolute inset-px rounded-lg bg-[#111827] border border-white/5 max-lg:rounded-b-4xl lg:rounded-r-4xl transition-colors duration-500 group-hover:border-white/10" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">My Journey</p>
                <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                  A look at my timeline through academia and coding.
                </p>
              </div>

              <div className="relative -mx-4 sm:mx-0 sm:left-5 md:left-10 mt-8 w-[calc(100%+2rem)] sm:w-auto overflow-hidden sm:overflow-visible">
                <div className="scale-90 sm:scale-100 origin-left">
                  <CodeEditor />
                </div>
              </div>

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>

    </div>
  )
}
