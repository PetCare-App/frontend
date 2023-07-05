import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { ProviderContext } from "./context";
import { Signup } from "./pages/signup/Signup";
import LandingPage from "./pages/landingPage/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
  {
    path: "/usuario/edit",
    element: <App />,
  },
  {
    path: "/higiene",
    element: <App />,
  },
  {
    path: "/higiene/dashboard",
    element: <App />,
  },
  {
    path: "/higiene/create",
    element: <App />,
  },
  {
    path: "/higiene/edit",
    element: <App />,
  },
  {
    path: "/controle-parasitario",
    element: <App />,
  },
  {
    path: "/controle-parasitario/dashboard",
    element: <App />,
  },
  {
    path: "/controle-parasitario/create",
    element: <App />,
  },
  {
    path: "/controle-parasitario/edit",
    element: <App />,
  },  {
    path: "/vacinas",
    element: <App />,
  },
  {
    path: "/vacinas/dashboard",
    element: <App />,
  },
  {
    path: "/vacinas/create",
    element: <App />,
  },
  {
    path: "/vacinas/edit",
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
