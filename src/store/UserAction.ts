import { User } from "../types/User";
import { ADD_USER, DELETE_USERS, EDIT_USER, SET_USERS } from "./constants";

interface AddUserAction {
  user: User;
  type: typeof ADD_USER;
}

interface EditUserAction {
  editUser: User[];
  type: typeof EDIT_USER;
}

interface DeleteUserAction {
  deleteUserId: number;
  type: typeof DELETE_USERS;
}

interface SetUsersAction {
  users: User[];
  type: typeof SET_USERS;
}
export type UserAction =
  | AddUserAction
  | EditUserAction
  | DeleteUserAction
  | SetUsersAction;