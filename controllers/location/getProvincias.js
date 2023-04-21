import Location from "../../models/Location.js";

const getProvincias = (departamento, provincia) => {
    return Location.findAll({
        attributes: ['distrito', 'ubigeo'],
        where: { departamento: departamento, provincia: provincia },
        order: [['distrito', 'ASC']]
    })      
};

export default getProvincias;