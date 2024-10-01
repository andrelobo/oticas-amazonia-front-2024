import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Ótica Amazônia" width="200" />
                </div>
                <div className="hidden md:flex space-x-4 text-green-900">
                    <Link to="/login" className="hover:text-gray-600">Login</Link>
                    <Link to="/register-user" className="hover:text-gray-600">Registro de Usuário</Link>
                    <Link to="/register-client" className="hover:text-gray-600">Registro de Clientes</Link>
                    <Link to="/register-purchase" className="hover:text-gray-600">Registro de Compras</Link>
                    <Link to="/client-list" className="hover:text-gray-600">Lista de Clientes</Link>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-green-900 focus:outline-none">
                        {isOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white text-green-900 shadow-md">
                    <div className="flex flex-col space-y-2 p-4">
                        <Link to="/login" className="hover:text-gray-600" onClick={toggleMenu}>Login</Link>
                        <Link to="/register-user" className="hover:text-gray-600" onClick={toggleMenu}>Registro de Usuário</Link>
                        <Link to="/register-client" className="hover:text-gray-600" onClick={toggleMenu}>Registro de Clientes</Link>
                        <Link to="/register-purchase" className="hover:text-gray-600" onClick={toggleMenu}>Registro de Compras</Link>
                        <Link to="/client-list" className="hover:text-gray-600" onClick={toggleMenu}>Lista de Clientes</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
