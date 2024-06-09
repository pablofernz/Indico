import axios from "axios";

const validate = async (userData, newData, passwordEditor) => {
    const errors = {};

    // - - - - - - - - - Name & Lastname - - - - - - - - -
    if (!newData.name) errors.name = "Tu nombre"
    if (!newData.lastname) errors.lastname = "Tu apellido"

    // - - - - - - - - - Email - - - - - - - - -

    try {
        if (!newData.email) {
            errors.email = "Ingrese un email";
            return errors; // Retorna temprano si no hay email
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newData.email)) {
            errors.email = "Ingrese un correo válido";
            return errors; // Retorna temprano si el email no es válido
        }

        if (userData.email !== newData.email) {
            const response = await axios.get(`http://localhost:3001/client/exist?email=${newData.email}`);
            if (response.data) {
                errors.email = "Este correo está en uso"; // Mensaje de error si el correo está en uso
            }
        }


    } catch (error) {
        console.error('Error al verificar el correo:', error); // Log para depuración
        errors.email = "Error al verificar el correo"; // Mensaje de error en caso de excepción
    }

    // - - - - - - - - - actual password - - - - - - - - -
    if (passwordEditor === false) {
        return errors
    } else {
        if (!newData.actualPassword) {
            errors.actualPassword = "No puede estar vacío";

        }

        if (!/^.{8,}$/.test(newData.actualPassword)) {
            errors.actualPassword = "Mínimo 8 caracteres"
        }

        // - - - - - - - - - new password - - - - - - - - -

        if (!newData.newPassword || errors.newPassword === "Mínimo 8 caracteres") {
            errors.newPassword = "No puede estar vacío";
        }

        if (!/^.{8,}$/.test(newData.newPassword)) {
            errors.newPassword = "Mínimo 8 caracteres"
        }


        try {
            const passwords = {
                actualPassword: newData.actualPassword,
                newPassword: newData.newPassword
            }
            const response = await axios.post(`http://localhost:3001/client/password?email=${newData.email}`, passwords);
            if (response.data === false) {
                errors.actualPassword = "Contraseña incorrecta"
            }
            // console.log(response)

        } catch (error) {
            errors.actualPassword = error.response.data
            errors.newPassword = error.response.data
            console.log(error)
        }

    }



    return errors;
}

export default validate