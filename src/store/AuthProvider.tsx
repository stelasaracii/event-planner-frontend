// import { useEffect, useReducer } from "react";
// import { LOGIN, LOGOUT } from "./constants";

// export const AuthProvider = ({ children }: Props) => {
//     const [usersState, dispatch] = useReducer(authReducer, initialState);
//     useEffect(() => {
//       setEvents();
//     }, []);
//     function login(event: Event) {
//       dispatch({ type: LOGIN, user: user });
//     }
//     function logOut(id: number) {
//       dispatch({ type: LOGOUT, deleteEventId: id });
//     }
//     const value1 = {
//         login: login,
//         logOut: logOut,
//     };
  
//     return ( <AuthContext.Provider value={value1}>{children}</AuthContext.Provider>);
   
  
//   };