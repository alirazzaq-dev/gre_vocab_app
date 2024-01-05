import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import Header from '@/Components/Header';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider>
      <Header />
      <Box p={{ base: "10px", md: "20px" }}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
