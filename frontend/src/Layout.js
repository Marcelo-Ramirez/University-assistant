import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';

const Layout = () => {
    return (
        <div className='grid grid-cols-12 h-screen'>
            <Header />
            <div className='col-span-12 overflow-auto'>
                <Outlet />
            </div>
            <NavBar />
        </div>
    );
}

export default Layout;
