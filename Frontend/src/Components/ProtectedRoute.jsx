import { useKeycloak } from "@react-keycloak/web";
import { hasRole } from "../auth/auth";

export default function ProtectedRoute({ roles, children }) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div className="p-6">Cargando autenticación...</div>;
    }

    if (!keycloak.authenticated) {
        // Con onLoad: "login-required", normalmente no llegarás aquí,
        // pero por seguridad:
        return (
            <div className="p-6">
                <p>No autenticado. Redirigiendo a login...</p>
                <button
                    className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white"
                    onClick={() => keycloak.login()}
                >
                    Ir a login
                </button>
            </div>
        );
    }

    if (roles?.length) {
        const allowed = roles.some((r) => hasRole(keycloak, r));
        if (!allowed) {
            return (
                <div className="p-6">
                    <h2 className="text-xl font-semibold">Acceso denegado</h2>
                    <p className="mt-2">No tienes permisos para ver esta vista.</p>
                </div>
            );
        }
    }

    return children;
}
