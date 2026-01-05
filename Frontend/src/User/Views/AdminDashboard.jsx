import { useKeycloak } from "@react-keycloak/web";
import { getRealmRoles } from "../../auth/auth";

export default function AdminDashboard() {
    const { keycloak } = useKeycloak();
    const roles = getRealmRoles(keycloak);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold mb-2">Panel Admin</h1>

                <p className="text-gray-600">
                    Sesión: <span className="font-semibold">{keycloak.tokenParsed?.preferred_username}</span>
                </p>

                <div className="mt-4">
                    <h2 className="font-semibold">Roles:</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {roles.map((r) => (
                            <span key={r} className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm">
                {r}
              </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50">
                        <h3 className="font-semibold">Gestión de herramientas</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Crear / eliminar herramientas y administrar inventario.
                        </p>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50">
                        <h3 className="font-semibold">Gestión de usuarios</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Revisar usuarios y roles (Keycloak / microservicio).
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        className="px-4 py-2 rounded bg-indigo-600 text-white hover:opacity-90"
                        onClick={() => keycloak.accountManagement()}
                    >
                        Admin - Cuenta
                    </button>

                    <button
                        className="px-4 py-2 rounded bg-gray-800 text-white hover:opacity-90"
                        onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
