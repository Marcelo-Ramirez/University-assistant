import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';

const Layout = () => {
    return (
        <div className='grid grid-cols-12 grid-rows-10 h-screen '>
            <div>
                <Header />
            </div>
            <div className="col-span-12 row-span-8 overflow-y-auto ">
                <Outlet />
            </div>
            <div>
                <NavBar />
            </div>
        </div>
    );
}

export default Layout;
