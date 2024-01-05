import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// extend the theme
const theme = extendTheme({
  // config: {
  //   initialColorMode: "system",
  //   useSystemColorMode: false,
  // },

  colors: {
    brand: {
      100: "#FFF5F5",
      200: "#FED7D7",
      300: "#FEB2B2",
      400: "#FC8181",
      500: "#F56565",
      600: "#E53E3E",
      700: "#C53030",
      800: "#9B2C2C",
      900: "#822727",
      1000: "#63171B",
    },
  },

  // colors: {
  //   primary: {
  //     main: "#000"
  //   },
  //   secondary: {
  //     main: "#000fff"
  //   }
  // },
  // initialColorMode: 'dark',
  // semanticTokens: {
  //   colors: {
  //     text: {
  //       default: '#16161D',
  //       _dark: '#ade3b8',
  //     },
  //     primary: {
  //       default: '#FF0080',
  //       _dark: '#fbec8f',
  //     },
  //   }
  // }
})

export default theme