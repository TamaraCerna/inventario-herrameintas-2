import PropTYpes from 'prop-types';


export default function CreditDataForm({ setRequestedAmount, setTotalPriceHome, setMonthlyClientIncome }) {

    return (
        <div className="grid gap-4 bg-white p-6 border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-center">Datos del Crédito</h3>

            {/* Cantidad solicitada */}
            <label htmlFor="creditAmount" className="block font-medium text-gray-700">
                Cantidad solicitada:
                <input
                    type="number"
                    id="creditAmount"
                    name="creditAmount"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    onBlur={(e) => setRequestedAmount(parseFloat(e.target.value))}
                />
            </label>

            {/* Precio total de la casa */}
            <label htmlFor="totalPriceHome" className="block font-medium text-gray-700">
                Precio total de la casa:
                <input
                    type="number"
                    id="totalPriceHome"
                    name="totalPriceHome"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    onBlur={(e) => setTotalPriceHome(parseFloat(e.target.value))}
                />
            </label>

            {/* Ingreso mensual del cliente */}
            <label htmlFor="monthlyClientIncome" className="block font-medium text-gray-700">
                Ingreso mensual del cliente:
                <input
                    type="number"
                    id="monthlyClientIncome"
                    name="monthlyClientIncome"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    onBlur={(e) => setMonthlyClientIncome(parseFloat(e.target.value))}
                />
            </label>
        </div>
    );
}

CreditDataForm.propTypes = {
    setRequestedAmount: PropTYpes.func.isRequired,
    setTotalPriceHome: PropTYpes.func.isRequired,
    setMonthlyClientIncome: PropTYpes.func.isRequired
};