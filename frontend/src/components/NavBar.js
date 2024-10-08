import React from 'react';
import { Link } from "react-router-dom";
import { useDevice } from '../context/DeviceContext';
import { useInputFocus } from '../context/InputFocusContext';

const NavBar = ({ className }) => {
    const { deviceType } = useDevice();
    const { isInputFocused } = useInputFocus();

    return (
        <nav className={`${className} ${deviceType === 'Mobile' && isInputFocused ? 'hidden' : ''} bg-gray-800 text-white`}>
            <ul className="grid grid-cols-3 ">
                <li className="">
                    <Link to="/" className="inline-flex flex-col items-center justify-center px-16 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {/* Lo pongo ahi el link para que el svg y el texto sea un link */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-2 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="h-7 w-7 text-gray-500 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                        <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                            Inicio
                        </span>
                    </Link>
                </li>
                <li className="">
                    <Link to="/chat" className="inline-flex flex-col items-center justify-center px-16 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        {/* Lo pongo ahi el link para que el svg y el texto sea un link */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-500" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z" />
                        </svg>
                        <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                            Chat
                        </span>
                    </Link>
                </li>
                <li className="">
                    <Link to="/bot" className="inline-flex flex-col items-center justify-center px-16 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg class="w-7 h-7 text-gray-500 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" color="currentColor">
                                <path d="M4 15.5a2 2 0 1 1 0-4m16 4a2 2 0 1 0 0-4M7 7V4m10 3V4" />
                                <circle cx="7" cy="3" r="1" />
                                <circle cx="17" cy="3" r="1" />
                                <path d="M13.5 7h-3c-2.828 0-4.243 0-5.121.909S4.5 10.281 4.5 13.207s0 4.389.879 5.298c.878.909 2.293.909 5.121.909h1.025c.792 0 1.071.163 1.617.757c.603.657 1.537 1.534 2.382 1.738c1.201.29 1.336-.111 1.068-1.256c-.076-.326-.267-.847-.066-1.151c.113-.17.3-.212.675-.296c.591-.132 1.079-.348 1.42-.701c.879-.91.879-2.372.879-5.298s0-4.389-.879-5.298C17.743 7 16.328 7 13.5 7" />
                                <path d="M9.5 15c.57.607 1.478 1 2.5 1s1.93-.393 2.5-1m-5.491-4H9m6.009 0H15" />
                            </g>
                        </svg>
                        <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                            Bot
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
