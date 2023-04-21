import joi from 'joi';

// Define el esquema de validación para la salida de datos
const LoginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
});

export default LoginSchema;