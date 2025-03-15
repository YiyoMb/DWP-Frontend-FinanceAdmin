import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
    const navigate = useNavigate(); // Hook para redirección
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita la recarga de la página

        // Simulación de autenticación (debes reemplazar esto con una llamada real al backend)
        if (email === "admin@example.com" && password === "123456") {
            navigate("/dashboard"); // Redirige al Dashboard si las credenciales son correctas
        } else {
            alert("Correo o contraseña incorrectos"); // Muestra una alerta en caso de error
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-background text-primary font-sora">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="tucorreo@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-primary text-background font-semibold hover:opacity-90 transition"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Enlace a registro */}
                <p className="mt-4 text-center text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-primary font-semibold hover:underline">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
