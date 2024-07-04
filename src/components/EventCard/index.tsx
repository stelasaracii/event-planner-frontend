import { Heading, Checkbox, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Stack, Text, Image } from "@chakra-ui/react";
import React from "react";

const EventCard: React.FC<EventCardProps> = ({ event, isSelected, onToggleSelection }) => {
    return (
      <Card maxW='sm'>
      <CardBody>
        <Image
          // src={event.coverImageUrl}
          alt={event.title}
          borderRadius='lg'
          objectFit='cover'
          h='200px'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{event.title}</Heading>
          <Text fontSize='sm' color='gray.500'>
            by {event.author}
          </Text>
          <Text>
            {event.description}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            ${event.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Order
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    );
  };

  export default EventCard;

  interface EventCardProps {
    event: { id: number; title: string; author: string, description: string, price: string };
    isSelected: boolean;
    onToggleSelection: () => void;
  }