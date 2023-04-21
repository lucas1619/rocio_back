import Field from "../../models/Field.js";

const createField = (name, area, userId, locationId) => {
    return Field.create({
        name: name,
        area: area,
        user_id: userId,
        location_id: locationId
    })
};

export default createField;