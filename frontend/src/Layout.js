import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';


const Layout = () => {
    return (
        <div className='grid grid-cols-12 grid-rows-12 w-full h-full fixed'>
            <Header className={"col-span-12 row-span-1"} />
            <Outlet/>
            <NavBar className={"col-span-12 row-span-1"} />
        </div>
    );
}

export default Layout;