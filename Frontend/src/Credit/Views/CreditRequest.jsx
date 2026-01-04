import FirstHomeForm from "../Components/FirstHomeForm";
import SecondHomeForm from "../Components/SecondHomeForm";
import ComercialPropertyForm from "../Components/ComercialPropertyForm";
import RemoldingForm from "../Components/RemoldingForm";
import RequestUserForm from "../../User/Components/RequestUserForm";
import CreditDataForm from "../../Components/CreditDataForm";

import { useState } from "react";
import { postCredit } from "../Services/CreditService";
import { getUser } from "../../User/Services/UserServices";

function CreditRequest() {
    // User data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");

    // Credit data
    const [creditId, setCreditId] = useState("");
    const [creditType, setCreditType] = useState("");
    const [requestedAmount, setRequestedAmount] = useState(0);
    const [totalPriceHome, setTotalPriceHome] = useState(0);
    const [monthlyClientIncome, setMonthlyClientIncome] = useState(0);

    const [showCreditDocuments, setShowCreditDocuments] = useState(false);

    const handleSelectChange = (e) => {
        setCreditType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (creditType === "") {
            alert("Seleccione un tipo de crédito");
        } else {
            const userRequestData = { firstName, lastName, rut };
            setShowCreditDocuments(true);

            try {
                const user = await getUser(userRequestData);
                const creditRequestData = { creditType, status: "En revisión", applicationDate: new Date(), requestedAmount, totalPriceHome, monthlyClientIncome };
                const response = await postCredit(creditRequestData, user.id);
                setCreditId(response);
                alert("Crédito solicitado con éxito");
            } catch {
                alert("Error al solicitar el crédito");
            }
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold text-center'>Solicitud de Crédito</h1>
            {!showCreditDocuments && (
                <section className='w-full max-w-md bg-white shadow-md rounded-lg p-6 m-8'>

                    {/* Formulario de solicitud de usuario */}
                    <div className="border-2 p-4 rounded-lg">
                        <RequestUserForm setFirstName={setFirstName}
                            setLastName={setLastName}
                            setRut={setRut}
                        />

                        <CreditDataForm setRequestedAmount={setRequestedAmount}
                            setTotalPriceHome={setTotalPriceHome}
                            setMonthlyClientIncome={setMonthlyClientIncome}
                        />
                    </div>
                    {/* Formulario para seleccionar el tipo de crédito */}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <label htmlFor="creditType" className='text-sm font-medium text-gray-700 text-center my-6'>
                            Selecciona el tipo de crédito:

                            <select
                                name="creditType"
                                id="creditType"
                                value={creditType}
                                onChange={handleSelectChange}
                                className='border-2 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="firstHome">Primera casa</option>
                                <option value="secondHome">Segunda casa</option>
                                <option value="commercialProperty">Propiedad comercial</option>
                                <option value="remodeling">Remodelación</option>
                            </select>
                        </label>
                        {/* Botón para continuar */}
                        <button type="submit" className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'>
                            Siguiente
                        </button>
                    </form>
                </section>
            )}

            {/* Parte de los documentos */}
            {showCreditDocuments && (
                <section className='w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8'>
                    <h2 className='text-xl font-semibold mb-4 text-center'>Documentos del Crédito</h2>
                    {creditId && (
                        <>
                            {/* Mostrar formularios específicos basados en el tipo de crédito seleccionado */}
                            {creditType === "firstHome" && <FirstHomeForm creditId={creditId} />}
                            {creditType === "secondHome" && <SecondHomeForm creditId={creditId} />}
                            {creditType === "commercialProperty" && <ComercialPropertyForm creditId={creditId} />}
                            {creditType === "remodeling" && <RemoldingForm creditId={creditId} />}
                        </>
                    )}
                </section>
            )}
        </div>
    );
}

export default CreditRequest;