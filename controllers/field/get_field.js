import Field from "../../models/Field.js";

const getField = (id) => {
    return Field.findByPk(id, {
        include: ["location"],
    });
};

export default getField;