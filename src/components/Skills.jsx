import React from 'react'
import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'motion/react';

const Skills = () => {
  const techStacks = [
    {
      name: 'Next.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      bg: 'bg-black'
    },
    {
      name: 'React.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      bg: 'bg-blue-50'
    },
    {
      name: 'Python',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      bg: 'bg-yellow-50'
    },
    {
      name: 'Node.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      bg: 'bg-green-50'
    },
    {
      name: 'Express.js',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      bg: 'bg-gray-50'
    },
    {
      name: 'MongoDB',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      bg: 'bg-green-50'
    },
    {
      name: 'JavaScript',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      bg: 'bg-yellow-50'
    },
    {
      name: 'TypeScript',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      bg: 'bg-blue-50'
    }
  ];

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={ref} className='h-[125vh]'>
      <div className='bg-green-500 h-[28vh] sticky top-[72vh] w-full rounded-t-4xl overflow-hidden'>
        <div className='flex flex-col justify-center items-center h-full w-[100vw] px-8'>
          
          {/* Scroll Container */}
          <div className='w-[100vw] overflow-hidden'>
            <motion.div style={{x:x1}} className='flex mb-4'>
              {[...techStacks, ...techStacks].map((tech, index) => (
                <div
                  key={`row1-${index}`}
                  className={`flex-shrink-0 mx-3 p-3 ${tech.bg} rounded-lg shadow-lg flex flex-col items-center min-w-[100px]`}
                >
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className='w-8 h-8 mb-2'
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="4" fill="#e5e7eb"/>
                          <text x="16" y="20" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="10">${tech.name.slice(0,2)}</text>
                        </svg>
                      `)}`
                    }}
                  />
                  <span className='text-xs font-medium text-gray-800 text-center'>
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
            

            <motion.div style={{x:x2}}  className='flex'>
              {[...techStacks.slice().reverse(), ...techStacks.slice().reverse()].map((tech, index) => (
                <div
                  key={`row2-${index}`}
                  className={`flex-shrink-0 mx-3 p-3 ${tech.bg} rounded-lg shadow-lg flex flex-col items-center min-w-[100px]`}
                >
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className='w-8 h-8 mb-2'
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="32" rx="4" fill="#e5e7eb"/>
                          <text x="16" y="20" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="10">${tech.name.slice(0,2)}</text>
                        </svg>
                      `)}`
                    }}
                  />
                  <span className='text-xs font-medium text-gray-800 text-center'>
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
