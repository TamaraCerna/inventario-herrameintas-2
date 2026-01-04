import { useState } from 'react';
import { postUser } from '../Services/UserServices';

function RegisterUserForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rut, setRut] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { firstName, lastName, rut, address, age };
            await postUser(userData);
            alert("Usuario registrado correctamente");
        } catch {
            alert("Error al registrar usuario");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center '>
            <h1 className='text-4xl mb-4'>Registro de usuario</h1>

            <section className='border-2 p-4 w-1/4 rounded-lg bg-white'>
                <form onSubmit={handleSubmit} className='grid gap-4'>
                    <label className='grid' htmlFor="firstName">Nombre:
                        <input type="text" id="firstName" name="firstName" onChange={(e) => setFirstName(e.target.value)} className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <label className='grid' htmlFor="lastName">Apellido:
                        <input type="text" id="lastName" name="lastName" onChange={(e) => setLastName(e.target.value)} className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <label className='grid' htmlFor="rut">Rut:
                        <input type="text" id="rut" name="rut" onChange={(e) => setRut(e.target.value)} className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <label className='grid' htmlFor="address">Dirección:
                        <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <label className='grid' htmlFor="age">Edad:
                        <input type="number" id="age" name="age" onChange={(e) => setAge(e.target.value)} className='border p-2 focus:ring-indigo-500 focus:border-indigo-500' />
                    </label>
                    <button type="submit" className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'>
                        Submit
                    </button>
                </form>
            </section>
        </div>
    )
}

export default RegisterUserForm;