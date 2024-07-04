// import { AuthAction } from "./AuthAction";
// import { LOGIN, LOGOUT } from "./constants";

// const initialState = {
//     isAuthenticated: false,
//     user: null,
//     authenticate: (token, role) => {},
//     logOut: () => {},
//   };

// export function authReducer(state = initialState, action: AuthAction): EventState {

//     switch (action.type) {
  
//       case LOGIN: {
//         return {
//             isAuthenticated: true,
//             user: action.user,
//           };
//       }
//       case LOGOUT: {
//         return {
//             isAuthenticated: false,
//             user: null,
//           };
//       }
  
//       default: {
//         return state;
//       }
//     }
//   }