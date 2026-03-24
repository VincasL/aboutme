import React, { useRef } from 'react'
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Button,
  useColorModeValue,
  Icon,
  AspectRatio,
  Flex,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaExternalLinkAlt, FaCode, FaGraduationCap } from 'react-icons/fa'

const MotionBox = motion(Box)

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function TagChip({ label }) {
  const bg = useColorModeValue('purple.50', 'purple.900')
  const color = useColorModeValue('purple.700', 'purple.200')
  const border = useColorModeValue('purple.200', 'purple.700')

  return (
    <Tag
      size="sm"
      bg={bg}
      color={color}
      border="1px solid"
      borderColor={border}
      borderRadius="full"
      fontWeight="600"
      fontSize="xs"
    >
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}

function VideoPlaceholder() {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const iconColor = useColorModeValue('gray.400', 'gray.500')

  return (
    <Box
      bg={bg}
      borderRadius="xl"
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={2} color={iconColor}>
        <Icon as={FaCode} boxSize={10} />
        <Text fontSize="sm" fontWeight="500">Project Preview</Text>
      </VStack>
    </Box>
  )
}

function ProjectCard({ title, description, tags, videoUrl, githubUrl, demoUrl, badge, delay, isInView }) {
  const { t } = useTranslation()
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const titleColor = useColorModeValue('gray.800', 'gray.100')
  const descColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <MotionBox variants={cardVariants} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        h="full"
        display="flex"
        flexDirection="column"
        transition="all 0.3s ease"
        _hover={{
          borderColor: useColorModeValue('purple.200', 'purple.700'),
          boxShadow: '0 20px 60px rgba(128, 0, 255, 0.15)',
        }}
      >
        {/* Video/Image area */}
        <Box flexShrink={0}>
          {videoUrl ? (
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${videoUrl}?rel=0&modestbranding=1`}
                title={title}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ borderRadius: 0 }}
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={16 / 9}>
              <VideoPlaceholder />
            </AspectRatio>
          )}
        </Box>

        {/* Content */}
        <VStack align="flex-start" spacing={4} p={6} flex={1}>
          {badge && (
            <HStack spacing={1.5} bg={useColorModeValue('purple.50', 'purple.900')} px={3} py={1} borderRadius="full" border="1px solid" borderColor={useColorModeValue('purple.200', 'purple.700')}>
              <Icon as={FaGraduationCap} boxSize={3} color={useColorModeValue('purple.600', 'purple.300')} />
              <Text fontSize="xs" fontWeight="700" color={useColorModeValue('purple.600', 'purple.300')}>{badge}</Text>
            </HStack>
          )}
          <Heading as="h3" fontSize="xl" fontWeight="700" color={titleColor} lineHeight="1.3">
            {title}
          </Heading>

          <Text fontSize="sm" color={descColor} lineHeight="1.8" flex={1}>
            {description}
          </Text>

          {/* Tags */}
          <HStack spacing={2} flexWrap="wrap">
            {tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </HStack>

          {/* Buttons */}
          <HStack spacing={3} pt={2}>
            <Button
              as="a"
              href={githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              leftIcon={<FaGithub />}
              variant="outline"
              borderRadius="full"
              colorScheme="purple"
              fontWeight="600"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              {t('projects.view_code')}
            </Button>
            {demoUrl && (
              <Button
                as="a"
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                leftIcon={<FaExternalLinkAlt />}
                bgGradient="linear(to-r, purple.500, cyan.500)"
                color="white"
                borderRadius="full"
                fontWeight="600"
                _hover={{
                  bgGradient: 'linear(to-r, purple.600, cyan.600)',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                {t('projects.live_demo')}
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  )
}

function Projects() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sectionBg = useColorModeValue('white', 'gray.950')
  const bachelorTags = t('projects.bachelor_tags', { returnObjects: true })
  const project2Tags = t('projects.project2_tags', { returnObjects: true })

  const projects = [
    {
      title: t('projects.bachelor_title'),
      description: t('projects.bachelor_desc'),
      tags: Array.isArray(bachelorTags) ? bachelorTags : [],
      videoUrl: 'WDvBq-UmMFM',
      githubUrl: 'https://github.com/VincasL',
      demoUrl: null,
      badge: null,
    },
    {
      title: t('projects.project2_title'),
      description: t('projects.project2_desc'),
      tags: Array.isArray(project2Tags) ? project2Tags : [],
      videoUrl: null,
      githubUrl: 'https://github.com/VincasL',
      demoUrl: null,
    },
  ]

  return (
    <Box
      as="section"
      py={{ base: 20, md: 32 }}
      bg={sectionBg}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="10%"
        right="-8%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg={useColorModeValue('purple.50', 'purple.900')}
        opacity={0.5}
        filter="blur(80px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="10%"
        left="-8%"
        width="350px"
        height="350px"
        borderRadius="full"
        bg={useColorModeValue('cyan.50', 'cyan.900')}
        opacity={0.4}
        filter="blur(70px)"
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
          mb={14}
        >
          <VStack spacing={4} textAlign="center">
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="800"
              letterSpacing="-0.02em"
              bgGradient="linear(to-r, purple.400, cyan.400)"
              bgClip="text"
            >
              {t('projects.title')}
            </Heading>
            <Box
              h="4px"
              w="60px"
              bgGradient="linear(to-r, purple.500, cyan.400)"
              borderRadius="full"
              mx="auto"
            />
          </VStack>
        </MotionBox>

        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} maxW="900px" mx="auto">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                {...project}
                delay={i * 0.15}
                isInView={isInView}
              />
            ))}
          </SimpleGrid>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default Projects
