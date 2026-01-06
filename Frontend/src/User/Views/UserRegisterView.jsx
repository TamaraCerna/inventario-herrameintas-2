import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { registerUser } from "../Services/UserServices";

export default function UserRegisterView() {
    const { keycloak } = useKeycloak();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setMsg("");

            await registerUser(keycloak, form);

            setMsg("✅ Usuario registrado correctamente");
            setForm({ name: "", email: "", password: "" });
        } catch (err) {
            setError(err?.message || "Error registrando usuario");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Registrar Usuario</h2>

            {msg && <p className="text-green-600 mb-2">{msg}</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    className="border p-2 rounded w-full"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    className="border p-2 rounded w-full"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    className="border p-2 rounded w-full"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 w-full"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}



