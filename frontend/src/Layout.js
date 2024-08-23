import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';

const Layout = () => {
    return (
        <div className='grid grid-cols-12 grid-rows-10 w-full h-full fixed'>
            <Header className={"col-span-12"} />
            <Outlet className={"col-span-12"} />
            <NavBar className={"col-span-12"} />
        </div>
    );
}

export default Layout;