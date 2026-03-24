import React from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaUser } from 'react-icons/fa'
import profilePhoto from '../assets/vincas-linkevicius.jpg'
import { useRef } from 'react'

const MotionBox = motion(Box)

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function SectionHeading({ title }) {
  const lineColor = useColorModeValue('purple.500', 'purple.400')

  return (
    <VStack spacing={3} align={{ base: 'center', md: 'flex-start' }}>
      <Heading
        as="h2"
        fontSize={{ base: '3xl', md: '4xl' }}
        fontWeight="800"
        letterSpacing="-0.02em"
        bgGradient="linear(to-r, purple.400, cyan.400)"
        bgClip="text"
      >
        {title}
      </Heading>
      <Box
        h="4px"
        w="60px"
        bgGradient="linear(to-r, purple.500, cyan.400)"
        borderRadius="full"
      />
    </VStack>
  )
}

function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const photoBg = useColorModeValue('gray.100', 'gray.800')
  const photoBorder = useColorModeValue('purple.200', 'purple.800')
  const iconColor = useColorModeValue('gray.400', 'gray.600')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const cardBg = useColorModeValue('white', 'gray.800')
  const sectionBg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box
      as="section"
      py={{ base: 20, md: 32 }}
      bg={sectionBg}
      position="relative"
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="10%"
        right="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg={useColorModeValue('purple.50', 'purple.900')}
        opacity={0.5}
        filter="blur(60px)"
        zIndex={0}
      />

      <Box
        maxW="1200px"
        mx="auto"
        px={{ base: 6, md: 12 }}
        position="relative"
        zIndex={1}
        ref={ref}
      >
        <MotionBox
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 12, md: 16 }}
            align="center"
          >
            {/* Photo */}
            <MotionBox
              flex="0 0 auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box position="relative">
                {/* Decorative ring */}
                <Box
                  position="absolute"
                  inset="-8px"
                  borderRadius="2xl"
                  bgGradient="linear(135deg, purple.400, cyan.400)"
                  opacity={0.6}
                  filter="blur(8px)"
                  zIndex={0}
                />
                <Box
                  as="img"
                  src={profilePhoto}
                  alt={t('about.photo_alt')}
                  w={{ base: '240px', md: '360px' }}
                  borderRadius="2xl"
                  border="3px solid"
                  borderColor={photoBorder}
                  objectFit="cover"
                  position="relative"
                  zIndex={1}
                  boxShadow="0 20px 60px rgba(128, 0, 255, 0.2)"
                />
              </Box>
            </MotionBox>

            {/* Bio */}
            <MotionBox
              flex={1}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <VStack align={{ base: 'center', md: 'flex-start' }} spacing={6} textAlign={{ base: 'center', md: 'left' }}>
                <SectionHeading title={t('about.title')} />

                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color={textColor}
                  lineHeight="1.8"
                >
                  {t('about.bio')}
                </Text>

              </VStack>
            </MotionBox>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default About
