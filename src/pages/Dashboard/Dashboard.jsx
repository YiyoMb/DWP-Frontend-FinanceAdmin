import React from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f8]">
            {/* Contenedor del Header y Navbar */}
            <div className="w-full bg-[#f5f5f8] py-4 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Nombre de la app */}
                    <h1 className="text-xl font-bold text-[#17211f]">FinanzApp</h1>

                    {/* Navbar centrado ocupando el espacio disponible */}
                    <div className="flex-grow flex justify-center">
                        <Navbar />
                    </div>

                    {/* Botón de cerrar sesión alineado a la derecha */}
                    <Header />
                </div>
            </div>

            {/* Contenido principal del Dashboard */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold text-[#17211f]">Bienvenido al Dashboard</h1>
                <p className="text-[#17211f] mt-2">Aquí puedes gestionar tus finanzas.</p>
                {/* Aquí irán los componentes adicionales del Dashboard */}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Dashboard;
