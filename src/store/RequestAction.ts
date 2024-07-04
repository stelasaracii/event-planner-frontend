import { Request } from "../types/Request";
import { ADD_REQUEST, DELETE_REQUESTS, EDIT_REQUEST, SET_REQUESTS } from "./constants";

interface AddRequestAction {
  request: Request;
  type: typeof ADD_REQUEST;
}

interface EditRequestAction {
  editRequest: Request[];
  type: typeof EDIT_REQUEST;
}

interface DeleteRequestAction {
  deleteRequestId: number;
  type: typeof DELETE_REQUESTS;
}

interface SetRequestsAction {
  requests: Request[];
  type: typeof SET_REQUESTS;
}
export type RequestAction =
  | AddRequestAction
  | EditRequestAction
  | DeleteRequestAction
  | SetRequestsAction;