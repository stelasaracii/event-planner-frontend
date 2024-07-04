import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EventForm from "./components/EventForm";
import LibraryUserForm from "./components/UserForm";
import UserDashboard from "./components/UserDashboard";
import UnauthorizedScreen from "./screens/UnauthorizedScreen";

function App(): React.ReactElement {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const ProtectedRoute = ({ element, allowedRoles }: { element: React.ReactElement, allowedRoles: string[] }) => {
    console.log(localStorage.getItem("role"), allowedRoles, allowedRoles.includes(localStorage.getItem("role")))
    if (allowedRoles.includes(localStorage.getItem("role"))) {
      return element;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  };

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/admin",
      element: <ProtectedRoute element={<Dashboard />} allowedRoles={["ADMIN"]} />,
    },
    {
      path: "/admin/events",
      element: <ProtectedRoute element={<Dashboard />} allowedRoles={["ADMIN"]} />,
    },
    {
      path: "/admin/requests",
      element: <ProtectedRoute element={<Dashboard />} allowedRoles={["ADMIN"]} />,
    },
    {
      path: "/user",
      element: <ProtectedRoute element={<UserDashboard />} allowedRoles={["USER"]} />,
    },
    { path: "/events/new-event", element: <EventForm /> },
    { path: "/users/new-user", element: <LibraryUserForm /> },
    { path: "/unauthorized", element: <UnauthorizedScreen /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;