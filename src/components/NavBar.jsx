// src/components/NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Zoe Fashion Store</div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="text-white">Login</Link>
                    <Link to="/register-user" className="text-white">Cadastro de Usuário</Link>
                    <Link to="/register-client" className="text-white">Cadastro de Cliente</Link>
                    <Link to="/register-purchase" className="text-white">Cadastro de Compra</Link>
                    <Link to="/clients-inadimplentes" className="text-white">Clientes Inadimplentes</Link>
                    <Link to="/clients-adimplentes" className="text-white">Clientes Adimplentes</Link>
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
                <div className="md:hidden">
                    <div className="flex flex-col space-y-2 p-4">
                        <Link to="/login" className="text-white" onClick={toggleMenu}>Login</Link>
                        <Link to="/register-user" className="text-white" onClick={toggleMenu}>Cadastro de Usuário</Link>
                        <Link to="/register-client" className="text-white" onClick={toggleMenu}>Cadastro de Cliente</Link>
                        <Link to="/register-purchase" className="text-white" onClick={toggleMenu}>Cadastro de Compra</Link>
                        <Link to="/clients-inadimplentes" className="text-white" onClick={toggleMenu}>Clientes Inadimplentes</Link>
                        <Link to="/clients-adimplentes" className="text-white" onClick={toggleMenu}>Clientes Adimplentes</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
