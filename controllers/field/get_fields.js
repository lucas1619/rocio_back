import Field from "../../models/Field.js";

const getFields = (userId) => {
    return Field.findAll({
        where: {
            user_id: userId
        }
    })
};

export default getFields;