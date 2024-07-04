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
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { Event } from "../../types/Event";
  
  interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    onSubmit: () => void; 
    currentEvent : Event | null;
  }
  
  const RequestModal: React.FC<RequestModalProps> = ({
    isOpen,
    onClose,
    mode,
    onSubmit,
    currentEvent
  }) => {
    const [event, setEvent] = useState<Event>({ event_id: 0, event_name: '',  description: '', capacity: 0, event_date: new Date() })
    useEffect(() => {
      if (mode === "edit" && currentEvent) {
        setEvent(currentEvent);
      }
    }, [mode, currentEvent]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEvent({ ...event, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(event);
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{mode === "add" ? "Add Event" : "Edit Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl mt={4}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={event.event_name}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
  
              {/* Add more form fields for event details here */}
  
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default RequestModal;
  