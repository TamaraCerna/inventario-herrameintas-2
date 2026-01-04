import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation } from '../../Simulation/Services/SimulationServices';
import DebtForm from "../../Components/DebtForm";

function DebtToIncomeForm({
    debtToIncomeRatio,
    setDebtToIncomeRatio,
    creditAmount,
    simulatedInterestRate,
    numberOfPays,
    totalPriceHome,
    monthlyClientIncome,
    creditType
}) {
    const [debts, setDebts] = useState(1);
    const [totalDebts, setTotalDebts] = useState(0);
    const [message, setMessage] = useState('');

    const add = () => setDebts(debts + 1);

    const discount = () => {
        if (debts > 1) {
            setDebts(debts - 1);
        }
    };

    const handleGradeChange = (debt) => {
        setTotalDebts((prevTotalGrade) => prevTotalGrade + parseFloat(debt));
    };

    const handleCalculate = async () => {
        const fivePercentMonthlyClientIncome = monthlyClientIncome * 0.5;
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            monthlyClientIncome,
            creditType
        };
        try {
            const response = await getSimulation(simulationData);
            setTotalDebts(response.quote + totalDebts);

            if (totalDebts > fivePercentMonthlyClientIncome) {
                setMessage('No es posible el crédito');
            } else {
                setMessage('Es posible el crédito');
            }
        }
        catch {
            alert("Error al simular");
        }
    };

    // Función para validar la relación deuda-ingresos
    const handleValidation = () => {
        setDebtToIncomeRatio(!debtToIncomeRatio); // Cambia el estado de `debtToIncomeRatio`
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <section className="mb-4">
                <h2 className="text-4xl font-semibold mb-2 text-center">Relación Deuda-Ingresos</h2>
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-center">Deudas</h2>
                    {/* Formulario dinámico para las deudas */}
                    <div className="flex flex-wrap justify-center mb-4">
                        {Array.from({ length: debts }).map((_, index) => (
                            <div key={index} className="m-2">
                                <DebtForm handleGradeChange={handleGradeChange} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Botones para agregar o quitar deudas */}
                <div className="flex justify-center mb-4">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-4"
                        type="button"
                        onClick={discount}
                    >
                        Descontar
                    </button>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                        type="button"
                        onClick={add}
                    >
                        Agregar
                    </button>
                </div>
                {/* Mostrar total en deudas */}
                <h3 className="text-lg font-semibold mb-2">Total en deudas: {totalDebts}</h3>
                <p className={`mb-4 ${message.includes('No') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>

                {/* Botón para calcular */}
                <button
                    type="button"
                    onClick={handleCalculate}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                    Calcular
                </button>
            </section>

            {/* Botón para validar relación deuda-ingresos */}
            <section className="flex justify-center mt-6">
                <button
                    onClick={handleValidation}
                    type="button"
                    className={`bg-${debtToIncomeRatio ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-md hover:bg-${debtToIncomeRatio ? 'green' : 'red'}-600`}
                >
                    {debtToIncomeRatio ? "Relación validada" : "Validar Relación"}
                </button>
            </section>
        </div>
    );
}

DebtToIncomeForm.propTypes = {
    debtToIncomeRatio: PropTypes.bool.isRequired,
    setDebtToIncomeRatio: PropTypes.func.isRequired,
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
    creditType: PropTypes.string.isRequired
};

export default DebtToIncomeForm;