import Location from "../../models/Location";

const getDistritos = (departamento) => {
    return Location.findAll({
        attributes: ['provincia'],
        where: { departamento: departamento },
        group: ['provincia'],
        order: [['provincia', 'ASC']]
    })      
};

export default getDistritos;