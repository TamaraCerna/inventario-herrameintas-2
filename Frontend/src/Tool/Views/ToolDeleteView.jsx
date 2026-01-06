import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { deleteTool } from "../Services/ToolService.js";

export default function ToolDeleteView() {
    const { keycloak } = useKeycloak();

    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();

        const numericId = Number(id);
        if (!Number.isInteger(numericId) || numericId <= 0) {
            setError("ID inválido");
            return;
        }

        try {
            setError("");
            setMsg("");

            // ✅ ahora se pasa keycloak
            await deleteTool(keycloak, numericId);

            setMsg("🗑️ Herramienta eliminada");
            setId("");
        } catch (err) {
            setError(err?.message || "Error eliminando herramienta");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Eliminar herramienta</h3>

            {msg && <p className="text-green-600 mb-2">{msg}</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleDelete} className="flex gap-3 items-center">
                <input
                    className="border p-2 rounded"
                    type="number"
                    placeholder="ID herramienta"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    min={1}
                    required
                />
                <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                    Eliminar
                </button>
            </form>

            <p className="text-sm text-gray-500 mt-3">
                * Si te da 403, es porque el backend requiere rol ADMIN en DELETE.
            </p>
        </div>
    );
}
