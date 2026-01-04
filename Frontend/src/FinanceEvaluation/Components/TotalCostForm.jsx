import PropTypes from 'prop-types';
import { useState } from 'react';
import { getSimulation, getTotalCost } from '../../Simulation/Services/SimulationServices';

function TotalCostForm({ creditAmount, simulatedInterestRate, numberOfPays, totalPriceHome, creditType }) {
    const [totalCost, setTotalCost] = useState(0);

    const handleSimulationSubmit = async (e) => {
        e.preventDefault();

        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType
        };

        // Simulación
        try {
            const { quote } = await getSimulation(simulationData);

            const totalCostData = {
                creditAmount,
                numberOfPays,
                quote
            };

            const { totalCost } = await getTotalCost(totalCostData);

            // Cálculo del costo total
            setTotalCost(totalCost);
        }
        catch {
            alert("Error al simular");
        }
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full text-center">
            {/* Información del crédito */}
            <h2 className="text-4xl font-semibold mb-2 text-center">Costo Total</h2>

            <section className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Información del Crédito</h2>
                <p>{`Monto del crédito: ${creditAmount}`}</p>
                <p>{`Tasa de interés simulada: ${simulatedInterestRate}`}</p>
                <p>{`Número de pagos: ${numberOfPays}`}</p>
                <p>{`Precio total de la vivienda: ${totalPriceHome}`}</p>
            </section>

            {/* Botón para simular */}
            <button
                onClick={handleSimulationSubmit}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mb-4"
            >
                Calcular
            </button>

            {/* Resultados de la simulación */}
            <section className="mb-4">
                <p className="text-green-500">{`Costo Total Simulado: ${totalCost}`}</p>
            </section>
        </div>
    );
}

TotalCostForm.propTypes = {
    creditAmount: PropTypes.number.isRequired,
    simulatedInterestRate: PropTypes.number.isRequired,
    numberOfPays: PropTypes.number.isRequired,
    totalPriceHome: PropTypes.number.isRequired,
    creditType: PropTypes.string.isRequired,
};

export default TotalCostForm;