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
            const response = await axios.post('https://zoe-be.vercel.app/api/users/', { username, email, password });
            console.log(response.data);

            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: 'Usuário registrado com sucesso!',
                text: 'Um e-mail de confirmação foi enviado.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Exibe a mensagem de erro com SweetAlert2
            Swal.fire({
                title: 'Erro ao cadastrar',
                text: error.response.data.error || 'Ocorreu um erro ao tentar registrar o usuário.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente'
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl mb-4 text-white">Cadastro de Usuário</h2>
                <input
                    type="text"
                    placeholder="Nome de Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white placeholder-gray-400"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white placeholder-gray-400"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-700 rounded w-full bg-gray-900 text-white placeholder-gray-400"
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Cadastrar</button>
            </form>
        </div>
    );
};

export default RegisterUser;
