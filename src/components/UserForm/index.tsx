import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { User } from '../../types/User';

const LibraryUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    user_id: 0,
    full_name: '',
    email: '',
    password: '',
    roleName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>

        <FormControl mt={4}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
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

        <Button
          type="submit"
          colorScheme="teal"
          mt={4}
          isDisabled={
            !user.full_name || !user.email
          }
        >
          Add User
        </Button>
      </form>
    </Box>
  );
};

export default LibraryUserForm;
