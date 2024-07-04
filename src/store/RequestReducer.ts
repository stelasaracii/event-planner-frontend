import { ADD_REQUEST, DELETE_REQUESTS, EDIT_REQUEST, SET_REQUESTS, SET_DATA } from "./constants";
import { RequestAction } from "./RequestAction";
import { RequestState } from "./RequestState";

export function requestReducer(state: RequestState, action: RequestAction): RequestState {

  switch (action.type) {
    case ADD_REQUEST: {
      const updatedList = state
      updatedList.requests.push(action.request)
      return {...state, requests: updatedList.requests};
    }

    case SET_REQUESTS: {
      console.log(action.requests)
      return {...state, requests: action.requests};
    }
    case DELETE_REQUESTS: {
      const requests = state.requests.filter((item) => item.request_id !== action.deleteRequestId)
      
      return {...state, requests: requests};
    }

    default: {
      return state;
    }
  }
}