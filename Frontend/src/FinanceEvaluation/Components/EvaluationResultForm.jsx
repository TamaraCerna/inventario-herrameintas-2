import PropTypes from 'prop-types';

function EvaluationResultForm({ evaluationResult, setEvaluationResult }) {
    const handleValidation = () => {
        setEvaluationResult(!evaluationResult); // Cambia el estado de `evaluationResult`
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <h2 className="text-4xl font-semibold text-center mb-4">Resultado de la Evaluación</h2>

            {/* Botón para validar resultado de la evaluación */}
            <div className="flex justify-center">
                <button
                    onClick={handleValidation}
                    type="button"
                    className={`bg-${evaluationResult ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-md hover:bg-${evaluationResult ? 'green' : 'red'}-600`}
                >
                    {evaluationResult ? "Evaluación validada" : "Validar Evaluación"}
                </button>
            </div>
        </div>
    );
}

EvaluationResultForm.propTypes = {
    evaluationResult: PropTypes.bool.isRequired,
    setEvaluationResult: PropTypes.func.isRequired,
};

export default EvaluationResultForm;