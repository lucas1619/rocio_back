import Location from "../../models/Location.js";

const getDepartamentos = () => {
    return Location.findAll({
        attributes: ['departamento'],
        group: ['departamento'],
        order: [['departamento', 'ASC']]
    })      
};

export default getDepartamentos;