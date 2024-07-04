import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { UsersProvider } from "./store/UserProvider";
import { EventsProvider } from "./store/EventProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { RequestsProvider } from "./store/RequestProvider";

const rootElement = document.getElementById("root");
const MuiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // components: {
  //   MuiDataGrid: {
  //     styleOverrides: {
  //       root: {
  //         border: 1,
  //         borderColor: colors.primaryGrayMid,
  //         borderStyle: "solid",
  //         borderRadius: 10,
  //         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  //         backgroundColor: colors.primaryGrayDark,
  //         color: "#C1C2C5",
  //         padding: 10,
  //       },
  //     },
  //   },
  // },
});
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider theme={MuiTheme}>
      <ChakraProvider>
        <UsersProvider>
          <EventsProvider>
            <RequestsProvider>
              <App />
            </RequestsProvider>
          </EventsProvider>
        </UsersProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
} else {
  console.error('Root element with id "root" not found.');
}
