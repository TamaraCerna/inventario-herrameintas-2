export function getRealmRoles(keycloak) {
    return keycloak?.tokenParsed?.realm_access?.roles ?? [];
}

export function hasRole(keycloak, role) {
    return getRealmRoles(keycloak).includes(role);
}

export function isAuthenticated(keycloak) {
    return !!keycloak?.authenticated;
}

