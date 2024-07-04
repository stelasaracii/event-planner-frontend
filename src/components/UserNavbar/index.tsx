import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = (props: NavLinkProps) => {
  const { href, children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      color="white"
      rounded={"md"}
      _hover={{ bg: "blue.700" }}
      href={href}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [participants, setParticipants] = useState<any[]>([]);
  
  const navigate = useNavigate();
  const links = [
    { text: "Home", href: "/user" }
  ];

  function handleLogout(): void {
    // Clear the authentication token
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Redirect to the login page
    navigate("/", { replace: true });
  }

  const fetchParticipants = async (eventId: number) => {
    try {
      const response = await axios.get(`http:localhost:5000/events/${eventId}/participants`);
      setParticipants(response.data);
      onOpen();
    } catch (error) {
      console.error("Failed to fetch participants", error);
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("blue.800", "blue.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading
            size="lg"
            color="white"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
            }}
          >
            Events Manager
          </Heading>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        <Flex alignItems={"center"} ml="auto"></Flex>
      </Box>
    </>
  );
}
