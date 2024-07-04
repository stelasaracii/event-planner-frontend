import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Event } from "../../types/Event";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  onSubmit: (event: Event) => void;
  currentEvent: Event | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  currentEvent
}) => {
  const [event, setEvent] = useState<Event>({
    event_id: 0,
    event_name: "",
    event_date: new Date(),
    description: "",
    capacity: 0
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const toast = useToast();

  const resetForm = () => {
    setEvent({
      event_id: 0,
      event_name: "",
      event_date: new Date(),
      description: "",
      capacity: 0
    });
    setDate("");
    setTime("");
  };

  useEffect(() => {
    if (mode === "edit" && currentEvent) {
      setEvent(currentEvent);
      const [date, time] = currentEvent.event_date.toLocaleString('en-US').split(', ');
      setDate(date);
      setTime(time);
    } else {
      resetForm();
    }
  }, [mode, currentEvent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventDate = new Date(`${date}T${time}`);
    if (eventDate <= new Date()) {
      toast({
        title: "Invalid Date",
        description: "The event date and time must be in the future.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
      return;
    }
    onSubmit({ ...event, event_date: eventDate });
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "add" ? "Add Event" : "Edit Event"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="event_name"
                value={event.event_name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={handleDateChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                value={time}
                onChange={handleTimeChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                value={event.description}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Capacity</FormLabel>
              <Input
                type="number"
                name="capacity"
                value={event.capacity}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" mt={4}>
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
