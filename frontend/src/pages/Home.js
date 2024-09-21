import React from "react";
import CircularRadiusExam from "../components/CircularRadiusExam";

const Home = () => {
    
    // Obtiene la fecha actual
    const now = new Date();

    return (
        <div className="col-span-12 row-span-10">
            <CircularRadiusExam startDate={'2024-09-01'} dateExam={'2024-09-30'} fechaActual={now} />
        </div>
    );
}

export default Home;