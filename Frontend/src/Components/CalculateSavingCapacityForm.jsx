import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CalculateSavingCapacityForm({ handleIncomeChange, setSavingHistory }) {
    const [balance, setBalance] = useState(0);
    const [withdrawal, setWithdrawal] = useState(0);
    const [message, setMessage] = useState('No válido'); // Estado inicial como "No válido"

    const handleGradeChange = (balance, withdrawal) => {
        const newBalance = balance * 0.5;

        if (newBalance >= withdrawal) {
            setSavingHistory(true); // Si es válido, actualizar el historial
            setMessage('Válido');
        } else {
            setSavingHistory(false); // Si no es válido, mantener "No válido"
            setMessage('No válido');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Validar Capacidad de Ahorro</h3>

            {/* Campo de saldo */}
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-2">
                Saldo:
                <input
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    name="balance"
                    id="balance"
                    onBlur={(e) => setBalance(parseInt(e.target.value))}
                />
            </label>

            {/* Campo de retiro */}
            <label htmlFor="withdrawal" className="block text-sm font-medium text-gray-700 mb-2">
                Retiro:
                <input
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    name="withdrawal"
                    id="withdrawal"
                    onBlur={(e) => setWithdrawal(parseInt(e.target.value))}
                />
            </label>

            {/* Campo de depósito mensual */}
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                Depósito mensual:
                <input
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    name="monthlyIncome"
                    id="monthlyIncome"
                    onBlur={(e) => handleIncomeChange(parseInt(e.target.value))}
                />
            </label>

            {/* Botón para confirmar */}
            <button
                onClick={() => handleGradeChange(balance, withdrawal)}
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mt-4"
            >
                Confirmar
            </button>

            {/* Mensaje de validación */}
            <p className={`mt-4 font-semibold text-center ${message === 'Válido' ? 'text-green-500' : 'text-red-500'}`}>
                {message}
            </p>
        </div>
    );
}

CalculateSavingCapacityForm.propTypes = {
    handleIncomeChange: PropTypes.func.isRequired,
    setSavingHistory: PropTypes.func.isRequired,
};