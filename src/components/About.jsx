import React from 'react'
import { motion } from 'framer-motion'
import AboutContent from './AboutContent'
import { useSectionTransition } from '../context/TransitionContext'

const About = () => {
  const { transitionState } = useSectionTransition();
  const isVisible = transitionState === 'idle' || transitionState === 'entering';

  return (
    <div id="about" className='bg-[#0B0F19] relative w-full'>
      <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
          }}
      >
        <AboutContent />
      </motion.div>
    </div>
  )
}

export default About