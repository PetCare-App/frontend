import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { ProviderContext } from "./context";
import { Signup } from "./pages/signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/pets",
    element: <App />,
  },
  {
    path: "/pets/dashboard",
    element: <App />,
  },
  {
    path: "/pets/create",
    element: <App />,
  },
  {
    path: "/pets/edit",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProviderContext>
      <RouterProvider router={router} />
    </ProviderContext>
  </React.StrictMode>
);
