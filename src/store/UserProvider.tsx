import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import { User } from "../types/User";
import {
  ADD_USER,
  BASE_URL,
  DELETE_USERS,
  EDIT_USER,
  SET_USERS,
} from "./constants";
import { UserState } from "./UserState";
import { userReducer } from "./UserReducer";
import { fetchUsers } from "./getUsers";

type Props = {
  children?: React.ReactNode;
};

const initialState: UserState = { users: [] };
export const UserContext = createContext<any>({
  users: [],
  addUser: (user: User) => {},
  setUsers: () => {},
  deleteUser: (id: number) => {},
});

export const UsersProvider = ({ children }: Props) => {
  const [usersState, dispatch] = useReducer(userReducer, initialState);
  // useEffect(() => {
  //   setUsers();
  // }, []);
  function addUser(user: User) {
    dispatch({ type: ADD_USER, user: user });
  }
  function setUsers(users: User[]) {
    dispatch({ type: SET_USERS, users: users });
  };
  function deleteUser(id: number) {
    dispatch({ type: DELETE_USERS, deleteUserId: id });
  }
  const value1 = {
    addUser: addUser,
    deleteUser: deleteUser,
    setUsers: setUsers,
    users: usersState.users,
  };

  return <UserContext.Provider value={value1}>{children}</UserContext.Provider>;
};
