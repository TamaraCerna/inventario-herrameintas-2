import { useKeycloak } from "@react-keycloak/web";
import { getRealmRoles } from "../../auth/auth";

export default function UserDashboard() {
    const { keycloak } = useKeycloak();
    const roles = getRealmRoles(keycloak);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold mb-2">Panel Usuario</h1>
                <p className="text-gray-600">
                    Bienvenido/a, <span className="font-semibold">{keycloak.tokenParsed?.preferred_username}</span>
                </p>

                <div className="mt-4">
                    <h2 className="font-semibold">Roles:</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {roles.map((r) => (
                            <span key={r} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                {r}
              </span>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        className="px-4 py-2 rounded bg-indigo-600 text-white hover:opacity-90"
                        onClick={() => keycloak.accountManagement()}
                    >
                        Mi cuenta
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
