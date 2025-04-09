import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MFASetup() {
    const navigate = useNavigate();
    const [qrCode, setQrCode] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [setupComplete, setSetupComplete] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: "", message: "" });

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: "", message: "" });
        }, 5000);
    };

    useEffect(() => {
        const fetchQRCode = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/enable-mfa`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setQrCode(data.qrCode);
                } else {
                    showNotification("error", data.message || "Error al generar el código QR");
                }
            } catch (error) {
                console.error("Error al configurar MFA:", error);
                showNotification("error", "Error de conexión. Por favor, inténtalo de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchQRCode();
    }, [navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify-setup-mfa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ token: verificationCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setSetupComplete(true);
                showNotification("success", "Verificación exitosa. MFA activado correctamente.");
                setTimeout(() => navigate("/dashboard"), 2000);
            } else {
                showNotification("error", data.message || "Código de verificación inválido");
            }
        } catch (error) {
            console.error("Error en la verificación:", error);
            showNotification("error", "Error de conexión. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-primary font-sora">
            <div className="w-full max-w-md">
                {/* Notificación */}
                {notification.show && (
                    <div
                        className={`mb-4 p-4 rounded-md flex items-center justify-between
                        ${notification.type === "error" ? "bg-red-50 text-red-700 border border-red-200" :
                            notification.type === "success" ? "bg-green-50 text-green-700 border border-green-200" :
                                "bg-blue-50 text-blue-700 border border-blue-200"}`}
                    >
                        <div className="flex items-center">
                            {notification.type === "error" && (
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {notification.type === "success" && (
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            <span>{notification.message}</span>
                        </div>
                        <button
                            onClick={() => setNotification({ show: false, type: "", message: "" })}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Contenedor del formulario */}
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Configuración de autenticación de dos factores</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Escanea el código QR con tu aplicación de autenticación
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center my-8">
                            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : (
                        <>
                            {qrCode && !setupComplete && (
                                <div className="mb-6">
                                    <div className="flex justify-center mb-4">
                                        <img src={qrCode} alt="QR Code para MFA" className="border border-gray-200 rounded-lg" />
                                    </div>
                                    <div className="text-center text-sm text-gray-600 mb-4">
                                        <p>1. Descarga Google Authenticator o similar</p>
                                        <p>2. Escanea el código QR</p>
                                        <p>3. Ingresa el código de 6 dígitos generado</p>
                                    </div>

                                    <form className="space-y-6" onSubmit={handleVerify}>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Código de verificación</label>
                                            <input
                                                type="text"
                                                value={verificationCode}
                                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150"
                                                placeholder="123456"
                                                required
                                                autoComplete="off"
                                                inputMode="numeric"
                                                maxLength={6}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading || verificationCode.length !== 6}
                                            className={`w-full flex justify-center py-3 px-4 rounded-lg text-white font-medium transition duration-150
                                            ${(isLoading || verificationCode.length !== 6) ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Verificando...
                                                </>
                                            ) : (
                                                "Verificar y activar"
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {setupComplete && (
                                <div className="text-center py-4">
                                    <svg className="h-16 w-16 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <h3 className="text-xl font-medium text-gray-900">Configuración completa</h3>
                                    <p className="text-gray-600 mt-2">
                                        La autenticación de dos factores ha sido activada con éxito.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}