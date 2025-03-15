import React from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f8]">
            {/* Header y Navbar en la misma fila */}
            <div className="flex items-center bg-[#f5f5f8] py-8 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Header />
                    <div className="flex-grow flex justify-center">
                        <Navbar />
                    </div>
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