// src/components/Dashboard.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  SimpleGrid,
  Flex,
  Center,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EventCard from "../EventCard";
import UserTable from "../UsersTable";
import Navbar from "../Navbar";
import { InfoCard } from "../InfoCard";
// import EventList from "../EventList";
import { User } from "../../types/User";
import { UserContext } from "../../store/UserProvider";
import { EventContext } from "../../store/EventProvider";
import { Event } from "../../types/Event";
import UserModal from "../UserModal";
import { fetchUsers } from "../../store/getUsers";
import { fetchEvents } from "../../store/getEvents";
import EventRequests from "../EventRequests";
import { RequestContext } from "../../store/RequestProvider";
import EventTable from "../EventsTable";
import { fetchRequests } from "../../store/getRequests";

const Dashboard: React.FC = () => {

  const { users, addUser, setUsers, editUser, deleteUser } = useContext(UserContext);
  const { events, addEvent, setEvents, editEvent} = useContext(EventContext);
  const requestContext = useContext(RequestContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        navigate("/unauthorized");
      });
    fetchEvents()
      .then((data) => {
        setEvents(data.events);
        console.log(data.events)
      })
      .catch((error) => {
        navigate("/unauthorized");
      });

    fetchRequests()
      .then((data) => {
        requestContext.setRequests(data.requests);
        console.log(data.requests)
      })
      .catch((error) => {
        navigate("/unauthorized");
      });

  }, []);

  return (
    <>
      <Navbar />
      <Box p={8}>
        <Center>
          <Flex>
            <InfoCard
              title="Total Events"
              count={events.length}
              bgColor="blue.200"
            />
            <InfoCard
              title="Registered Users"
              count={users.length}
              bgColor="green.200"
            />
            <InfoCard
              title="Recent events"
              count={events.filter(event => {
                const now = new Date();
                const oneWeekLater = new Date();
                oneWeekLater.setDate(now.getDate() + 7);
                const eventDate = new Date(event.event_date);
                return eventDate >= now && eventDate <= oneWeekLater;
              }).length}
              bgColor="red.300"
            />
            <InfoCard
              title="Requests"
              count={requestContext.requests.length}
              bgColor="yellow.300"
            />
          </Flex>
        </Center>
        {location.pathname === "/admin" ? (
          <Box p={4}>
            <UserTable users={users} />
          </Box>
        ) : (
          ""
        )}
        <Stack spacing={4}>
          {location.pathname === "/admin/events" ? (
            <EventTable events={events} />
          ) : (
            <Link to="/add-event"></Link>
          )}
        </Stack>
        <Stack spacing={4}>
          {location.pathname === "/admin/requests" ? (
            <EventRequests requests={requestContext.requests} />
          ) : (
            <></>
          )}
        </Stack>

        <Stack spacing={4}>
          <Link to="/add-event"></Link>
        </Stack>
      </Box>
    </>
  );
};

export default Dashboard;
