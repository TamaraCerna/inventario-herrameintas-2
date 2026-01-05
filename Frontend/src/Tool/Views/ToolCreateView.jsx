import { useState } from "react";
import { registerTool } from "../Services/ToolService.js";

export default function ToolCreateView() {
    const [form, setForm] = useState({
        nameTool: "",
        categoryTool: "Martillo",
        replacementValueTool: "",
        userId: 1,
    });

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "replacementValueTool" || name === "userId"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setMsg("");
            await registerTool(form);
            setMsg("✅ Herramienta registrada correctamente");
            setForm({
                nameTool: "",
                categoryTool: "Martillo",
                replacementValueTool: "",
                userId: 1,
            });
        } catch (err) {
            setError("Error al registrar herramienta");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Nueva herramienta</h3>

            {msg && <p className="text-green-600 mb-4">{msg}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la herramienta
                    </label>
                    <input
                        type="text"
                        name="nameTool"
                        value={form.nameTool}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        placeholder="Ej: Martillo Stanley"
                        required
                    />
                </div>

                {/* Categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <select
                        name="categoryTool"
                        value={form.categoryTool}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="Martillo">Martillo</option>
                        <option value="Destornillador">Destornillador</option>
                        <option value="Taladro">Taladro</option>
                        <option value="Alicate">Alicate</option>
                        <option value="Serrucho">Serrucho</option>
                        <option value="Cincel">Cincel</option>
                    </select>
                </div>

                {/* Valor reposición */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor de reposición
                    </label>
                    <input
                        type="number"
                        name="replacementValueTool"
                        value={form.replacementValueTool}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        placeholder="Ej: 12000"
                        min={0}
                        required
                    />
                </div>

                {/* Usuario */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Usuario
                    </label>
                    <input
                        type="number"
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        min={1}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}

