// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importando o SweetAlert2

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://zoe-be.onrender.com/api/users/login', { email, password });
            console.log('Resposta da API:', response.data);

            if (response.data.accessToken) {
                const { accessToken } = response.data;
                localStorage.setItem('token', accessToken);
                console.log('Token armazenado no localStorage:', localStorage.getItem('token'));

                // Exibe uma notificação de sucesso
                Swal.fire({
                    icon: 'success',
                    title: 'Login bem-sucedido!',
                    text: 'Você foi autenticado com sucesso.',
                    timer: 2000,
                    showConfirmButton: false,
                });

                navigate('/client-list');
            } else {
                console.error('accessToken não recebido na resposta:', response.data);

                // Exibe uma notificação de erro
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao fazer login',
                    text: 'O token de acesso não foi recebido.',
                });
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);

            // Exibe uma notificação de erro
            Swal.fire({
                icon: 'error',
                title: 'Erro ao fazer login',
                text: 'Verifique suas credenciais e tente novamente.',
            });
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
