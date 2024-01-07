import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import Header from '@/Components/Header';
import { store } from '../store'
import { Provider } from 'react-redux'
import theme from '@/styles/theme';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> GRE Vocab App </title>
        <meta name="description" content="GRE volab Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Header />
          <Box p={{base: "4px", md: "16px"}} border="0px solid red">
            <Component {...pageProps} />
          </Box>
        </Provider>
      </ChakraProvider>
    </>
  )
}
