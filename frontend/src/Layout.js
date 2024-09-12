import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ProvidersContext from './context/ProvidersContext';

const useDisableScrollOnMobile = () => {
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);

    if (isMobile) {
      // Bloquear scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Restaurar scroll
      document.body.style.overflow = '';
    };
  }, []);
};

const Layout = () => {
  useDisableScrollOnMobile();

  return (
    <div className='grid grid-cols-12 grid-rows-10 w-full h-full fixed overflow-hidden'>
      <ProvidersContext>
        <Header className={"col-span-12 row-span-1"} />
        <Outlet />
        <NavBar className={"col-span-12 row-span-1"} />
      </ProvidersContext>
    </div>
  );
};

export default Layout;
