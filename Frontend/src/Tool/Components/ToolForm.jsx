import { useState } from "react";

export default function ToolForm({ onCreate }) {
    const [form, setForm] = useState({
        nameTool: "",
        categoryTool: "Martillo", // ajusta a tus enums reales
        replacementValueTool: 0,
        userId: 1, // luego lo sacas del usuario logeado
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "replacementValueTool" || name === "userId" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onCreate(form);
        setForm((prev) => ({ ...prev, nameTool: "", replacementValueTool: 0 }));
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input
                name="nameTool"
                placeholder="Nombre herramienta"
                value={form.nameTool}
                onChange={handleChange}
                required
            />

            <select name="categoryTool" value={form.categoryTool} onChange={handleChange}>
                <option value="Martillo">Martillo</option>
                <option value="Destornillador">Destornillador</option>
                <option value="Taladro">Taladro</option>
                <option value="Alicate">Alicate</option>
                <option value="Cincel">Cincel</option>
                <option value="Serrucho">Serrucho</option>
            </select>

            <input
                type="number"
                name="replacementValueTool"
                placeholder="Valor reposición"
                value={form.replacementValueTool}
                onChange={handleChange}
                min={0}
                required
            />

            <input
                type="number"
                name="userId"
                placeholder="userId"
                value={form.userId}
                onChange={handleChange}
                min={1}
                required
            />

            <button type="submit">Registrar</button>
        </form>
    );
}
