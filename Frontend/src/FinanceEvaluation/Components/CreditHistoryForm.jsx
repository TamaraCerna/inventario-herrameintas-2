import PropTypes from 'prop-types';

function CreditHistoryForm({ creditHistory, setCreditHistory }) {
    const handleValidation = () => {
        setCreditHistory(!creditHistory); // Cambia el estado de `creditHistory`
    };

    return (
        <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 w-full">
            <h2 className="text-4xl font-semibold text-center mb-4">Historial Crediticio</h2>

            {/* Botón para validar historial crediticio */}
            <div className="flex justify-center">
                <button
                    onClick={handleValidation}
                    type="button"
                    className={`bg-${creditHistory ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-md hover:bg-${creditHistory ? 'green' : 'red'}-600`}
                >
                    {creditHistory ? "Historial validado" : "Validar Historial"}
                </button>
            </div>
        </div>
    );
}

CreditHistoryForm.propTypes = {
    creditHistory: PropTypes.bool.isRequired,
    setCreditHistory: PropTypes.func.isRequired,
};

export default CreditHistoryForm;