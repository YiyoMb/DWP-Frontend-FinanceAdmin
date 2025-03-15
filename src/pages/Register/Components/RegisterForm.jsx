import { Link } from "react-router-dom";

export default function RegisterForm() {
    return (
        <div className="flex h-screen items-center justify-center bg-background text-primary font-sora">
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-semibold text-center mb-6">Crear cuenta</h2>

                <form className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium">Nombre completo</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Tu nombre"
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-sm font-medium">Correo electrónico</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="tucorreo@ejemplo.com"
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Confirmación de contraseña */}
                    <div>
                        <label className="block text-sm font-medium">Confirmar contraseña</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Botón de registro */}
                    <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-primary text-background font-semibold hover:opacity-90 transition"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Enlace para volver al login */}
                <p className="mt-4 text-center text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/" className="text-primary font-semibold hover:underline">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
