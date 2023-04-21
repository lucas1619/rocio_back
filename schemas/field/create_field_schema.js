import joi from 'joi';

const create_field_schema = joi.object({
    name: joi.string().required(),
    area: joi.number().required(),
    user_id: joi.number().required(),
    location_id: joi.string().required()
});

export default create_field_schema;
