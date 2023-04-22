import Crop from "../../models/Crop.js";

const getAllCrops = (fieldId) => {
    return Crop.findAll({
        where: {
            field_id: fieldId
        }
    })
};

export default getAllCrops;