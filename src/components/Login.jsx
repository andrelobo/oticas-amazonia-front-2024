import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://zoe-be.vercel.app/api/users/login', { email, password });
            console.log('API Response:', response.data);

            if (response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso ao Logar!',
                    text: 'Você foi autenticado com sucesso.',
                    timer: 2000,
                    showConfirmButton: false,
                });

                navigate('/client-list');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: 'Token de ACESSO NÃO RECEBIDO.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: error.response?.data?.message || 'Um erro ocoreu durante o Login',
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-pink-200 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-pink-500 text-white font-semibold rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
