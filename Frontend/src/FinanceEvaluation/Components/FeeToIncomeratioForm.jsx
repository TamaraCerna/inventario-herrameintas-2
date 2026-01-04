import PropTypes from 'prop-types';
import { useState } from 'react';
import { getDebtToIncomeRatioCalculation } from '../../FinanceEvaluation/Services/FinanceEvaluationService';

function FeeToIncomeRatio({
    feeToIncomeRatio,
    setFeeToIncomeRatio,
    creditAmount,
    simulatedInterestRate,
    numberOfPays,
    totalPriceHome,
    monthlyClientIncome
}) {
    const [quote, setQuote] = useState(0);
    const [message, setMessage] = useState("message");

    const handleSimulationSubmit = async (e) => {
        e.preventDefault();
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            monthlyClientIncome
        };
        try {
            const response = await getDebtToIncomeRatioCalculation(simulationData);
            setQuote(response.quote);
            setMessage(response.message);
        } catch {
            alert("Error al calcular la relación cuota/ingreso");
        }
    };

    // Función para validar la relación cuota/ingreso
    const handleValidation = () => {
        setFeeToIncomeRatio(!feeToIncomeRatio); // Cambia el estado de `feeToIncomeRatio`
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full text-center">
            {/* Información del crédito */}
            <h2 className="text-4xl font-semibold text-center">Relación Cuota/Ingreso</h2>
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Crédito</h2>
                <p>{`Monto del crédito: ${creditAmount}`}</p>
                <p>{`Tasa de interés simulada: ${simulatedInterestRate}`}</p>
                <p>{`Número de pagos: ${numberOfPays}`}</p>
                <p>{`Precio total de la vivienda: ${totalPriceHome}`}</p>
                <p>{`Ingreso mensual del cliente: ${monthlyClientIncome}`}</p>
            </section>

            {/* Botón para simular */}
            <button
                onClick={handleSimulationSubmit}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mb-4"
            >
                Simular
            </button>

            {/* Resultados de la simulación */}
            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Respuesta</h2>
                <p>{`Cuota: ${quote}`}</p>
                <p className={message.includes('No') ? 'text-red-500' : 'text-green-500'}>{message}</p>
            </section>

            {/* Botón para validar relación cuota/ingreso */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleValidation}
                    type="button"
                    className={`bg-${feeToIncomeRatio ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-md hover:bg-${feeToIncomeRatio ? 'green' : 'red'}-600`}
                >
                    {feeToIncomeRatio ? "Relación validada" : "Validar Relación"}
                </button>
            </div>
        </div>
    );
}

FeeToIncomeRatio.propTypes = {
    feeToIncomeRatio: PropTypes.bool.isRequired,
    setFeeToIncomeRatio: PropTypes.func.isRequired,
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    monthlyClientIncome: PropTypes.number.isRequired,
};

export default FeeToIncomeRatio;