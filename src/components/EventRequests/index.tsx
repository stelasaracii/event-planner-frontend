import React, { useState, useEffect } from "react";
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
import { FaSearch } from "react-icons/fa";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { BASE_URL } from "../../store/constants";

const RequestTable = ({ requests }) => {
  const [search, setSearch] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setFilteredRequests(
      requests.filter((request) =>
        request.status.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, requests]);

  const openViewModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const handleAccept = async (request) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/protected/requests/${request.request_id}/accept`, request, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast({
        title: "Request Accepted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Refresh or update the request list here
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (request) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/protected/requests/${request.requestId}/reject`, request, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast({
        title: "Request Rejected",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Refresh or update the request list here
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
                  placeholder="Search requests"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </div>
            <div style={{ flex: 1 }}>
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Request ID</Th>
                    <Th>Event </Th>
                    <Th>User </Th>
                    <Th>Status</Th>
                    <Th>Request Date</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredRequests.map((request) => (
                    <Tr key={request.request_id}>
                      <Td>{request.request_id}</Td>
                      <Td>{request.event_name}</Td>
                      <Td>{request.user_name}</Td>
                      <Td>{request.status}</Td>
                      <Td>{new Date(request.request_date).toLocaleString()}</Td>
                      <Td>
                        <Flex>
                          <IconButton
                            colorScheme="yellow"
                            aria-label="View Request"
                            onClick={() => openViewModal(request)}
                            mr="2"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </IconButton>
                          {request.status === "pending" && (
                            <>
                              <Button
                                colorScheme="green"
                                mr="2"
                                onClick={() => handleAccept(request)}
                              >
                                Accept
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => handleReject(request)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Request Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {selectedRequest && (
                      <Box>
                        <p><strong>Request ID:</strong> {selectedRequest.request_id}</p>
                        <p><strong>Event :</strong> {selectedRequest.event_id}</p>
                        <p><strong>User :</strong> {selectedRequest.user_id}</p>
                        <p><strong>Status:</strong> {selectedRequest.status}</p>
                        <p><strong>Request Date:</strong> {new Date(selectedRequest.request_date).toLocaleString()}</p>
                      </Box>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={closeModal}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </Box>
      </Box>
    </Center>
  );
};

export default RequestTable;
