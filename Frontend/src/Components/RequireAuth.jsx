import { useKeycloak } from "@react-keycloak/web";

export default function RequireAuth({ children }) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <div className="p-6">Cargando sesión…</div>;

    if (!keycloak.authenticated) {
        keycloak.login({ redirectUri: window.location.origin + "/#/" });
        return null;
    }

    return children;
}

