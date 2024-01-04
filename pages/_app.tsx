import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import useWords from '@/Components/Hooks/useWords';
import Header from '@/Components/Header';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider>
      <Header />
      <Box p={{ base: "5px", md: "16px" }}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
