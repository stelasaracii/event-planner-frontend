import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Event } from '../../types/Event';

const EventForm: React.FC = () => {
  const [eventInfo, setEventInfo] = useState<Event>({
    event_id: 0,
    event_name: '',
    event_date: new Date(),
    description: '',
    capacity: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventInfo({ 
      ...eventInfo, 
      [name]: name === 'capacity' ? parseInt(value, 10) : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(eventInfo);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="event_name"
            value={eventInfo.event_name}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Capacity</FormLabel>
          <Input
            type="number"
            name="capacity"
            value={eventInfo.capacity}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={eventInfo.description}
            onChange={handleInputChange}
            rows={4}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          mt={4}
          isDisabled={!eventInfo.event_name}
        >
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default EventForm;
