import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";

export default function RequireRole({ roles = [], children }) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div className="p-6">Cargando sesión…</div>;
    }

    if (!keycloak?.authenticated) {
        keycloak.login();
        return null;
    }

    // Si no pasas roles, solo exige estar logueada
    if (!roles.length) return children;

    const hasAnyRole = roles.some((r) => keycloak.hasRealmRole?.(r));

    if (!hasAnyRole) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return children;
}

