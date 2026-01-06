import { Routes, Route, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import ToolsView from "./Tool/Views/ToolView";
import AdminDashboard from "./User/Views/AdminDashboard";
import UserDashboard from "./User/Views/UserDashboard";
import UserRegisterView from "./User/Views/UserRegisterView";
import UserAssignRoleView from "./User/Views/UserAssignRoleView";

// --- Guards ---
function RequireAuth({ children }) {
    const { keycloak } = useKeycloak();
    if (!keycloak?.authenticated) return <Navigate to="/" replace />;
    return children;
}

function RequireRole({ role, children }) {
    const { keycloak } = useKeycloak();
    if (!keycloak?.authenticated) return <Navigate to="/" replace />;
    if (!keycloak.hasRealmRole?.(role)) return <Navigate to="/no-autorizado" replace />;
    return children;
}

function DashboardRouter() {
    const { keycloak } = useKeycloak();
    if (!keycloak?.authenticated) return null;
    return keycloak.hasRealmRole("ADMIN") ? <AdminDashboard /> : <UserDashboard />;
}

function Home() {
    const { keycloak } = useKeycloak();
    if (keycloak?.authenticated) return <Navigate to="/dashboard" replace />;

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold">ToolRent</h1>
                <p className="text-gray-600 mt-2">
                    Inicia sesión con Keycloak para acceder al sistema.
                </p>
                <button
                    className="mt-4 w-full px-4 py-2 rounded bg-indigo-600 text-white hover:opacity-90"
                    onClick={() => keycloak.login()}
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}

function NoAutorizado() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-xl shadow p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold">No autorizado</h1>
                <p className="text-gray-600 mt-2">No tienes permisos para ver esta sección.</p>
                <a className="mt-4 inline-block text-indigo-600 font-semibold" href="/dashboard">
                    Volver al dashboard
                </a>
            </div>
        </div>
    );
}

function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-600">Cargando sesión…</p>
        </div>
    );
}

export default function App() {
    const { initialized } = useKeycloak();
    if (!initialized) return <Loading />;

    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route
                path="/dashboard"
                element={
                    <RequireAuth>
                        <DashboardRouter />
                    </RequireAuth>
                }
            />

            <Route
                path="/tools"
                element={
                    <RequireRole role="ADMIN">
                        <ToolsView />
                    </RequireRole>
                }
            />

            <Route
                path="/users/register"
                element={
                    <RequireAuth>
                        <UserRegisterView />
                    </RequireAuth>
                }
            />

            <Route
                path="/users/role"
                element={
                    <RequireRole role="ADMIN">
                        <UserAssignRoleView />
                    </RequireRole>
                }
            />

            <Route path="/no-autorizado" element={<NoAutorizado />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
