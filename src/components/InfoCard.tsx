import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import React from 'react';

interface InfoCardProps {
    title: string;
    count: number;
    bgColor: string;
  }

export const InfoCard: React.FC<InfoCardProps> = ({ title, count, bgColor }) => {
    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="4"
        boxShadow="md"
        mr="32"
        mb="8"
        bgColor={bgColor}
      >
        <Heading as="h2" size="lg" mb="2">
          {title}
        </Heading>
        <Text fontSize="lg">{count}</Text>
      </Box>
    );
  };