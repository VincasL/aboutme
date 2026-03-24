import React, { useEffect, useState } from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

const MotionBox = motion.div

function BackToTop() {
  const [visible, setVisible] = useState(false)

  const bg = useColorModeValue('purple.500', 'purple.400')
  const hoverBg = useColorModeValue('purple.600', 'purple.500')

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
          }}
        >
          <IconButton
            aria-label="Back to top"
            icon={<FaArrowUp />}
            onClick={scrollToTop}
            borderRadius="full"
            size="lg"
            bg={bg}
            color="white"
            _hover={{
              bg: hoverBg,
              transform: 'translateY(-3px)',
              boxShadow: '0 10px 25px rgba(128, 0, 255, 0.4)',
            }}
            boxShadow="0 4px 15px rgba(128, 0, 255, 0.3)"
            transition="all 0.3s ease"
          />
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
