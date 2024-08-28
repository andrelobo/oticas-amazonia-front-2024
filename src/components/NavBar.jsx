import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                <div className="font-greatvibes text-4xl text-pink-500">Zoe Fashion Store</div>
                </div>
                <div className="hidden md:flex space-x-4 text-white">
                    <Link to="/login" className="hover:text-gray-400">Login</Link>
                    <Link to="/register-user" className="hover:text-gray-400">Registro de Usuário</Link>
                    <Link to="/register-client" className="hover:text-gray-400">Registro de clientes</Link>
                    <Link to="/register-purchase" className="hover:text-gray-400">Registro de Compras</Link>
                    <Link to="/client-list" className="hover:text-gray-400">Lista de Clientes</Link>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-gray-800 text-white">
                    <div className="flex flex-col space-y-2 p-4">
                        <Link to="/login" className="hover:text-gray-400" onClick={toggleMenu}>Login</Link>
                        <Link to="/register-user" className="hover:text-gray-400" onClick={toggleMenu}>Registro de Usuário</Link>
                        <Link to="/register-client" className="hover:text-gray-400" onClick={toggleMenu}>Registro de clientes</Link>
                        <Link to="/register-purchase" className="hover:text-gray-400" onClick={toggleMenu}>Registro de Compras</Link>
                        <Link to="/client-list" className="hover:text-gray-400" onClick={toggleMenu}>Client List</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
