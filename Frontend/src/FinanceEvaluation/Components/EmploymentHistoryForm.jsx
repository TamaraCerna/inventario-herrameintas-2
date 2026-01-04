import PropTypes from 'prop-types';

function EmpoymentHistoryForm({ employmentHistory, setEmploymentHistory }) {
    const handleValidation = () => {
        setEmploymentHistory(!employmentHistory); // Cambia el estado de `employmentHistory`
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <h2 className="text-4xl font-semibold text-center mb-4">Historial Laboral</h2>

            {/* Botón para validar historial laboral */}
            <div className="flex justify-center">
                <button
                    onClick={handleValidation}
                    type="button"
                    className={`bg-${employmentHistory ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-md hover:bg-${employmentHistory ? 'green' : 'red'}-600`}
                >
                    {employmentHistory ? "Historial validado" : "Validar Historial"}
                </button>
            </div>
        </div>
    );
}

EmpoymentHistoryForm.propTypes = {
    employmentHistory: PropTypes.bool.isRequired,
    setEmploymentHistory: PropTypes.func.isRequired,
};

export default EmpoymentHistoryForm;