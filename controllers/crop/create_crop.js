import Crop from "../../models/Crop.js";

const createCrop = (name, cropType, soilType, growthStage, irrigation_frequency, fieldId) => {
    return Crop.create({
        name: name,
        crop_type: cropType,
        soil_type: soilType,
        growth_stage: growthStage,
        irrigation_frequency: irrigation_frequency,
        field_id: fieldId
    })
};

export default createCrop;