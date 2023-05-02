import Irrigation from "../../models/Irrigation.js";
import Crop from "../../models/Crop.js";
import { Op } from 'sequelize';

const getIrrigationByCrop = (month, year, cropId) => {
    return Irrigation.findAll({
        attributes: ['start_date', 'end_date'],
        where: {
            start_date: {
                [Op.gte]: new Date(year, month - 1, 1),
                [Op.lt]: new Date(year, month, 1)
            },
            crop_id: cropId,
            end_date: {
                [Op.ne]: null
            }
        },
        order: [['start_date', 'ASC']],
    })
};

export default getIrrigationByCrop;