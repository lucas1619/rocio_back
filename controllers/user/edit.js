import User from "../../models/User.js";
//import encrypt from "../../utils/encrypt.js";

const edit = (id, name, username, password) => {
    //const hashed_password = encrypt(password);
    return User.update({
        name: name,
        username: username,
        password: password
    },
    {
        where: {
            id: id
        },
        returning: true
    });
}

export default edit;