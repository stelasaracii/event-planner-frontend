import { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import React from "react";
import UserNavbar from "../UserNavbar";
import EventTable from "../EventsTable";
import { EventContext } from "../../store/EventProvider";
import { fetchEvents } from "../../store/getEvents";
import { useNavigate } from "react-router-dom";


const UserDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const eventContext = useContext(EventContext);
    const navigate = useNavigate();

    useEffect(() => {
         fetchEvents()
      .then((data) => {
        eventContext.setEvents(data.events);
        console.log(data.events)
      })
      .catch((error) => {
        navigate("/unauthorized");
      });
    }, [])
    return (
        <>
        <UserNavbar />
        <div>
        <EventTable events={eventContext.events} />
        </div>
        </>
    )
}

export default UserDashboard;