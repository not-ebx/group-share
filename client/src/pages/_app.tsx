import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React, { Component, PropsWithChildren } from 'react'
import Wrapper from '../components/global/format/Wrapper';
import Navbar from '../components/global/navbar/Navbar';
import { GroupApp } from '../components/themes/themes';
import { apolloClient } from '../utils/ApolloClient';


const MyApp = ({ Component, pageProps }) => {
    return ( 
        <ApolloProvider client={ apolloClient }  >
            <ChakraProvider theme={GroupApp}>
                <Navbar />
                <Wrapper>
                    <Component {...pageProps} /> 
                </Wrapper>
            </ChakraProvider>
        </ApolloProvider>
    );
}

export default MyApp