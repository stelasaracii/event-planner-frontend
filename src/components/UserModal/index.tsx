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
  Select,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../types/User";
import axios from "axios";
import { BASE_URL } from "../../store/constants";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  onSubmit: () => void;
  currentUser: User | null;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  currentUser,
}) => {
  const initialEmptyUser = {
    user_id: 0,
    full_name: "",
    email: "",
    password: "",
    roleName: "ADMIN",
  };
  const [user, setUser] = useState<User>(initialEmptyUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && currentUser) {
      setUser(currentUser);
    } else {
      setUser(initialEmptyUser);
    }
  }, [mode, currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRoleChange = (selectedRole: string) => {
    setUser({ ...user, roleName: selectedRole });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (mode === "add") {
        await axios.post(BASE_URL + "/protected/users", user, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      } else {
        await axios.put(`${BASE_URL}/protected/users/${user.user_id}`, user, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      }
      onSubmit(); // Call onSubmit to refresh users and close the modal
      onClose(); // Close the modal
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "add" ? "Add User" : "Edit User"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {errorMessage && (
            <Box mt={4}>
              <Alert status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="full_name"
                value={user.full_name}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            
            {mode === "add" && (
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            )}

            <FormControl mt={4} mb={12}>
              <FormLabel>Role</FormLabel>
              <Select
                name="role"
                value={user.roleName}
                onChange={(e) => handleRoleChange(e.target.value)}
                required
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </Select>
            </FormControl>

            <Button ml={16} colorScheme="teal" type="submit">
              Submit
            </Button>
            <Button ml={16} colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
