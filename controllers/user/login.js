import User from "../../models/User.js";
//import encrypt from "../../utils/encrypt.js";

const login = async (username, password) => {
    //const hashed_password = encrypt(password);
    const user = await User.findOne({
      where: {
        username: username,
        password: password
      },
      attributes: {
        exclude: ['password']
      }
    });
    return user;
  };
  

export default login;