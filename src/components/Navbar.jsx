import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Text,
  HStack,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Link as ScrollLink } from 'react-scroll'
import { FaMoon, FaSun, FaBars } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const navItems = [
  { key: 'home', to: 'home' },
  { key: 'about', to: 'about' },
  { key: 'skills', to: 'skills' },
  { key: 'experience', to: 'experience' },
  { key: 'projects', to: 'projects' },
  { key: 'contact', to: 'contact' },
]

function Navbar() {
  const { t, i18n } = useTranslation()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  const bg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(10, 10, 20, 0.8)'
  )
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const activeColor = useColorModeValue('purple.600', 'purple.300')
  const logoGradient = 'linear(to-r, purple.400, cyan.400)'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navItems.map((item) => item.to)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  const NavLink = ({ item, onClick }) => (
    <ScrollLink
      to={item.to}
      spy={true}
      smooth={true}
      offset={-80}
      duration={500}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Text
        px={3}
        py={2}
        fontSize="md"
        fontWeight={activeSection === item.to ? '700' : '500'}
        color={activeSection === item.to ? activeColor : textColor}
        position="relative"
        _hover={{ color: activeColor }}
        transition="color 0.2s"
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: activeSection === item.to ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
            width: '80%',
            height: '2px',
            bgGradient: 'linear(to-r, purple.400, cyan.400)',
            borderRadius: 'full',
            transition: 'transform 0.3s ease',
          },
          '&:hover::after': {
            transform: 'translateX(-50%) scaleX(1)',
          },
        }}
      >
        {t(`nav.${item.key}`)}
      </Text>
    </ScrollLink>
  )

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={bg}
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor={scrolled ? borderColor : 'transparent'}
        boxShadow={scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none'}
        transition="all 0.3s ease"
      >
        <Flex
          maxW="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={5}
          align="center"
          justify="space-between"
        >
          {/* Logo */}
          <ScrollLink to="home" smooth={true} duration={500} style={{ cursor: 'pointer' }}>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="800"
              bgGradient={logoGradient}
              bgClip="text"
              letterSpacing="tight"
            >
              VL
            </Text>
          </ScrollLink>

          {/* Desktop Nav Links */}
          <HStack spacing={1} display={{ base: 'none', lg: 'flex' }}>
            {navItems.map((item) => (
              <NavLink key={item.key} item={item} />
            ))}
          </HStack>

          {/* Right Controls */}
          <HStack spacing={2}>
            {/* Language Switcher */}
            <HStack spacing={1} bg={useColorModeValue('gray.100', 'whiteAlpha.100')} borderRadius="full" p={1}>
              <Button
                size="xs"
                borderRadius="full"
                px={3}
                variant={i18n.language === 'en' ? 'solid' : 'ghost'}
                colorScheme={i18n.language === 'en' ? 'purple' : 'gray'}
                onClick={() => switchLanguage('en')}
                fontWeight="600"
                fontSize="xs"
              >
                EN
              </Button>
              <Button
                size="xs"
                borderRadius="full"
                px={3}
                variant={i18n.language === 'lt' ? 'solid' : 'ghost'}
                colorScheme={i18n.language === 'lt' ? 'purple' : 'gray'}
                onClick={() => switchLanguage('lt')}
                fontWeight="600"
                fontSize="xs"
              >
                LT
              </Button>
            </HStack>

            {/* Color Mode Toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              borderRadius="full"
              size="sm"
              color={textColor}
              _hover={{ bg: useColorModeValue('gray.100', 'whiteAlpha.200') }}
            />

            {/* Mobile Hamburger */}
            <IconButton
              aria-label="Open menu"
              icon={<FaBars />}
              onClick={onOpen}
              variant="ghost"
              display={{ base: 'flex', lg: 'none' }}
              borderRadius="full"
              size="sm"
              color={textColor}
            />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent
          bg={useColorModeValue('white', 'gray.900')}
          maxW="280px"
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              fontSize="xl"
              fontWeight="800"
              bgGradient={logoGradient}
              bgClip="text"
            >
              Vincas Linkevičius
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={2} align="stretch" pt={4}>
              {navItems.map((item) => (
                <NavLink key={item.key} item={item} onClick={onClose} />
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
