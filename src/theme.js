import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
}

const colors = {
  brand: {
    50: '#f0e6ff',
    100: '#d4b3ff',
    200: '#b980ff',
    300: '#9d4dff',
    400: '#8126ff',
    500: '#6600e6',
    600: '#5000b3',
    700: '#3a0080',
    800: '#24004d',
    900: '#0e001a',
  },
  accent: {
    50: '#e0f7ff',
    100: '#b3ecff',
    200: '#80e0ff',
    300: '#4dd4ff',
    400: '#26cbff',
    500: '#00bfff',
    600: '#0099cc',
    700: '#007399',
    800: '#004d66',
    900: '#002633',
  },
}

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
      color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
    },
    '::selection': {
      backgroundColor: 'purple.400',
      color: 'white',
    },
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
    },
    '::-webkit-scrollbar-thumb': {
      bg: props.colorMode === 'dark' ? 'purple.600' : 'purple.400',
      borderRadius: 'full',
    },
  }),
}

const components = {
  Button: {
    variants: {
      gradient: {
        bgGradient: 'linear(to-r, purple.500, cyan.400)',
        color: 'white',
        _hover: {
          bgGradient: 'linear(to-r, purple.600, cyan.500)',
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 30px rgba(128, 0, 255, 0.3)',
        },
        _active: {
          transform: 'translateY(0)',
        },
        transition: 'all 0.3s ease',
      },
    },
  },
}

const theme = extendTheme({
  config,
  fonts,
  colors,
  styles,
  components,
})

export default theme
