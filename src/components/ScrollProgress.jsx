import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="3px"
      zIndex={9999}
      bg="transparent"
    >
      <Box
        height="100%"
        width={`${progress}%`}
        bgGradient="linear(to-r, purple.500, cyan.400)"
        transition="width 0.1s linear"
        borderRadius="full"
      />
    </Box>
  )
}

export default ScrollProgress
