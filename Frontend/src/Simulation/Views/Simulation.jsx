import SimulationForm from "../Components/SimulationForm";
import { useState } from 'react';
import { getSimulation } from '../Services/SimulationServices';

function Simulation() {
    const [creditAmount, setCreditAmount] = useState(0);
    const [simulatedInterestRate, setSimulatedInterestRate] = useState(0);
    const [numberOfPays, setNumberOfPays] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [creditType, setCreditType] = useState('');
    const [quote, setQuote] = useState(0);
    const [messageSimulatedInterestRate, setMessageSimulatedInterestRate] = useState("");
    const [message, setMessage] = useState("");
    const [maxTotalPriceHome, setMaxTotalPriceHome] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const simulationData = {
            creditAmount,
            simulatedInterestRate,
            numberOfPays,
            totalPriceHome,
            creditType
        };
        try {
            const response = await getSimulation(simulationData);
            setQuote(response.quote);
            setMessage(response.message);
            setMaxTotalPriceHome(response.totalPriceHome);
        } catch {
            alert("Error al simular");
        }

    };

    const handleCreditTypeChange = (e) => {
        setCreditType(e.target.value);
    };

    return (
        <div className='flex items-start justify-center space-x-8 p-8'>
            {/* Sección del formulario */}
            <section className='w-1/3 '>
                <h1 className='text-4xl mb-4 text-center'>Simulación</h1>

                <form onSubmit={handleSubmit} className='border-2 p-4 grid gap-4 rounded-lg bg-white'>
                    {/* Sección del tipo de crédito */}
                    <section className='grid gap-2'>
                        <h2 className='text-xl'>Tipo de crédito</h2>
                        <select
                            name="creditType"
                            id="creditType"
                            value={creditType}
                            onChange={handleCreditTypeChange}
                            className='border p-2 rounded'
                        >
                            <option value="Select">Seleccione una opción</option>
                            <option value="firstHome">Primera casa</option>
                            <option value="secondHome">Segunda casa</option>
                            <option value="commercialProperty">Propiedad comercial</option>
                            <option value="remodeling">Remodelación</option>
                        </select>
                    </section>

                    {/* Reutilizamos el componente SimulationForm */}
                    <SimulationForm
                        creditType={creditType}
                        setMessageSimulatedInterestRate={setMessageSimulatedInterestRate}
                        messageSimulatedInterestRate={messageSimulatedInterestRate}
                        simulatedInterestRate={simulatedInterestRate}
                        setCreditAmount={setCreditAmount}
                        setSimulatedInterestRate={setSimulatedInterestRate}
                        setNumberOfPays={setNumberOfPays}
                        setTotalPriceHome={setTotalPriceHome}
                    />

                    {/* Botón para simular */}
                    <button type='submit' className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'>
                        Simular
                    </button>
                </form>
            </section>

            {/* Sección de información */}
            <section className='w-1/3 text-center my-auto'>
                <h2 className='text-4xl mb-4'>Información</h2>
                <div className='border-2 p-4 rounded-lg bg-white'>
                    <h3 className="grid my-4">
                        <strong className='text-4xl mb-4'>Cantidad maxima de prestamo por valor de la casa</strong>
                    </h3>
                    <p className='text-4xl'>
                        {maxTotalPriceHome}
                    </p>
                    <h3 className="grid my-4">
                        <strong className='text-4xl mb-4'>Cuota mensual Chile</strong>
                    </h3>
                    <p className='text-4xl'>
                        {quote}
                    </p>
                    <h3 className="grid my-4">
                        <strong className='text-4xl mb-4'>Resultado</strong>
                    </h3>
                    <p className='text-4xl'>
                        {message}
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Simulation;