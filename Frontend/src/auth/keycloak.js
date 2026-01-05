import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8081",
    realm: "toolrent",
    clientId: "frontend",
});

export default keycloak;
