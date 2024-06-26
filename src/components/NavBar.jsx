// src/components/NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logorosangela.png'; // Certifique-se de colocar o caminho correto para a imagem

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#d957a9] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo Ro0sângela Fashion Store" className="w-48 h-auto" />
                    
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="text-white">Login</Link>
                    <Link to="/register-user" className="text-white">Registro</Link>
                    <Link to="/register-client" className="text-white">Cadastro de Cliente</Link>
                    <Link to="/register-purchase" className="text-white">Cadastro de Compras</Link>
                    
                    <Link to="/client-list" className="text-white">Lista de Clientes</Link> {/* Novo Link */}
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
                        
                        <Link to="/client-list" className="text-white" onClick={toggleMenu}>Lista de Clientes</Link> {/* Novo Link */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
