import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CalculateRecentWithdrawalsForm({ balance, setSavingCapacityRecentWithdrawals }) {
    const [withdrawal, setWithdrawal] = useState(0);
    const [message, setMessage] = useState('No válido'); // Estado inicial como "No válido"

    const handleGradeChange = (withdrawal) => {
        const newBalance = balance * 0.3;

        if (newBalance >= withdrawal) {
            setSavingCapacityRecentWithdrawals(true); // Si es válido, cambiar el estado
            setMessage('Válido');
        } else {
            setSavingCapacityRecentWithdrawals(false); // Si no es válido, mantener "No válido"
            setMessage('No válido');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Validar Retiros Recientes</h3>

            {/* Campo de retiro */}
            <label htmlFor="withdrawal" className="block text-sm font-medium text-gray-700 mb-2">
                Monto del retiro:
                <input
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    name="withdrawal"
                    id="withdrawal"
                    onBlur={(e) => setWithdrawal(parseInt(e.target.value))}
                />
            </label>

            {/* Botón para confirmar */}
            <button
                onClick={() => handleGradeChange(withdrawal)}
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

CalculateRecentWithdrawalsForm.propTypes = {
    balance: PropTypes.number.isRequired,
    setSavingCapacityRecentWithdrawals: PropTypes.func.isRequired,
};