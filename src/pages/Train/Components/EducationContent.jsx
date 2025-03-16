import React from "react";

const EducationContent = () => {
    const articles = [
        { title: "¿Qué es la Educación Financiera?", description: "Aprende los conceptos básicos sobre cómo manejar tu dinero de manera inteligente." },
        { title: "Cómo hacer un presupuesto", description: "Descubre cómo planificar tus ingresos y gastos para evitar problemas financieros." },
        { title: "Invertir para principiantes", description: "Una guía básica sobre cómo empezar a invertir y hacer crecer tu dinero." },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Educación Financiera</h2>
            <ul className="divide-y divide-gray-200">
                {articles.map((article, index) => (
                    <li key={index} className="py-2">
                        <h3 className="text-lg font-semibold text-blue-600">{article.title}</h3>
                        <p className="text-gray-600">{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducationContent;
