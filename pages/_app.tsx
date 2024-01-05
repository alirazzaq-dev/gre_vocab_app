import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import Header from '@/Components/Header';
import { store } from '../store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider>
        <Provider store={store}>
          <Header />
          <Box p={{ base: "10px", md: "20px" }}>
            <Component {...pageProps} />
          </Box>
        </Provider>
    </ChakraProvider>
  )
}
