import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://oticaamazoniabackend.vercel.app/api/users/', { username, email, password });
            console.log(response.data);

            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: 'Usuário registrado com sucesso!',
                text: 'Um e-mail de confirmação foi enviado.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4CAF50', // Cor personalizada do botão
            });
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Exibe a mensagem de erro com SweetAlert2
            Swal.fire({
                title: 'Erro ao cadastrar',
                text: error.response?.data?.error || 'Ocorreu um erro ao tentar registrar o usuário.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#d957a9', // Cor personalizada do botão
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F0F4F8]">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl mb-4 text-green-600">Cadastro de Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-500 transition-colors duration-200"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;
