import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { assignRole } from "../Services/UserServices";


export default function UserAssignRoleView() {
    const { keycloak } = useKeycloak();

    const [id, setId] = useState("");
    const [role, setRole] = useState("USER");

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const numericId = Number(id);
        if (!Number.isInteger(numericId) || numericId <= 0) {
            setError("ID inválido");
            return;
        }

        try {
            setError("");
            setMsg("");

            await assignRole(keycloak, { id: numericId, role });

            setMsg("✅ Rol asignado correctamente");
            setId("");
            setRole("USER");
        } catch (err) {
            setError(err?.message || "Error asignando rol");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">Asignar Rol</h2>

            {msg && <p className="text-green-600 mb-2">{msg}</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    className="border p-2 rounded w-full"
                    type="number"
                    placeholder="ID Usuario"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    min={1}
                    required
                />

                <select
                    className="border p-2 rounded w-full"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 w-full">
                    Asignar Rol
                </button>
            </form>

            <p className="text-sm text-gray-500 mt-3">
                * Requiere usuario con rol ADMIN (si no → 403).
            </p>
        </div>
    );
}
