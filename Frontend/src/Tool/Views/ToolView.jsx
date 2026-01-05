import { useEffect, useState } from "react";
import ToolForm from "../Components/ToolForm";
import ToolList from "../Components/ToolList";
import { deleteTool, getAllTools, registerTool } from "../Services/ToolService";

export default function ToolsView() {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTools = async () => {
        try {
            setError("");
            setLoading(true);
            const data = await getAllTools();
            setTools(data);
        } catch (e) {
            setError(e.message || "Error cargando herramientas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTools();
    }, []);

    const handleCreate = async (tool) => {
        await registerTool(tool);
        await loadTools();
    };

    const handleDelete = async (id) => {
        await deleteTool(id);
        await loadTools();
    };

    return (
        <div style={{ padding: 16 }}>
            <h2>Herramientas</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ToolForm onCreate={handleCreate} />

            {loading ? <p>Cargando...</p> : <ToolList tools={tools} onDelete={handleDelete} isAdmin={true} />}
        </div>
    );
}
