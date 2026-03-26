import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Heading,
  Button,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { useTranslation } from 'react-i18next'
import { FaDownload, FaArrowDown } from 'react-icons/fa'

const MotionBox = motion(Box)

function Hero() {
  const { t } = useTranslation()
  const [taglineIndex, setTaglineIndex] = useState(0)
  const taglines = t('hero.taglines', { returnObjects: true })

  const subtitleColor = useColorModeValue('purple.600', 'purple.300')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [taglines.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      {/* Animated background */}
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        bgGradient={useColorModeValue(
          'linear(135deg, purple.50 0%, white 40%, cyan.50 100%)',
          'linear(135deg, #0a0015 0%, #0d0d1a 40%, #001a1a 100%)'
        )}
      />

      {/* Decorative blobs */}
      <MotionBox
        position="absolute"
        top="-20%"
        right="-10%"
        width="600px"
        height="600px"
        borderRadius="full"
        bg={useColorModeValue('purple.100', 'purple.900')}
        opacity={useColorModeValue(0.4, 0.15)}
        filter="blur(80px)"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        zIndex={0}
      />
      <MotionBox
        position="absolute"
        bottom="-20%"
        left="-10%"
        width="500px"
        height="500px"
        borderRadius="full"
        bg={useColorModeValue('cyan.100', 'cyan.900')}
        opacity={useColorModeValue(0.4, 0.15)}
        filter="blur(80px)"
        animate={{
          scale: [1, 1.15, 1],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        zIndex={0}
      />
      <MotionBox
        position="absolute"
        top="30%"
        left="20%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg={useColorModeValue('pink.100', 'pink.900')}
        opacity={useColorModeValue(0.3, 0.1)}
        filter="blur(60px)"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -15, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        zIndex={0}
      />

      {/* Content */}
      <Box position="relative" zIndex={1} w="full" maxW="1200px" mx="auto" px={{ base: 6, md: 12 }}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={6} textAlign={{ base: 'center', md: 'left' }}>

            {/* Greeting */}
            <MotionBox variants={itemVariants}>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={mutedColor}
                fontWeight="500"
                letterSpacing="wider"
              >
                {t('hero.greeting')}
              </Text>
            </MotionBox>

            {/* Name */}
            <MotionBox variants={itemVariants}>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', sm: '5xl', md: '7xl', lg: '8xl' }}
                fontWeight="900"
                lineHeight="1"
                letterSpacing="-0.03em"
                bgGradient="linear(to-r, purple.400, pink.400, cyan.400)"
                bgClip="text"
                pb={2}
              >
                {t('hero.name')}
              </Heading>
            </MotionBox>

            {/* Title */}
            <MotionBox variants={itemVariants}>
              <Text
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="600"
                color={subtitleColor}
              >
                {t('hero.title')}
              </Text>
            </MotionBox>

            {/* Animated tagline */}
            <MotionBox variants={itemVariants} h="40px" display="flex" alignItems="center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color={mutedColor}
                    fontStyle="italic"
                    fontWeight="400"
                  >
                    — {Array.isArray(taglines) ? taglines[taglineIndex] : ''}
                  </Text>
                </motion.div>
              </AnimatePresence>
            </MotionBox>

            {/* CTA Buttons */}
            <MotionBox variants={itemVariants}>
              <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
                <ScrollLink to="projects" smooth={true} offset={-80} duration={700}>
                  <Button
                    size="lg"
                    bgGradient="linear(to-r, purple.500, cyan.500)"
                    color="white"
                    px={8}
                    borderRadius="full"
                    fontWeight="600"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, cyan.600)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 15px 35px rgba(128, 0, 255, 0.4)',
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.3s ease"
                    rightIcon={<FaArrowDown />}
                  >
                    {t('hero.cta_work')}
                  </Button>
                </ScrollLink>

                <Button
                  as="a"
                  href={`${import.meta.env.BASE_URL}cv.html`}
                  target="_blank"
                  size="lg"
                  variant="outline"
                  px={8}
                  borderRadius="full"
                  fontWeight="600"
                  borderColor={useColorModeValue('purple.400', 'purple.400')}
                  color={useColorModeValue('purple.600', 'purple.300')}
                  _hover={{
                    bg: useColorModeValue('purple.50', 'purple.900'),
                    transform: 'translateY(-3px)',
                    boxShadow: '0 10px 25px rgba(128, 0, 255, 0.2)',
                    borderColor: 'purple.500',
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.3s ease"
                  leftIcon={<FaDownload />}
                >
                  {t('hero.cta_cv')}
                </Button>
              </HStack>
            </MotionBox>

          </VStack>
        </MotionBox>
      </Box>

      {/* Scroll indicator */}
      <MotionBox
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        zIndex={1}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ScrollLink to="about" smooth={true} offset={-80} duration={500} style={{ cursor: 'pointer' }}>
          <Box
            w={8}
            h={12}
            borderRadius="full"
            border="2px solid"
            borderColor={useColorModeValue('purple.300', 'purple.600')}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            pt={2}
          >
            <Box
              w={1.5}
              h={3}
              borderRadius="full"
              bg={useColorModeValue('purple.400', 'purple.400')}
              as={motion.div}
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Box>
        </ScrollLink>
      </MotionBox>
    </Box>
  )
}

export default Hero
