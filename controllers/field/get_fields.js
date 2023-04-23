import Field from "../../models/Field.js";

const getFields = (userId) => {
    return Field.findAll({
        where: {
            user_id: userId
        }, include: ["location"],
    })
};

export default getFields;