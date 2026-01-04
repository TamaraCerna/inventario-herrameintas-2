import PropTypes from 'prop-types';
import { comprobeSimulatedInterestRate } from '../Utils/SimulationUtils';
import { useState } from 'react';

function CalculateDataForm({
    creditType,
    setSimulatedInterestRate,
    setNumberOfPays,
    setBalance
}) {
    const [message, setMessage] = useState('No validado');
    return (
        <div className="grid gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Datos del Crédito</h3>

            {/* Tasa de interés anual */}
            <label htmlFor="simulatedInterestRate" className="block text-sm font-medium text-gray-700">
                Tasa de interés anual:
                <input
                    type="number"
                    id="simulatedInterestRate"
                    name="simulatedInterestRate"
                    step="0.000000001"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => {
                        const value = parseFloat(e.target.value);
                        const response = comprobeSimulatedInterestRate(creditType, value);
                        if (response) {
                            setMessage('Tasa de interés válida');
                        } else {
                            setMessage('Tasa de interés inválida');
                        }
                        const newValue = (value / 12) / 100;
                        setSimulatedInterestRate(newValue);
                    }}
                />
            </label>
            <p className='text-center'>{message}</p>
            {/* Plazo */}
            <label htmlFor="numberOfPays" className="block text-sm font-medium text-gray-700">
                Plazo (en años):
                <input
                    type="number"
                    id="numberOfPays"
                    name="numberOfPays"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => {
                        const value = parseInt(e.target.value, 10);
                        const newValue = value * 12;
                        setNumberOfPays(newValue);
                    }}
                />
            </label>

            {/* Saldo */}
            <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                Saldo:
                <input
                    type="number"
                    id="balance"
                    name="balance"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onBlur={(e) => setBalance(parseInt(e.target.value))}
                />
            </label>
        </div>
    );
}

CalculateDataForm.propTypes = {
    creditType: PropTypes.string.isRequired,
    setSimulatedInterestRate: PropTypes.func.isRequired,
    setNumberOfPays: PropTypes.func.isRequired,
    setBalance: PropTypes.func.isRequired,
};

export default CalculateDataForm;