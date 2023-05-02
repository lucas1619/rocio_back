import Irrigation from "../../models/Irrigation.js";

const isCropIrrigating = async (cropId) => {
  const irrigation = await Irrigation.findOne({
    attributes: ['start_date', 'end_date'],
    where: {
      end_date: null,
      crop_id: cropId,
    },
  });
  return irrigation !== null;
};

export default isCropIrrigating;
