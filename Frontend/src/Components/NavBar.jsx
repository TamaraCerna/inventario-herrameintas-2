import { Link, NavLink } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

export default function NavBar() {
    const { keycloak, initialized } = useKeycloak();

    const linkClass =
        "text-white text-lg font-semibold hover:text-gray-300 transition duration-300";

    const dropdownItem =
        "block w-full px-4 py-2 text-gray-800 hover:bg-gray-100";

    const roles = keycloak?.tokenParsed?.realm_access?.roles ?? [];
    const isAdmin = roles.includes("ADMIN");

    return (
        <nav className="bg-indigo-600 py-4 shadow-md mb-6">
            <div className="container mx-auto flex justify-center space-x-8 items-center">

                <Link to={keycloak?.authenticated ? "/dashboard" : "/"} className={linkClass}>
                    Inicio
                </Link>

                <Link to="/users/register" className={linkClass}>
                    Registrar Usuario
                </Link>

                {isAdmin && (
                    <Link to="/dashboard" className={linkClass}>
                        Admin
                    </Link>
                )}


                <Link to="/simulation" className={linkClass}>
                    Simulación
                </Link>

                {/* Dropdown Herramientas */}
                <div className="relative group">
                    <NavLink to="/tools" className={linkClass}>
                        Herramientas
                    </NavLink>

                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-[9999]">
                        <div className="bg-white rounded-md shadow-lg min-w-[200px] overflow-hidden">
                            <NavLink to="/tools/new" className={dropdownItem}>
                                Nueva herramienta
                            </NavLink>
                            <NavLink to="/tools/delete" className={dropdownItem}>
                                Eliminar herramienta
                            </NavLink>
                        </div>
                    </div>
                </div>

                <Link to="/requestTracking" className={linkClass}>
                    Seguimiento
                </Link>

                {/* Auth (Keycloak) */}
                <div className="flex items-center space-x-3 ml-4">
                    {initialized && keycloak?.authenticated ? (
                        <>
              <span className="text-white text-sm hidden sm:block">
                {keycloak.tokenParsed?.preferred_username}
              </span>
                            <button
                                className="bg-white/15 text-white px-3 py-1 rounded hover:bg-white/25 transition"
                                onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-white/15 text-white px-3 py-1 rounded hover:bg-white/25 transition"
                            onClick={() => keycloak.login()}
                        >
                            Login
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}



