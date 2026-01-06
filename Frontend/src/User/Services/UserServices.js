import { authFetch } from "../../api/http";

const BASE_URL = "http://localhost:8080/users";

/**
 * RF7.1 - POST /users/register (acceso libre)
 * @RequestParam name, email, password => x-www-form-urlencoded
 * ✅ NO usa authFetch (es público)
 */
export async function registerUser(_keycloak, { name, email, password }) {
  const params = new URLSearchParams();
  params.append("name", name);
  params.append("email", email);
  params.append("password", password);

  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Error al registrar usuario");
  }

  return res.json();
}

/**
 * RF7.2 - PUT /users/{id}/role (solo ADMIN)
 * @RequestParam role (enum Roler)
 * ✅ Usa authFetch (protegido)
 */
export async function assignRole(keycloak, { id, role }) {
  const params = new URLSearchParams();
  params.append("role", role);

  const res = await authFetch(keycloak, `${BASE_URL}/${id}/role`, {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(txt || "Error al asignar rol");
  }

  return res.text();
}

