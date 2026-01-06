import { authFetch } from "../../api/http"; // ajusta la ruta si tu carpeta cambia

const BASE_URL = "http://localhost:8080/tools";

// ✅ GET /tools
export async function getAllTools(keycloak) {
  const res = await authFetch(keycloak, BASE_URL);
  if (!res.ok) throw new Error("Error al obtener herramientas");
  return res.json();
}

// ✅ POST /tools/register  (form urlencoded)
export async function registerTool(keycloak, { nameTool, categoryTool, replacementValueTool, userId }) {
  const params = new URLSearchParams();
  params.append("nameTool", nameTool);
  params.append("categoryTool", categoryTool);
  params.append("replacementValueTool", String(replacementValueTool));
  params.append("userId", String(userId));

  const res = await authFetch(keycloak, `${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) throw new Error("Error al registrar herramienta");
  return res.json();
}

// ✅ DELETE /tools/{id}
export async function deleteTool(keycloak, id) {
  const res = await authFetch(keycloak, `${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar herramienta");
}


