const validate = (userData) => {
    const errors = {};


    if (!userData.email) {
        errors.email = "Ingrese un email"
    } else {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
            errors.email = "Ingrese un correo válido"
        }
    }

    if (!userData.password) {
        errors.password = "No puede estar vacío";
    } else {
        if (!/^.{8,}$/.test(userData.password)) {
            errors.password = "Mínimo 8 caracteres"
        }
    }
    return errors;
}

export default validate

// 