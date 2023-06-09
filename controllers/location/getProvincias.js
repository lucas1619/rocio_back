import Location from "../../models/Location.js";

const getProvincias = (departamento) => {   
    return Location.findAll({
        attributes: ['provincia'],
        where: { departamento: departamento },
        group: ['provincia'],
        order: [['provincia', 'ASC']]
    })
};

export default getProvincias;