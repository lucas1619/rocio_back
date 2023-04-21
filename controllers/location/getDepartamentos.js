import Location from "../../models/Location";

const getDepartamentos = () => {
    return Location.findAll({
        attributes: ['departamento'],
        group: ['departamento'],
        order: [['departamento', 'ASC']]
    })      
};

export default getDepartamentos;