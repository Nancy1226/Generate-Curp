import { Formik, Form } from "formik";
import Swal from 'sweetalert2';
import Input from "../components/Input";

function Dashboard() {
    function generateCURP(name, firstName, lastName, birthDate, sexo, state) {

        function obtenerAnioDosDigitos(anio) {
            return anio.toString().substring(2);
        }

        function obtenerAnioDosDigitos(anio) {
            return anio.toString().substring(2);
        }
    
        function obtenerMesDosDigitos(mes) {
            return mes < 10 ? '0' + mes : mes.toString();
        }
    
        function obtenerDiaDosDigitos(dia) {
            return dia < 10 ? '0' + dia : dia.toString();
        }
    
        
        function obtenerPrimeraVocal(apellido) {
            const vocales = apellido.match(/[AEIOU]/gi);
            if (vocales && vocales.length > 0) {
                return vocales[0].toUpperCase();
            }
            return ''; 
        }
       
        const primeraLetraApellidoPaterno = firstName.charAt(0).toUpperCase();

        const segundaLetraApellidoPaterno =  obtenerPrimeraVocal(firstName);
    
        const primeraLetraApellidoMaterno = lastName.charAt(0).toUpperCase();
  
        const primeraLetraNombre = name.charAt(0).toUpperCase();
    
      
        const anioNacimiento = obtenerAnioDosDigitos(new Date(birthDate).getFullYear());
        const mesNacimiento = obtenerMesDosDigitos(new Date(birthDate).getMonth() + 1);
        const diaNacimiento = obtenerDiaDosDigitos(new Date(birthDate).getDate() + 1); // Corregir aquí para que empiece desde 1
    
     
        const sexoMayuscula = sexo.charAt(0).toUpperCase();
        const primeraLetraEstado = state.charAt(0).toUpperCase();
        const segundaLetraEstado = state.charAt(6).toUpperCase();

      
        const curp = (
            primeraLetraApellidoPaterno +
            segundaLetraApellidoPaterno +
            primeraLetraApellidoMaterno +
            primeraLetraNombre +
            anioNacimiento +
            mesNacimiento +
            diaNacimiento +
            sexoMayuscula +
            primeraLetraEstado +
            segundaLetraEstado
        );
    
        return curp;
    
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: "",
                    firstName: "",
                    lastName: "",
                    birthDate: "",
                    sexo: "",
                    state: "Chiapas",
                }}
                onSubmit={(values, actions) => {
                    const curpGenerada = generateCURP(
                        values.name,
                        values.firstName,
                        values.lastName,
                        values.birthDate,
                        values.sexo,
                        values.state
                    );

                    Swal.fire({
                        title: 'CURP generada:',
                        text: curpGenerada,
                        icon: 'success',
                    }).then(() => {
                        actions.resetForm();
                        window.location.reload(); // Recarga la página después de hacer clic en OK en Sweet Alert
                    });
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-10">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white py-3">
                            Generador curp
                        </h1>
                        
                        <Input
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            for1={"name"}
                            text={"Nombre"}
                            onChange={handleChange}
                        />
                        

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <Input
                                type={"text"}
                                name={"firstName"}
                                id={"firstName"}
                                for1={"firstName"}
                                text={"Primer apellido"}
                                onChange={handleChange}
                            />
                            <Input
                                type={"text"}
                                name={"lastName"}
                                id={"lastName"}
                                for1={"lastName"}
                                text={"Segundo apellido"}
                                onChange={handleChange}
                            />
                            <Input
                                type={"date"}
                                name={"birthDate"}
                                id={"birthDate"}
                                for1={"birthDate"}
                                text={"Fecha de nacimiento"}
                                onChange={handleChange}
                            />
                            <div className="relative z-0 w-full mb-5 group">
                                <select
                                    onChange={handleChange}
                                    name="sexo"
                                    id="sexo"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Hombre">Masculino</option>
                                    <option value="Mujer">Femenino</option>
                                </select>
                                <label
                                    htmlFor={"sexo"}
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Sexo
                                </label>
                            </div>
                        </div>
                        <Input
                            type={"text"}
                            name={"state"}
                            id={"floating_last_name"}
                            for1={"floating_last_name"}
                            text={"Estado"}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-white bg-blue-600 hover:bg-primary-700  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                        {isSubmitting ? "Generando.." : "Generar"}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Dashboard;