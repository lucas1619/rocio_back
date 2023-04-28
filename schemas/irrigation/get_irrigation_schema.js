import joi from 'joi';

const get_irrigation_schema = joi.object({
    month: joi.number().required(),
    year: joi.number().required()
});

export default get_irrigation_schema;
