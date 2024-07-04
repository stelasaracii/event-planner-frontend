import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
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
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaUserPlus } from "react-icons/fa";
import { User } from "../../types/User";
import axios from "axios";
import { BASE_URL } from "../../store/constants";
import UserModal from "../UserModal";
import { ButtonGroup } from "@mui/material";

type UserTableProps = {
  users: User[]; // Annotate the 'users' prop with the User type
};

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [userList, setUserList] = useState<User[]>(users);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/protected/users`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setUserList(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setModalMode("edit");
    setIsModalOpen(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const openConfirmation = (userId: number) => {
    setUserIdToDelete(userId);
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setUserIdToDelete(null);
    setConfirmationOpen(false);
  };

  const handleDelete = async () => {
    if (userIdToDelete !== null) {
      try {
        await axios.delete(`${BASE_URL}/protected/users/${userIdToDelete}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        fetchUsers(); // Fetch the updated user list after deletion
        closeConfirmation();
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };

  const handleSubmit = async () => {
    fetchUsers(); // Fetch the updated user list after adding/editing a user
    closeModal();
  };
  const rows = userList.map(({ user_id, full_name, email, roleName }) => ({
    user_id,
    full_name,
    email,
    roleName,
  }));

  return (
    <Center>
      <Box>
        <Box maxW="960px" p={2}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                leftIcon={<FaUserPlus />}
                onClick={openAddModal}
                title="Add User"
              />
            </div>
            <div style={{ flex: 1 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Full name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.user_id}>
                        <TableCell>{row.user_id}</TableCell>
                        <TableCell>{row.full_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.roleName}</TableCell>
                        <TableCell>
                          {row.roleName !== "ADMIN" && (
                            <ButtonGroup size="small">
                              <Button onClick={() => openEditModal(row)}>
                                Edit
                              </Button>
                              <Button
                                ml={4}
                                colorScheme="red"
                                onClick={() => openConfirmation(row.user_id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Modal isOpen={isConfirmationOpen} onClose={closeConfirmation}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm Deletion</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>Do you want to delete the user?</ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" onClick={handleDelete}>
                      Yes
                    </Button>
                    <Button colorScheme="gray" onClick={closeConfirmation}>
                      No
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <UserModal
                isOpen={isModalOpen}
                onClose={closeModal}
                mode={modalMode}
                onSubmit={handleSubmit}
                currentUser={selectedUser}
              />
            </div>
          </div>
        </Box>
      </Box>
    </Center>
  );
};

export default UserTable;
