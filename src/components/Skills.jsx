import React, { useRef } from 'react'
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  SiDotnet,
  SiAngular,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiDocker,
  SiFlutter,
  SiKubernetes,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { TbBrandReactNative } from 'react-icons/tb'

const MotionBox = motion(Box)

const skills = [
  { icon: SiReact,      name: 'React',      color: '#61DAFB' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiNodedotjs,  name: 'Node.js',    color: '#339933' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { icon: TbBrandReactNative, name: 'React Native', color: '#61DAFB' },
  { icon: SiFlutter,    name: 'Flutter',    color: '#02569B' },
  { icon: SiDotnet,     name: '.NET',       color: '#512BD4' },
  { icon: SiAngular,    name: 'Angular',    color: '#DD0031' },
  { icon: FaAws,        name: 'AWS',        color: '#FF9900' },
  { icon: SiDocker,     name: 'Docker',     color: '#2496ED' },
  { icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function SkillCard({ skill }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBorder = useColorModeValue('purple.300', 'purple.600')
  const nameColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <MotionBox
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        p={4}
        textAlign="center"
        cursor="pointer"
        position="relative"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          borderColor: hoverBorder,
          boxShadow: `0 12px 30px ${skill.color}22`,
        }}
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(to right, ${skill.color}, ${skill.color}88)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
      >
        <VStack spacing={2}>
          <Box
            p={2}
            borderRadius="lg"
            bg={`${skill.color}18`}
            color={skill.color}
          >
            <Icon as={skill.icon} boxSize={6} />
          </Box>
          <Text fontSize="sm" fontWeight="700" color={nameColor}>
            {skill.name}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  )
}

function Skills() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sectionBg = useColorModeValue('white', 'gray.950')
  const subtitleColor = useColorModeValue('gray.500', 'gray.400')

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
        bottom="-10%"
        left="-5%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg={useColorModeValue('cyan.50', 'cyan.900')}
        opacity={0.4}
        filter="blur(80px)"
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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
        >
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="800"
              letterSpacing="-0.02em"
              bgGradient="linear(to-r, purple.400, cyan.400)"
              bgClip="text"
            >
              {t('skills.title')}
            </Heading>
            <Box
              h="4px"
              w="60px"
              bgGradient="linear(to-r, purple.500, cyan.400)"
              borderRadius="full"
              mx="auto"
            />
            <Text fontSize="lg" color={subtitleColor} maxW="500px">
              {t('skills.subtitle')}
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={6}>
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </SimpleGrid>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default Skills
