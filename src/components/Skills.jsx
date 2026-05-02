import React from 'react'
import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'motion/react';

const Skills = () => {
  const techStacks = [
    {
      name: 'Next.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'React.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'Python',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'Node.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'Express.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'MongoDB',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'JavaScript',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'TypeScript',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'Supabase',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/supabase.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'Pinecone',
      image: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/pinecone-icon-ye23mxqezdqo34qhde01eg.png/pinecone-icon-gw5gzfji55rizxc6hfnhpa.png?_a=DATAiZAAZAA0',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'Tailwind CSS',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/tailwindcss.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'GSAP',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/greensock.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'Framer Motion',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/framer.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'Git',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      bg: 'bg-zinc-800',
      imgClass: ''
    },
    {
      name: 'GitHub',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'Postman',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/postman.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'LangChain',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/langchain.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    },
    {
      name: 'OpenAI API',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@13.0.0/icons/openai.svg',
      bg: 'bg-zinc-800',
      imgClass: 'invert opacity-90'
    }
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);

  return (
    <div ref={ref} className='h-[100vh] sm:h-[150vh]'>
      <div className='bg-zinc-900 h-auto sm:h-[30vh] xl:h-[30vh] sticky top-[10vh] sm:top-[69vh] xl:top-[69vh] w-full overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] py-8 sm:py-0'>
        <div className='flex flex-col justify-center items-center h-full w-full'>

          {/* Mobile Grid Layout */}
          <div className='sm:hidden w-full px-4 grid grid-cols-3 gap-4'>
            {techStacks.map((tech, index) => (
              <div
                key={`mob-${index}`}
                className={`p-3 ${tech.bg} rounded-lg shadow-lg flex flex-col items-center justify-center border border-white/5`}
              >
                <img src={tech.image} alt={tech.name} className={`w-8 h-8 mb-2 ${tech.imgClass || ''}`} />
                <span className='text-xs font-medium text-zinc-300 text-center'>{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Desktop Scroll Container */}
          <div className='hidden sm:flex flex-col gap-3 xl:gap-3 py-4 xl:py-4 w-full h-full overflow-hidden'>
            <motion.div style={{ x: x1 }} className='flex w-max flex-1 items-stretch'>
              {[...techStacks, ...techStacks, ...techStacks, ...techStacks, ...techStacks, ...techStacks, ...techStacks, ...techStacks].map((tech, index) => (
                <div
                  key={`row1-${index}`}
                  className={`flex-shrink-0 mx-2 p-3 xl:p-2 ${tech.bg} rounded-2xl xl:rounded-xl shadow-lg flex flex-col items-center justify-center min-w-[140px] xl:min-w-[130px] border border-white/5`}
                >
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className={`w-10 h-14 mb-2 xl:mb-1 ${tech.imgClass || ''}`}
                  />
                  <span className='text-sm xl:text-xs font-bold text-zinc-300 text-center'>
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>


            <motion.div style={{ x: x2 }} className='flex w-max flex-1 items-stretch'>
              {[...techStacks.slice().reverse(), ...techStacks.slice().reverse(), ...techStacks.slice().reverse(), ...techStacks.slice().reverse(), ...techStacks.slice().reverse(), ...techStacks.slice().reverse(), ...techStacks.slice().reverse(), ...techStacks.slice().reverse()].map((tech, index) => (
                <div
                  key={`row2-${index}`}
                  className={`flex-shrink-0 mx-2 p-3 xl:p-2 ${tech.bg} rounded-2xl xl:rounded-xl shadow-lg flex flex-col items-center justify-center min-w-[140px] xl:min-w-[130px] border border-white/5`}
                >
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className={`w-10 h-14 mb-2 xl:mb-1 ${tech.imgClass || ''}`}
                  />
                  <span className='text-sm xl:text-xs font-bold text-zinc-300 text-center'>
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
