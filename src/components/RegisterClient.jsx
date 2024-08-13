import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterClient = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://zoe-be.onrender.com/api/clients', {
                name,
                email,
                phone
            });
            console.log(response.data);

            // Exibe a mensagem de sucesso com SweetAlert2
            Swal.fire({
                title: 'Cliente registrado com sucesso!',
                text: 'Os dados foram salvos corretamente.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#d957a9' // Cor personalizada do botão
            });
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            // Exibe a mensagem de erro com SweetAlert2
            Swal.fire({
                title: 'Erro ao cadastrar',
                text: error.response?.data?.error || 'Ocorreu um erro ao tentar registrar o cliente.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente',
                confirmButtonColor: '#d957a9' // Cor personalizada do botão
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl mb-4 text-pink-400">Cadastro de Cliente</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mb-4 p-2 border border-gray-600 rounded w-full bg-gray-700 text-white"
                />
                <button
                    type="submit"
                    className="bg-pink-400 text-white py-2 px-4 rounded w-full hover:bg-pink-300 transition-colors duration-200"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default RegisterClient;
