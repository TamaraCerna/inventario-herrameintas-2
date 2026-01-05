import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/keycloak";

import ComponentsWithNavBar from "./Components/ComponentsWithNavBar.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";

import UserDashboard from "./User/Views/UserDashboard.jsx";
import AdminDashboard from "./User/Views/AdminDashboard.jsx";
import ToolView from "./Tool/Views/ToolView.jsx";

import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import "./index.css";

/* -------------------- ROUTER -------------------- */
const router = createHashRouter([
    {
        path: "/",
        element: (
            <ComponentsWithNavBar>
                <ProtectedRoute roles={["USER", "ADMIN"]}>
                    <UserDashboard />
                </ProtectedRoute>
            </ComponentsWithNavBar>
        ),
        errorElement: <ErrorPage />,
    },

    {
        path: "/user",
        element: (
            <ComponentsWithNavBar>
                <ProtectedRoute roles={["USER", "ADMIN"]}>
                    <UserDashboard />
                </ProtectedRoute>
            </ComponentsWithNavBar>
        ),
        errorElement: <ErrorPage />,
    },

    {
        path: "/admin",
        element: (
            <ComponentsWithNavBar>
                <ProtectedRoute roles={["ADMIN"]}>
                    <AdminDashboard />
                </ProtectedRoute>
            </ComponentsWithNavBar>
        ),
        errorElement: <ErrorPage />,
    },

    {
        path: "/tools",
        element: (
            <ComponentsWithNavBar>
                <ProtectedRoute roles={["ADMIN"]}>
                    <ToolView />
                </ProtectedRoute>
            </ComponentsWithNavBar>
        ),
        errorElement: <ErrorPage />,
    },

    // fallback
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

/* -------------------- KEYCLOAK HANDLERS -------------------- */
const onKeycloakEvent = (event, error) => {
    if (error) console.error("Keycloak event error:", event, error);
};

const onKeycloakTokens = (tokens) => {
    // console.log("Keycloak tokens updated", tokens);
};

/* -------------------- RENDER -------------------- */
createRoot(document.getElementById("root")).render(
    <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={onKeycloakEvent}
        onTokens={onKeycloakTokens}
        initOptions={{
            onLoad: "check-sso",
            checkLoginIframe: false,
            pkceMethod: "S256",
            redirectUri: window.location.origin + "/#/",
        }}
    >
        <RouterProvider router={router} />
    </ReactKeycloakProvider>
);



