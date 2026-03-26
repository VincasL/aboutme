import React from 'react'
import { Box } from '@chakra-ui/react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function App() {
  return (
    <MotionConfig reducedMotion={isMobile ? 'always' : 'never'}>
    <Box>
      <ScrollProgress />
      <Navbar />
      <Box as="main">
        <Box id="home">
          <Hero />
        </Box>
        <Box id="about">
          <About />
        </Box>
        <Box id="skills">
          <Skills />
        </Box>
        <Box id="experience">
          <Experience />
        </Box>
        <Box id="projects">
          <Projects />
        </Box>
        <Box id="contact">
          <Contact />
        </Box>
      </Box>
      <BackToTop />
    </Box>
    </MotionConfig>
  )
}

export default App
