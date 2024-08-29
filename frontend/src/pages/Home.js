import React, { useState } from "react";



const CircularRadiusExam = ({ startDate, dateExam, fechaActual }) => {

    //const startDate = "2024-09-16"; 
    //const dateExam = "2024-10-30"; // fecha final

    // Convertir fechas a objetos Date
    const start = new Date(startDate);
    const end = new Date(dateExam);
    const now = new Date(fechaActual);

    // Calcular el porcentaje de progreso basado en las fechas
    const totalDuration = end - start; // Duración total entre inicio y final
    const currentDuration = now - start; // Duración desde el inicio hasta ahora
    const percentage = Math.min(
        Math.max((currentDuration / totalDuration) * 100, 0),
        100
    ); // Limitar el porcentaje entre 0 y 100
    // Calcular el color progresivo entre verde y rojo
    const getColor = (percentage) => {
        if (percentage >= 100) return '#10B981'; // Verde (final)
        if (percentage === 0) return '#10B981'; // Verde (inicio)
        // Interpolación de color de verde a rojo
        const red = Math.min(255, Math.floor(255 * (percentage / 100)));
        const green = Math.min(255, Math.floor(255 * (1 - percentage / 100)));
        return `rgb(${red}, ${green}, 0)`;
    };

    // Calcular el valor de 'stroke-dashoffset' basado en el porcentaje.
    const circleRadius = 16;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset =
        circleCircumference - (circleCircumference * percentage) / 100;
    // Calcular los días pasados desde la fecha final
    const daysPastEndDate = Math.ceil((now - end) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
    // Determinar el texto del centro
    const centerText =
        daysPastEndDate > 2 ? 'Sin fecha de examen' :
            percentage >= 100 ? 'Días de examen' :
                daysRemaining === 1 ? 'Falta 1 día' :
                    `Faltan ${daysRemaining} días`;
    // Determinar el color del progreso
    const progressColor = daysPastEndDate > 2 ? 'text-gray-500 dark:text-neutral-700' : getColor(percentage); // Gris neutro para 'Sin fecha de examen'



    return (
        <div className="relative w-40 h-40">
            <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Círculo de fondo */}
                <circle
                    cx="18"
                    cy="18"
                    r={circleRadius}
                    fill="none"
                    className="stroke-current text-gray-200 dark:text-neutral-700"
                    strokeWidth="2"
                />
                {/* Círculo de progreso */}
                <circle
                    cx="18"
                    cy="18"
                    r={circleRadius}
                    fill="none"
                    stroke={progressColor}
                    strokeWidth="2"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            {/* Texto de días restantes o "Sin fecha de examen" */}
            <div className="absolute top-1/2 left-1/2 text-center transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-xl font-bold text-blue-600 dark:text-blue-600">
                    {centerText}
                </span>
            </div>
        </div>
    );
}

const Home = () => {

    const [inputValue, setInputValue] = useState('');

    const questions = [
        '¿Cuáles son los requisitos de admisión?',
        '¿Cuáles son los costos de matrícula?',
        '¿Qué becas están disponibles?',
        '¿Cómo puedo contactar al soporte técnico?',
    ];

    const handleButtonClick = (question) => {
        setInputValue(question);
    };


    return (
        // Para la responsividad estamos usando margenes izquierdo y derecho
        <div className="col-span-12 row-span-10 mx-0 md:mx-[5rem] lg:mx-[12rem]">
            <CircularRadiusExam startDate={'2023-05-01'} dateExam={'2024-06-10'} fechaActual={'2024-05-09'} />

            <div class="container mx-auto">

                <div className="container mx-auto px-8 md:px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                        {/* Aqui se renderizan las consultas que vienen del servidor*/}
                        {questions.map((question, index) => (
                            <button
                                key={index}
                                /* Aqui se dan estilos a las consultas*/
                                className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex items-center justify-center p-4 text-center text-gray-900 hover:bg-gray-100 hover:text-blue-600"
                                onClick={() => handleButtonClick(question)}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            value={inputValue}
                            readOnly
                            className="border border-gray-300 rounded-lg p-4 mb-4 w-full max-w-md text-gray-900"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;