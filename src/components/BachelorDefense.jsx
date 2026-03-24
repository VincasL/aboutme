import React, { useRef } from 'react'
import {
  Box,
  Text,
  Heading,
  VStack,
  useColorModeValue,
  Icon,
  AspectRatio,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaPlay, FaGraduationCap } from 'react-icons/fa'

const MotionBox = motion(Box)

function BachelorDefense() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sectionBg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const placeholderBg = useColorModeValue('gray.100', 'gray.700')
  const iconColor = useColorModeValue('gray.400', 'gray.500')
  const subtitleColor = useColorModeValue('purple.600', 'purple.300')
  const descColor = useColorModeValue('gray.600', 'gray.300')

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <Box
      as="section"
      py={{ base: 20, md: 32 }}
      bg={sectionBg}
      position="relative"
      overflow="hidden"
    >
      {/* Background decorations */}
      <Box
        position="absolute"
        top="5%"
        left="10%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg={useColorModeValue('purple.50', 'purple.900')}
        opacity={0.6}
        filter="blur(60px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="5%"
        right="10%"
        width="250px"
        height="250px"
        borderRadius="full"
        bg={useColorModeValue('cyan.50', 'cyan.900')}
        opacity={0.5}
        filter="blur(50px)"
        zIndex={0}
      />

      <Box
        maxW="900px"
        mx="auto"
        px={{ base: 6, md: 12 }}
        position="relative"
        zIndex={1}
        ref={ref}
      >
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <VStack spacing={10} textAlign="center">
            {/* Header */}
            <VStack spacing={4}>
              <Box
                p={3}
                borderRadius="xl"
                bgGradient="linear(to-br, purple.500, cyan.400)"
                display="inline-flex"
              >
                <Icon as={FaGraduationCap} color="white" boxSize={7} />
              </Box>

              <Heading
                as="h2"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="800"
                letterSpacing="-0.02em"
                bgGradient="linear(to-r, purple.400, cyan.400)"
                bgClip="text"
              >
                {t('defense.title')}
              </Heading>

              <Box
                h="4px"
                w="60px"
                bgGradient="linear(to-r, purple.500, cyan.400)"
                borderRadius="full"
                mx="auto"
              />

              <Text fontSize="xl" fontWeight="600" color={subtitleColor}>
                {t('defense.subtitle')}
              </Text>
            </VStack>

            {/* Video placeholder */}
            <MotionBox
              w="full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Box
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 20px 60px rgba(128, 0, 255, 0.1)"
              >
                <AspectRatio ratio={16 / 9}>
                  <Box
                    bg={placeholderBg}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VStack spacing={4} color={iconColor}>
                      <MotionBox
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Box
                          w={20}
                          h={20}
                          borderRadius="full"
                          bg={useColorModeValue('purple.100', 'purple.900')}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          border="2px solid"
                          borderColor={useColorModeValue('purple.300', 'purple.600')}
                        >
                          <Icon
                            as={FaPlay}
                            boxSize={7}
                            color={useColorModeValue('purple.500', 'purple.300')}
                            ml={1}
                          />
                        </Box>
                      </MotionBox>
                      <Text
                        fontSize="lg"
                        fontWeight="600"
                        color={useColorModeValue('gray.600', 'gray.300')}
                      >
                        {t('defense.coming_soon')}
                      </Text>
                    </VStack>
                  </Box>
                </AspectRatio>
              </Box>
            </MotionBox>

            {/* Description */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              maxW="700px"
            >
              <Text fontSize={{ base: 'md', md: 'lg' }} color={descColor} lineHeight="1.9">
                {t('defense.desc')}
              </Text>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default BachelorDefense
