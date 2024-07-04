import { ADD_USER, DELETE_USERS, EDIT_USER, SET_USERS } from "./constants";
import { UserAction } from "./UserAction";
import { UserState } from "./UserState";

export function userReducer(state: UserState, action: UserAction): UserState {

  switch (action.type) {
    case ADD_USER: {
      const updatedList = state
      updatedList.users.push(action.user)
      return {...state, users: updatedList.users};
    }

    case SET_USERS: {
      return {...state, users: action.users};
    }
    case DELETE_USERS: {
      const filteredUsers = state.users.filter((item) => item.user_id !== action.deleteUserId)
      
      return {...state, users: filteredUsers};
    }

    default: {
      return state;
    }
  }
}