import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/keycloak";
import App from "./App";
import ComponentsWithNavBar from "./Components/ComponentsWithNavBar.jsx";
import "./index.css"; // ✅ IMPORTANTE

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak}>
            <BrowserRouter>
                <ComponentsWithNavBar>
                    <App />
                </ComponentsWithNavBar>
            </BrowserRouter>
        </ReactKeycloakProvider>
    </React.StrictMode>
);
