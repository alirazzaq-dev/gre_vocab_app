import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// extend the theme
const theme = extendTheme({

  initialColorMode: "dark",
  useSystemColorMode: false,
    // colors: {
    //   primary: {
    //     dark: "#003100",
    //     light: "#e6f6e6",
    //   },
    //   secondary: "#009400",
    //   text: {
    //     dark: "#000",
    //     light: "#fff"
    //    },
    //   icon: "pink"
    //   // {
    //   //   dark: "pink",
    //   //   light: "red"
    //   // },
    // },

})

export default theme