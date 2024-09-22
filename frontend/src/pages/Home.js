import React from "react";
import CircularRadiusExam from "../components/CircularRadiusExam";

const Home = () => {
    
    // Obtiene la fecha actual
    const now = new Date();

    return (
        // con (mx-2 md:mx-10 lg:mx-[10rem]) hacemos la responsividad en modo movil, escritorio y tablet
        <div className="mx-2 md:mx-10 lg:mx-[10rem] col-span-12 row-span-10">
            <CircularRadiusExam startDate={'2024-09-01'} dateExam={'2024-09-30'} fechaActual={now} />
        </div>
    );
}

export default Home;