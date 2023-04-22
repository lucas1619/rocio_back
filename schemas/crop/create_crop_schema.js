import joi from 'joi';

const create_crop_schema = joi.object({
    name: joi.string().required(),
    crop_type: joi.string().required(),
    soil_type: joi.string().required(),
    growth_stage: joi.string().required(),
    field_id: joi.number().required()
});

export default create_crop_schema;