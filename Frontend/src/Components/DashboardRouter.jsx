import { useKeycloak } from "@react-keycloak/web";
import AdminDashboard from "../User/Views/AdminDashboard.jsx";
import UserDashboard from "../User/Views/UserDashboard.jsx";

export default function DashboardRouter() {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <div className="p-6">Cargando sesión…</div>;

    if (!keycloak?.authenticated) return null;

    const isAdmin = keycloak.hasRealmRole?.("ADMIN");
    return isAdmin ? <AdminDashboard /> : <UserDashboard />;
}

