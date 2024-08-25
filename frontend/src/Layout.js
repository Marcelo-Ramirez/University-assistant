import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ProvidersContext from './context/ProvidersContext';


const Layout = () => {
    return (
        <div className='grid grid-cols-12 grid-rows-10 w-full h-full fixed'>
            <ProvidersContext>
            <Header className={"col-span-12 row-span-1"} />
            <Outlet className={"col-span-12 row-span-8"}/>
            <NavBar className={"col-span-12 row-span-1"} />
            </ProvidersContext>
        </div>
    );
}

export default Layout;