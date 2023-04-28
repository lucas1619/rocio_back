import moment from 'moment';
import Irrigation from "../../models/Irrigation.js";
import { Op } from 'sequelize';

const getIrrigation = (year, month, day, id) => {
  // Crear el objeto currentDate utilizando Moment.js
  const currentDate = moment([year, month - 1, day]);

  // Obtener el primer y último día de la semana actual utilizando Moment.js
  const startOfWeek = currentDate.clone().startOf('isoWeek');
  const endOfWeek = currentDate.clone().endOf('week');

  // Buscar las irrigaciones que ocurren dentro de la semana actual y tienen el crop_id igual a id
  return Irrigation.findAll({
    attributes: ['start_date', 'end_date'],
    where: {
      start_date: {
        [Op.between]: [startOfWeek.toDate(), endOfWeek.toDate()],
      },
      crop_id: id,
    },
    order: [['start_date', 'ASC']],
  })
};

export default getIrrigation;
