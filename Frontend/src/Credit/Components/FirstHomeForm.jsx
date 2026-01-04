import DocumentForm from "../../Document/Components/DocumentForm";
import { useState } from "react";
import { postFile } from '../../Document/Services/DocumentServices';
import { postFinanceEvaluation } from "../../FinanceEvaluation/Services/FinanceEvaluationService";
import PropTypes from 'prop-types';

function FirstHomeForm({ creditId }) {
    const [incomeCertificate, setIncomeCertificate] = useState(null);
    const [appraisalCertificate, setAppraisalCertificate] = useState(null);
    const [creditHistorial, setCreditHistorial] = useState(null);
    const [employment, setEmployment] = useState(null);

    // Estado para manejar la carga
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleUpload = async () => {
        setIsLoading(true); // Iniciar la carga
        try {
            if (incomeCertificate) await postFile(incomeCertificate, "comrpobante de ingresos", creditId);
            if (appraisalCertificate) await postFile(appraisalCertificate, "certificado de avaluo", creditId);
            if (creditHistorial) await postFile(creditHistorial, "historial crediticio", creditId);
            if (employment) await postFile(employment, "laboral", creditId);

            alert("All files uploaded successfully");

            // Datos de evaluación financiera
            const financeEvaluationData = {
                feeToIncomeRatio: false,
                creditHistory: false,
                employmentHistory: false,
                debtToIncomeRatio: false,
                financeMaxAmount: false,
                applicantAge: false,
                savingCapacity: false,
                evaluationResult: false
            };
            await postFinanceEvaluation(creditId, financeEvaluationData);
        } catch {
            alert("Error al subir los archivos");
        } finally {
            setIsLoading(false); // Finalizar la carga
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Documentos para Primera Vivienda</h2>

            {/* Mostrar mensaje de carga si está subiendo archivos */}
            {isLoading && (
                <div className="text-blue-600 font-semibold mb-4">
                    Subiendo los archivos...
                </div>
            )}

            <form className="grid gap-4">
                <DocumentForm
                    documentRequiredName="Comprobante de ingresos"
                    handleFunction={(event) => handleFileChange(event, setIncomeCertificate)}
                    setFunction={setIncomeCertificate}
                    documentName="comrpobante de ingresos"
                />
                <DocumentForm
                    documentRequiredName="Certificado de avalúo"
                    handleFunction={(event) => handleFileChange(event, setAppraisalCertificate)}
                    setFunction={setAppraisalCertificate}
                    documentName="certificado de avaluo"
                />
                <DocumentForm
                    documentRequiredName="Historial crediticio"
                    handleFunction={(event) => handleFileChange(event, setCreditHistorial)}
                    setFunction={setCreditHistorial}
                    documentName="historial crediticio"
                />
                <DocumentForm
                    documentRequiredName="Laboral"
                    handleFunction={(event) => handleFileChange(event, setEmployment)}
                    setFunction={setEmployment}
                    documentName="Laboral"
                />

                {/* Botón deshabilitado mientras se suben los archivos */}
                <button
                    type="button"
                    onClick={handleUpload}
                    className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Subiendo...' : 'Subir Archivos'}
                </button>
            </form>
        </div>
    );
}

FirstHomeForm.propTypes = {
    creditId: PropTypes.string.isRequired,
};

export default FirstHomeForm;