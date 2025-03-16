import React from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import EducationContent from "./Components/EducationContent";
import InvestmentCalculator from "./Components/InvestmentCalculator";
import TrainResources from "./Components/TrainResources";

const Train = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f8]">
            {/* Header y Navbar */}
            <div className="flex items-center bg-[#f5f5f8] py-8 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Header />
                    <div className="flex-grow flex justify-center">
                        <Navbar />
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold text-[#17211f] mb-4">Educación Financiera</h1>
                <p className="text-[#17211f] mb-8">
                    Aprende a manejar tu dinero de manera inteligente y a tomar mejores decisiones financieras.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Sección de Educación Financiera */}
                    <EducationContent />

                    {/* Calculadora de Inversiones */}
                    <InvestmentCalculator />

                    {/* Recursos Externos */}
                    <TrainResources />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Train;
