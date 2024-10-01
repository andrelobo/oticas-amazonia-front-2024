import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Função para exibir mensagens de alerta
    const showAlert = (icon, title, text, timer = 2000) => {
        Swal.fire({
            icon,
            title,
            text,
            timer,
            showConfirmButton: false,
        });
    };

    // Função para salvar o token no localStorage
    const saveToken = (token) => {
        localStorage.setItem('token', token);
    };

    // Função para processar o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://oticaamazoniabackend.vercel.app/api/users/login', { email, password });
            console.log('API Response:', response.data);

            if (response.data.accessToken) {
                saveToken(response.data.accessToken);

                // Exibir sucesso e redirecionar
                showAlert('success', 'Sucesso ao Logar!', 'Você foi autenticado com sucesso.');
                navigate('/client-list');
            } else {
                showAlert('error', 'Erro no Login', 'Token de acesso não recebido.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Um erro ocorreu durante o login';
            showAlert('error', 'Erro no Login', errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F0F4F8] text-gray-800">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-green-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
