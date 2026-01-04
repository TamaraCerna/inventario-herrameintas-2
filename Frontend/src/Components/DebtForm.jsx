import PropTypes from 'prop-types';
import { useState } from 'react';

export default function DebtForm({ handleGradeChange }) {
    const [debt, setDebt] = useState(0);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Registrar Deuda</h3>

            {/* Campo de deuda */}
            <label htmlFor="debt" className="block text-sm font-medium text-gray-700 mb-2">
                Monto de la deuda:
                <input
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    name="debt"
                    id="debt"
                    onBlur={(e) => setDebt(parseInt(e.target.value))}
                />
            </label>

            {/* Botón para confirmar */}
            <button
                onClick={() => handleGradeChange(debt)}
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mt-4"
            >
                Confirmar
            </button>
        </div>
    );
}

DebtForm.propTypes = {
    handleGradeChange: PropTypes.func.isRequired,
};