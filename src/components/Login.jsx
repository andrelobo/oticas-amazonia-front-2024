// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://zoe-be.onrender.com/api/users/login', { email, password });
            console.log('Resposta da API:', response.data);

            // Verifique se a resposta contém o accessToken
            if (response.data.accessToken) {
                const { accessToken } = response.data;

                // Salve o token no localStorage
                localStorage.setItem('token', accessToken);
                console.log('Token armazenado no localStorage:', localStorage.getItem('token'));

                // Redirecione o usuário para a página desejada após o login
                navigate('/client-list');
            } else {
                console.error('accessToken não recebido na resposta:', response.data);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-pastel-pink">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
