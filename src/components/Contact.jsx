import React, { useRef } from 'react'
import {
  Box,
  Text,
  Heading,
  VStack,
  useColorModeValue,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const MotionBox = motion(Box)

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function ContactButton({ icon, label, href, gradient, hoverShadow }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const labelColor = useColorModeValue('gray.700', 'gray.200')

  return (
    <MotionBox variants={buttonVariants} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
      <Box
        as="a"
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        display="block"
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        p={8}
        textAlign="center"
        cursor="pointer"
        transition="all 0.3s ease"
        _hover={{
          borderColor: 'transparent',
          boxShadow: hoverShadow,
          textDecoration: 'none',
        }}
        sx={{
          '&:hover .icon-box': {
            background: gradient,
          },
        }}
      >
        <VStack spacing={4}>
          <Box
            className="icon-box"
            w={16}
            h={16}
            borderRadius="2xl"
            bgGradient={gradient}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.3s ease"
            boxShadow="0 8px 20px rgba(0,0,0,0.15)"
          >
            <Icon as={icon} boxSize={7} color="white" />
          </Box>
          <Text fontSize="lg" fontWeight="700" color={labelColor}>
            {label}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  )
}

function Contact() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sectionBg = useColorModeValue('white', 'gray.950')
  const subtitleColor = useColorModeValue('gray.500', 'gray.400')

  const contacts = [
    {
      icon: FaLinkedin,
      label: t('contact.linkedin'),
      href: 'https://www.linkedin.com/in/vincas-linkevi%C4%8Dius-02ba7a220/',
      gradient: 'linear(to-br, blue.500, blue.700)',
      hoverShadow: '0 20px 50px rgba(0, 119, 181, 0.4)',
    },
    {
      icon: FaEnvelope,
      label: t('contact.email'),
      href: 'mailto:vincas.linkevicius@gmail.com',
      gradient: 'linear(to-br, purple.500, cyan.400)',
      hoverShadow: '0 20px 50px rgba(128, 0, 255, 0.3)',
    },
    {
      icon: FaGithub,
      label: t('contact.github'),
      href: 'https://github.com/VincasL',
      gradient: 'linear(to-br, gray.600, gray.800)',
      hoverShadow: '0 20px 50px rgba(0,0,0,0.3)',
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
      {/* Background decorations */}
      <Box
        position="absolute"
        top="20%"
        left="-5%"
        width="350px"
        height="350px"
        borderRadius="full"
        bg={useColorModeValue('purple.50', 'purple.900')}
        opacity={0.5}
        filter="blur(70px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="20%"
        right="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg={useColorModeValue('cyan.50', 'cyan.900')}
        opacity={0.4}
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
              {t('contact.title')}
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

        {/* Contact buttons */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <SimpleGrid
            columns={{ base: 1, sm: 3 }}
            spacing={6}
            maxW="700px"
            mx="auto"
          >
            {contacts.map((contact) => (
              <ContactButton key={contact.label} {...contact} />
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Footer */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          mt={20}
          textAlign="center"
        >
          <Text fontSize="sm" color={subtitleColor}>
            © {new Date().getFullYear()} Vincas Linkevičius. Built with React & Chakra UI.
          </Text>
        </MotionBox>
      </Box>
    </Box>
  )
}

export default Contact
