import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterClient = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const getToken = () => {
        // Obtém o token do localStorage
        return localStorage.getItem('token');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            if (!token) {
                throw new Error('Token de autenticação não encontrado.');
            }

            const response = await axios.post(
                'https://oticaamazoniabackend.vercel.app/api/clients',
                { name, email, phone },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluindo o token de autenticação no cabeçalho
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data);

            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: 'Cliente registrado com sucesso!',
                text: 'Os dados foram salvos corretamente.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4CAF50', // Cor personalizada do botão
            });

            // Limpa os campos após o sucesso
            setName('');
            setEmail('');
            setPhone('');

        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Exibe a mensagem de erro com SweetAlert2
            Swal.fire({
                title: 'Erro ao cadastrar',
                text: error.response?.data?.error || 'Ocorreu um erro ao tentar registrar o cliente.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#d957a9', // Cor personalizada do botão
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F0F4F8]">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl mb-4 text-green-600">Cadastro de Cliente</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default RegisterClient;
