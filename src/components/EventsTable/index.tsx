import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Center,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { FaSearch, FaBook } from "react-icons/fa";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../types/Event";
import axios from "axios";
import { BASE_URL } from "../../store/constants";
import EventModal from "../EventModal";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../store/EventProvider";
import { fetchEvents } from "../../store/getEvents";

type EventTableProps = {
  events: Event[];
};

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [eventList, setEventList] = useState<Event[]>(events);
  const { isOpen: isParticipantsModalOpen, onOpen: onOpenParticipantsModal, onClose: onCloseParticipantsModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const navigate = useNavigate();
  const { setEvents, addEvent, deleteEvent, editEvent } = useContext(EventContext);
  const toast = useToast();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchInitialEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEventList(fetchedEvents.events);
    };

    fetchInitialEvents();
  }, []);

  useEffect(() => {
    setEventList(events);
  }, [events]);

  const openAddModal = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  async function onEditClick(event: Event) {
    setModalMode("edit");
    setIsModalOpen(true);
    setSelectedEvent(event);
  }

  async function onDeleteClick(id: number) {
    setDeleteEventId(id);
    onOpenDeleteModal();
  }

  async function confirmDelete() {
    if (deleteEventId !== null) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${BASE_URL}/protected/events/${deleteEventId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        toast({
          title: "Event Deleted",
          description: "The event has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        const refreshedEventList = await fetchEvents();
        setEventList(refreshedEventList.events);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete event.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setDeleteEventId(null);
        onCloseDeleteModal();
      }
    }
  }

  function onAddClick() {
    setModalMode("add");
    setIsModalOpen(true);
  }

  const fetchParticipants = async (eventId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/protected/participants/${eventId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setParticipants(response.data.participants);
      onOpenParticipantsModal();
    } catch (error) {
      console.error("Failed to fetch participants", error);
    }
  };

  const handleSubmit = async (event: Event) => {
    if (modalMode === "add") {
      try {
        const token = localStorage.getItem("token");
        event.capacity = Number(event.capacity);
        await axios.post(`${BASE_URL}/protected/events`, event, {
          headers: {
            Authorization: `${token}`,
          },
        });
        addEvent(event);
        const refreshedList = await fetchEvents();
        setEventList(refreshedList.events);
        toast({
          title: "Event Created",
          description: "The event has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Failed to create event", error);
        toast({
          title: "Error",
          description: "Failed to create event.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        console.log(event, "edit mode")
        const token = localStorage.getItem("token");
        await axios.put(`${BASE_URL}/protected/events/${event.event_id}`, event, {
          headers: {
            Authorization: `${token}`,
          },
        });
        toast({
          title: "Event Updated",
          description: "The event has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        const refreshedEventList = await fetchEvents(); // Refresh the events list
        setEventList(refreshedEventList.events);
      } catch (error) {
        console.error("Failed to update event", error);
        toast({
          title: "Error",
          description: "Failed to update event.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    setIsModalOpen(false);
  };

  const handleParticipate = async (eventId: number) => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");
      console.log(user_id);
      const requestBody = {
        event_id: eventId,
        user_id: Number(user_id),
        status: "pending",
        request_date: new Date().toISOString(),
      };
      await axios.post(`${BASE_URL}/protected/requests`, requestBody, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast({
        title: "Participation Requested",
        description: "Your request to participate has been submitted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Remove the "Ask to participate" button after successful participation request
      setEventList(prevEventList =>
        prevEventList.map(event =>
          event.event_id === eventId ? { ...event, participated: true } : event
        )
      );
    } catch (error) {
      console.error("Failed to request participation", error);
      toast({
        title: "Error",
        description: "Failed to request participation.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredEvents = useMemo(() => {
    return eventList.filter((event) => event.event_name.toLowerCase().includes(search.toLowerCase()));
  }, [search, eventList]);

  return (
    <Center>
      <Box>
        <Box maxW="960px" p={2}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <InputGroup mb={4}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="gray.300" />
                </InputLeftElement>
                <Input
                  maxW="300px"
                  placeholder="Search events"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <Button
                leftIcon={<FaBook />}
                onClick={onAddClick}
                title="Add Event"
              />
            </div>
            <div style={{ flex: 1 }}>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th>Description</Th>
                    <Th>Capacity</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEvents.map((event) => (
                    <Tr key={event.event_id}>
                      <Td>{event.event_id}</Td>
                      <Td>{event.event_name}</Td>
                      <Td>
                        {new Date(event.event_date).toLocaleDateString()}{" "}
                        {new Date(event.event_date).toLocaleTimeString()}
                      </Td>
                      <Td>{event.description}</Td>
                      <Td>{event.capacity}</Td>
                      <Td>
                        <Flex>
                          {role === "ADMIN" && (
                            <>
                              <IconButton
                                colorScheme="teal"
                                aria-label="Edit"
                                onClick={() => onEditClick(event)}
                                mr="2"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </IconButton>
                              <IconButton
                                colorScheme="red"
                                aria-label="Delete"
                                onClick={() => onDeleteClick(event.event_id)}
                                mr="2"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </IconButton>
                            </>
                          )}
                          {role === "USER" && !event.participated && (
                            <Button
                              colorScheme="blue"
                              mr="2"
                              onClick={() => handleParticipate(event.event_id)}
                            >
                              Ask to participate
                            </Button>
                          )}
                          <IconButton
                            colorScheme="yellow"
                            aria-label="View Participants"
                            onClick={() => fetchParticipants(event.event_id)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </IconButton>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <EventModal
                isOpen={isModalOpen}
                onClose={closeModal}
                mode={modalMode}
                onSubmit={handleSubmit}
                currentEvent={selectedEvent}
              />
            </div>
          </div>
        </Box>
        <Modal isOpen={isParticipantsModalOpen} onClose={onCloseParticipantsModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Participants List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Status</Th>
                    <Th>User</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {participants.map((participant) => (
                    <Tr key={participant.participant_id}>
                      <Td>{participant.participant_id}</Td>
                      <Td>{participant.participation_status}</Td>
                      <Td>{participant.user_full_name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onCloseParticipantsModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this event?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={confirmDelete}>
                Delete
              </Button>
              <Button colorScheme="gray" onClick={onCloseDeleteModal} ml={3}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
};

export default EventTable;
