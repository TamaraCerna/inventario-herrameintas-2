const BASE_URL = "http://localhost:8080/tools";

export async function getAllTools() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener herramientas");
  return res.json();
}

export async function registerTool({ nameTool, categoryTool, replacementValueTool, userId }) {
  const params = new URLSearchParams();
  params.append("nameTool", nameTool);
  params.append("categoryTool", categoryTool);
  params.append("replacementValueTool", String(replacementValueTool));
  params.append("userId", String(userId));

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) throw new Error("Error al registrar herramienta");
  return res.json();
}

export async function deleteTool(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar herramienta");
}

