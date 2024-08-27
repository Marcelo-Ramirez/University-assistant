import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { ModalProvider } from './context/ModalContext';


const Layout = () => {
    return (
        <div className='grid grid-cols-12 grid-rows-12 w-full h-full fixed'>
            <ModalProvider>
                <Header className={"col-span-12 row-span-1"} />
                <Outlet />
                <NavBar className={"col-span-12 row-span-1"} />
            </ModalProvider>
        </div>
    );
}

export default Layout;