import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../store/constants";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function setTokenWithExpiry(token: string) {
    const now = new Date();
    const expirationTime = now.getTime() + 1 * 60 * 60 * 1000; // Calculate expiration time in milliseconds
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", "1");

    setTimeout(() => {
      if (new Date().getTime() >= expirationTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
      }
    }, 60 * 60 * 1000);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post(BASE_URL + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      if (response.status === 200) {
        setTokenWithExpiry(response.data.credentials.jwt);
        if (response.data.credentials) {
          console.log(response.data.credentials, "kredencialet")
          const role = response.data.credentials.role;
          const userId = response.data.credentials.userId;
          localStorage.setItem("role", role);
          localStorage.setItem("userId", userId);
          console.log( role, "roli");
          if (role === "ADMIN") navigate("/admin", { replace: true });
          if (role === "USER") navigate("/user", { replace: true });
          return response;
        }
      } else {
        setError("Login failed. Please check your email and password.");
        console.error("Login failed");
      }
    } catch (error) {
      setError("An error occurred while attempting to log in.");
      console.error("Error:", error);
    }
  };

  const isButtonDisabled = !formData.email || !formData.password || formData.email === '' || formData.password === '';

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage="url('./How-to-Compare-Conference-Room-Management-Technology.jpeg')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        p={8}
        bg="rgba(255, 255, 255, 0.9)"
        rounded="lg"
        boxShadow="lg"
        w={{ base: "90%", md: "30%" }}
      >
        <Heading size="lg" mb={4}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                pr="4.5rem"
                value={formData.password}
                onChange={handleInputChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="teal"
                  onClick={handleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="teal" type="submit" mt={6} w="100%" isDisabled={isButtonDisabled}>
            Log In
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
