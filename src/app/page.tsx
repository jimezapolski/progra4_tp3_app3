'use client';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import CodeEditor from './components/CodeEditor';
import {Box} from '@chakra-ui/react';

const Home = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor />
    </Box>
    </ChakraProvider>
  );
};

export default Home;
