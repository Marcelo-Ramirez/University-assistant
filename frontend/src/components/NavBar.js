import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ className }) => {
    return (
        <div class={`${className} flex h-full justify-around col-span-12 border-gray-200 dark:bg-gray-700 dark:border-gray-600`}>
            {/* Para añadir un nuevo boton solo cambie 'grid-cols-3' , segun sus nesesidades*/}
            <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">

                {/* Boton INICIO */}
                <button type="button" class="inline-flex flex-col items-center justify-center px-16 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    {/* Lo pongo ahi el link para que el svg y el texto sea un link */}
                    <Link to="/">
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
                </button>

                {/* Boton CHAT GLOBAL */}
                <button type="button" class="inline-flex flex-col items-center justify-center px-16 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    {/* Lo pongo ahi el link para que el svg y el texto sea un link */}
                    <Link to="/Lchat">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 dark:text-gray-50 group-hover:text-blue-600 dark:group-hover:text-blue-500" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z" />
                        </svg>
                        <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                            Chat
                        </span>
                    </Link>
                </button>

                {/* Boton LOYOBOT */}
                <button type="button" class="inline-flex flex-col items-center justify-center px-16 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    {/* Lo pongo ahi el link para que el svg y el texto sea un link */}
                    <Link to="/bot">
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
                </button>
                    {/*<button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <svg class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
            </button>*/}
            </div>
        </div>

        /*
        <div className={`${className} flex h-full justify-around col-span-12 lg:col-span-8 border-gray-200 bg-slate-700 shadow-lg`}>
          <div className="flex flex-col items-center justify-center text-gray-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <div className="text-sm">Inicio</div>
          </div>
          <div className="flex flex-col items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z"/>
            </svg>
        
        
            <div className="text-sm">Chat</div>
          </div>
          <div className="flex flex-col items-center justify-center text-gray-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24"
              className="h-7 w-7">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" color="currentColor">
                    <path d="M4 15.5a2 2 0 1 1 0-4m16 4a2 2 0 1 0 0-4M7 7V4m10 3V4"/>
                    <circle cx="7" cy="3" r="1"/>
                    <circle cx="17" cy="3" r="1"/>
                    <path d="M13.5 7h-3c-2.828 0-4.243 0-5.121.909S4.5 10.281 4.5 13.207s0 4.389.879 5.298c.878.909 2.293.909 5.121.909h1.025c.792 0 1.071.163 1.617.757c.603.657 1.537 1.534 2.382 1.738c1.201.29 1.336-.111 1.068-1.256c-.076-.326-.267-.847-.066-1.151c.113-.17.3-.212.675-.296c.591-.132 1.079-.348 1.42-.701c.879-.91.879-2.372.879-5.298s0-4.389-.879-5.298C17.743 7 16.328 7 13.5 7"/>
                    <path d="M9.5 15c.57.607 1.478 1 2.5 1s1.93-.393 2.5-1m-5.491-4H9m6.009 0H15"/>
                </g>
            </svg>
            <div className="text-sm">Bot</div>
          </div>
        </div>
        
         */
    );
}

export default NavBar;
