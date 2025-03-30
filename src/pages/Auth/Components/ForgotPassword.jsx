import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Ocurrió un error. Inténtalo de nuevo.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recuperar Contraseña</h2>

            {message && <p className="text-green-500 mb-2">{message}</p>}
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 mt-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar enlace"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
