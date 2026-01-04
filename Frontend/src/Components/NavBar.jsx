import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-indigo-600 py-4 shadow-md mb-6">
            <div className="container mx-auto flex justify-center space-x-8">
                <Link
                    to="/"
                    className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
                >
                    Registrar Usuario
                </Link>
                <Link
                    to="/simulation"
                    className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
                >
                    Simulación de Crédito
                </Link>
                <Link
                    to="/creditRequest"
                    className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
                >
                    Solicitud de Crédito
                </Link>
                <Link
                    to="/excecutive"
                    className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
                >
                    Ejecutivo
                </Link>
                <Link
                    to="/requestTracking"
                    className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
                >
                    Seguimiento de Solicitudes
                </Link>
            </div>
        </nav>
    );
}