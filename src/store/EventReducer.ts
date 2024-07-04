import { ADD_EVENT, DELETE_EVENTS, EDIT_EVENT, SET_EVENTS, SET_DATA } from "./constants";
import { EventAction } from "./EventAction";
import { EventState } from "./EventState";

export function eventReducer(state: EventState, action: EventAction): EventState {

  switch (action.type) {
    case ADD_EVENT: {
      const updatedList = state
      updatedList.events.push(action.event)
      return {...state, events: updatedList.events};
    }

    case SET_EVENTS: {
      console.log(action.events)
      return {...state, events: action.events};
    }
    case DELETE_EVENTS: {
      const events = state.events.filter((item) => item.event_id !== action.deleteEventId)
      
      return {...state, events: events};
    }

    default: {
      return state;
    }
  }
}