// UnauthorizedScreen.js
import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const UnauthorizedScreen = () => {
  return (
    <Box textAlign="center" p={8} maxW="400px" mx="auto" borderRadius="lg" boxShadow="md" bg="white">
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="red.500">
        Access Denied
      </Text>
      <Text fontSize="lg" mb={6} color="gray.600">
        Oops! It seems you don't have permission to access this page. 
      </Text>
      <Link to="/">
        <Button colorScheme="blue" size="lg">
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default UnauthorizedScreen;
