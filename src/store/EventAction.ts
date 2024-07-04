import { Event } from "../types/Event";
import { ADD_EVENT, DELETE_EVENTS, EDIT_EVENT, SET_EVENTS } from "./constants";

interface AddEventAction {
  event: Event;
  type: typeof ADD_EVENT;
}

interface EditEventAction {
  editEvent: Event[];
  type: typeof EDIT_EVENT;
}

interface DeleteEventAction {
  deleteEventId: number;
  type: typeof DELETE_EVENTS;
}

interface SetEventsAction {
  events: Event[];
  type: typeof SET_EVENTS;
}
export type EventAction =
  | AddEventAction
  | EditEventAction
  | DeleteEventAction
  | SetEventsAction;