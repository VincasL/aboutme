import React, { useRef } from 'react'
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Heading,
  VStack,
  HStack,
  Tag,
  TagLabel,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaBuilding } from 'react-icons/fa'

const MotionBox = motion(Box)

const panelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function TagChip({ label }) {
  const bg = useColorModeValue('purple.50', 'purple.900')
  const color = useColorModeValue('purple.700', 'purple.200')
  const border = useColorModeValue('purple.200', 'purple.700')

  return (
    <Tag size="sm" bg={bg} color={color} border="1px solid" borderColor={border} borderRadius="full" fontWeight="600" fontSize="xs">
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}

function TimelineCard({ icon, title, company, period, description, tags = [], delay = 0, isInView }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const titleColor = useColorModeValue('gray.800', 'gray.100')
  const companyColor = useColorModeValue('purple.600', 'purple.300')
  const periodColor = useColorModeValue('gray.500', 'gray.400')
  const descColor = useColorModeValue('gray.600', 'gray.300')
  const dotColor = useColorModeValue('purple.500', 'purple.400')
  const lineColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <MotionBox
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay }}
    >
      <Box position="relative" pl={10} pb={8}>
        {/* Timeline line */}
        <Box
          position="absolute"
          left="14px"
          top="32px"
          bottom={0}
          width="2px"
          bg={lineColor}
          zIndex={0}
        />

        {/* Timeline dot */}
        <Box
          position="absolute"
          left={0}
          top={2}
          w={8}
          h={8}
          borderRadius="full"
          bgGradient="linear(to-br, purple.500, cyan.400)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          boxShadow="0 0 0 4px"
          boxShadowColor={useColorModeValue('purple.100', 'purple.900')}
        >
          <Icon as={icon} color="white" boxSize={3.5} />
        </Box>

        {/* Card */}
        <Box
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          p={6}
          transition="all 0.3s ease"
          _hover={{
            borderColor: useColorModeValue('purple.200', 'purple.700'),
            transform: 'translateX(4px)',
            boxShadow: '0 10px 30px rgba(128, 0, 255, 0.1)',
          }}
        >
          <VStack align="flex-start" spacing={3}>
            <Heading as="h3" fontSize="xl" fontWeight="700" color={titleColor}>
              {title}
            </Heading>

            <HStack spacing={4} flexWrap="wrap">
              <HStack spacing={1.5}>
                <Icon as={FaBuilding} color={companyColor} boxSize={3.5} />
                <Text fontSize="sm" fontWeight="600" color={companyColor}>
                  {company}
                </Text>
              </HStack>
              <HStack spacing={1.5}>
                <Icon as={FaCalendarAlt} color={periodColor} boxSize={3.5} />
                <Text fontSize="sm" color={periodColor}>
                  {period}
                </Text>
              </HStack>
            </HStack>

            <Text fontSize="sm" color={descColor} lineHeight="1.8">
              {description}
            </Text>
            {tags.length > 0 && (
              <HStack spacing={2} flexWrap="wrap">
                {tags.map((tag) => <TagChip key={tag} label={tag} />)}
              </HStack>
            )}
          </VStack>
        </Box>
      </Box>
    </MotionBox>
  )
}

function Experience() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sectionBg = useColorModeValue('gray.50', 'gray.900')
  const tabBg = useColorModeValue('gray.100', 'gray.800')
  const activeTabBg = useColorModeValue('white', 'gray.700')
  const tabColor = useColorModeValue('gray.600', 'gray.400')
  const activeTabColor = useColorModeValue('purple.600', 'purple.300')

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
        top="20%"
        right="-5%"
        width="350px"
        height="350px"
        borderRadius="full"
        bg={useColorModeValue('purple.50', 'purple.900')}
        opacity={0.5}
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
        {/* Section heading */}
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
              {t('experience.title')}
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

        {/* Tabs */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Tabs variant="unstyled" colorScheme="purple">
            <TabList
              bg={tabBg}
              borderRadius="full"
              p={1.5}
              mb={10}
              w="fit-content"
              mx="auto"
            >
              <Tab
                borderRadius="full"
                px={6}
                py={2.5}
                fontSize="sm"
                fontWeight="600"
                color={tabColor}
                _selected={{
                  bg: activeTabBg,
                  color: activeTabColor,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                transition="all 0.2s ease"
              >
                <HStack spacing={2}>
                  <Icon as={FaBriefcase} boxSize={3.5} />
                  <span>{t('experience.professional')}</span>
                </HStack>
              </Tab>
              <Tab
                borderRadius="full"
                px={6}
                py={2.5}
                fontSize="sm"
                fontWeight="600"
                color={tabColor}
                _selected={{
                  bg: activeTabBg,
                  color: activeTabColor,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
                transition="all 0.2s ease"
              >
                <HStack spacing={2}>
                  <Icon as={FaGraduationCap} boxSize={3.5} />
                  <span>{t('experience.university')}</span>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <MotionBox
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <VStack spacing={0} align="stretch">
                    <TimelineCard
                      icon={FaBriefcase}
                      title={t('experience.role1_title')}
                      company={t('experience.role1_company')}
                      period={t('experience.role1_period')}
                      description={t('experience.role1_desc')}
                      tags={['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Kafka', 'Terraform', 'Datadog']}
                      delay={0.1}
                      isInView={isInView}
                    />
                    <TimelineCard
                      icon={FaBriefcase}
                      title={t('experience.role2_title')}
                      company={t('experience.role2_company')}
                      period={t('experience.role2_period')}
                      description={t('experience.role2_desc')}
                      tags={['.NET', 'Angular', 'React', 'TypeScript', 'Accessibility']}
                      delay={0.2}
                      isInView={isInView}
                    />
                  </VStack>
                </MotionBox>
              </TabPanel>

              <TabPanel px={0}>
                <MotionBox
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TimelineCard
                    icon={FaGraduationCap}
                    title={t('experience.edu_degree')}
                    company={t('experience.edu_school')}
                    period={t('experience.edu_period')}
                    description={t('experience.edu_desc')}
                    tags={['.NET', 'Node.js', 'React', 'Angular', 'React Native', 'Flutter', 'Python', 'MySQL']}
                    delay={0.1}
                    isInView={isInView}
                  />
                </MotionBox>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default Experience
