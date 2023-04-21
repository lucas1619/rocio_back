import joi from 'joi';

// Define el esquema de validación para la salida de datos
const EditUserSchema = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
});

export default EditUserSchema;