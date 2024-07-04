import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { Event } from "../types/Event";
import {
  ADD_EVENT,
  BASE_URL,
  DELETE_EVENTS,
  EDIT_EVENT,
  SET_EVENTS,
  SET_DATA,
} from "./constants";
import { EventState } from "./EventState";
import { eventReducer } from "./EventReducer";
import { fetchEvents } from "./getEvents";

type Props = {
  children?: React.ReactNode;
};

const initialState: EventState = { events: [] };
export const EventContext = createContext<any>({
  events: [],
  addEvent: (event: Event) => {},
  setEvents: () => {},
  deleteEvent: (id: number) => {},
});

export const EventsProvider = ({ children }: Props) => {
  const [eventsState, dispatch] = useReducer(eventReducer, initialState);
  // useEffect(() => {
  //   setEvents();
  // }, []);
  function addEvent(event: Event) {
    dispatch({ type: ADD_EVENT, event: event });
  }
  async function setEvents(events: Event[]) {   
    dispatch({ type: SET_EVENTS, events: events });
  };
  function deleteEvent(id: number) {
    dispatch({ type: DELETE_EVENTS, deleteEventId: id });
  }
  const value1 = {
    addEvent: addEvent,
    deleteEvent: deleteEvent,
    setEvents: setEvents,
    events: eventsState.events,
  };

  return ( <EventContext.Provider value={value1}>{children}</EventContext.Provider>);
 

};