import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ComponentsWithNavBar from './Components/ComponentsWithNavBar.jsx';
import './index.css'

import User from './User/Views/User.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import CreditRequest from './Credit/Views/CreditRequest.jsx'
import Simulation from './Simulation/Views/Simulation.jsx';
import Excecutive from "./User/Views/Executive.jsx";
import RequestTracking from "./RequestTracking/Views/RequestTracking.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ComponentsWithNavBar>
        <User />
      </ComponentsWithNavBar>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/simulation",
    element: (
      <ComponentsWithNavBar>
        <Simulation />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/creditRequest",
    element: (
      <ComponentsWithNavBar>
        <CreditRequest />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/excecutive",
    element: (
      <ComponentsWithNavBar>
        <Excecutive />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/requestTracking",
    element: (
      <ComponentsWithNavBar>
        <RequestTracking />
      </ComponentsWithNavBar >
    ),
    errorElement: <ErrorPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
