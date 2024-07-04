import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { Request } from "../types/Request";
import {
  ADD_REQUEST,
  BASE_URL,
  DELETE_REQUESTS,
  EDIT_REQUEST,
  SET_REQUESTS,
  SET_DATA,
} from "./constants";
import { RequestState } from "./RequestState";
import { requestReducer } from "./RequestReducer";

type Props = {
  children?: React.ReactNode;
};

const initialState: RequestState = { requests: [] };
export const RequestContext = createContext<any>({
  requests: [],
  addRequest: (request: Request) => {},
  setRequests: () => {},
  deleteRequest: (id: number) => {},
});

export const RequestsProvider = ({ children }: Props) => {
  const [requestsState, dispatch] = useReducer(requestReducer, initialState);
  // useEffect(() => {
  //   setRequests();
  // }, []);
  function addRequest(request: Request) {
    dispatch({ type: ADD_REQUEST, request: request });
  }
  function setRequests(requests: Request[]) {    
    console.log(requests)
    dispatch({ type: SET_REQUESTS, requests: requests });
  };
  function deleteRequest(id: number) {
    dispatch({ type: DELETE_REQUESTS, deleteRequestId: id });
  }
  const value1 = {
    addRequest: addRequest,
    deleteRequest: deleteRequest,
    setRequests: setRequests,
    requests: requestsState.requests,
  };

  return ( <RequestContext.Provider value={value1}>{children}</RequestContext.Provider>);
 

};