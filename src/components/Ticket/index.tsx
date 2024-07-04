import { Badge, Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import React from "react";

type EventTableProps = {
  events: Event[]; // Annotate the 'events' prop with the Event type
};

const Ticket: React.FC<EventTableProps> = ({ events }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
    >
      <Image src="https://via.placeholder.com/150" alt="Ticket Image" />

      <Box p="4">
        <Flex justify="space-between" align="center">
          <Badge variant="outline" colorScheme="blue">
            VIP
          </Badge>
          <Text fontSize="lg" fontWeight="bold">
            $100
          </Text>
        </Flex>
        <Text mt="2" color="gray.600">
          Special access to front row seating.
        </Text>
        <Button mt="4" colorScheme="teal" size="sm">
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default Ticket;
