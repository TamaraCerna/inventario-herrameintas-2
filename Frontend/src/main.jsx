import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/keycloak";

import ComponentsWithNavBar from "./Components/ComponentsWithNavBar.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";

import UserDashboard from "./User/Views/UserDashboard.jsx";
import AdminDashboard from "./User/Views/AdminDashboard.jsx";
import ToolView from "./Tool/Views/ToolView.jsx"; // tu vista de herramientas/lista si la tienes
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import "./index.css";

const router = createHashRouter([
    {
        path: "/",
        element: (
            <ComponentsWithNavBar>
                <ProtectedRoute>
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
                <ProtectedRoute roles={["USER", "ADMIN"]}>
                    <ToolView />
                </ProtectedRoute>
            </ComponentsWithNavBar>
        ),
        errorElement: <ErrorPage />,
    },
]);

const onKeycloakEvent = (event, error) => {
    if (error) console.error("Keycloak error:", error);
    // events: onReady, onAuthSuccess, onAuthError, onAuthRefreshSuccess, onAuthRefreshError, onTokenExpired, onAuthLogout
};

const onKeycloakTokens = (tokens) => {
    // tokens.token (access token), tokens.refreshToken, tokens.idToken
    // útil para debug:
    // console.log("tokens updated", tokens);
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ReactKeycloakProvider
            authClient={keycloak}
            onEvent={onKeycloakEvent}
            onTokens={onKeycloakTokens}
            initOptions={{
                onLoad: "login-required", // fuerza login al entrar
                checkLoginIframe: false,  // evita problemas con iframe en local
                pkceMethod: "S256",
            }}
        >
            <RouterProvider router={router} />
        </ReactKeycloakProvider>
    </StrictMode>
);


