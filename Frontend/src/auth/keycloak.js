//src/auth/keycloak.js
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8081",   // <-- URL de tu Keycloak
    realm: "toolrent",              // <-- tu realm
    clientId: "frontend",           // <-- tu client (public)
});

export default keycloak;
