export default function ToolList({ tools, onDelete, isAdmin = true }) {
    if (!tools?.length) return <p>No hay herramientas.</p>;

    return (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Valor</th>
                <th>StockId</th>
                {isAdmin && <th>Acciones</th>}
            </tr>
            </thead>
            <tbody>
            {tools.map((t) => (
                <tr key={t.idTool}>
                    <td>{t.idTool}</td>
                    <td>{t.nameTool}</td>
                    <td>{t.categoryTool}</td>
                    <td>{t.initialStateTool}</td>
                    <td>${t.replacementValueTool}</td>
                    <td>{t.stockToolId}</td>
                    {isAdmin && (
                        <td>
                            <button onClick={() => onDelete(t.idTool)}>Eliminar</button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
