export async function authFetch(keycloak, url, options = {}) {
    if (!keycloak) {
        throw new Error("Keycloak no inicializado");
    }

    // Refresca token si expira pronto
    await keycloak.updateToken(30);

    const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
    };

    return fetch(url, {
        ...options,
        headers,
    });
}
