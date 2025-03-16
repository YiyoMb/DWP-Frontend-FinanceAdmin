import React, { useState } from "react";
import Header from "../../layouts/Header";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import GoalForm from "./Components/GoalForm";
import GoalList from "./Components/GoalList";

const Goals = () => {
    const [goals, setGoals] = useState([]);

    const addGoal = (goal) => {
        setGoals([...goals, goal]);
    };

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

            {/* Contenido principal de Goals */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold text-[#17211f]">Metas Financieras</h1>
                <p className="text-[#17211f] mt-2">Define tus objetivos financieros y haz seguimiento.</p>

                {/* Componentes de Goals */}
                <div className="mt-6">
                    <GoalForm addGoal={addGoal} />
                    <GoalList goals={goals} />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Goals;
