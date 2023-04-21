import User from "../../models/User.js";
//import encrypt from "../../utils/encrypt.js";

const register = (name, username, password) => {
    //const hashed_password = encrypt(password);
    return User.create({
        name: name,
        username: username,
        password: password
    });
};

export default register;