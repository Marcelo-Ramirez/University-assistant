import React from "react";
import CircularRadiusExam from "../components/CircularRadiusExam";

const Home = () => {
    
    return (
        <div className='grid grid-cols-12 grid-rows-12 col-span-12 row-span-8'>
            <CircularRadiusExam startDate={'2024-08-01'} dateExam={'2024-08-30'} fechaActual={'2024-08-5'}/>        
        </div>
    );
};

export default Home;
