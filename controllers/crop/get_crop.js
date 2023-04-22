import Crop from "../../models/Crop.js";

const getCrop = (cropId) => {
    return Crop.findByPk(cropId)
};

export default getCrop;