const { users } = require("../models/users");
const bcrypt = require("bcrypt");
module.exports = {
  users: async function() {
    const allUsers = await users.findAll({ raw: true });
    return {
      usersData: allUsers.map((user) => {
        return {
          ...user._doc,
          userid: user.userid,
          name: user.name,
          login: user.login,
          pass: user.pass,
        };
      }),
    };
  },
  createUser: async function({ userInput }, req) {
    const existingUser = await users.findOne({
      where: { login: userInput.email },
    });
    if (existingUser) {
      const error = new Error("User Already Exists!");
      throw error;
    }
    const hashPw = await bcrypt.hash(userInput.password, 12);
    const user = new users({
      login: userInput.email,
      name: userInput.name,
      pass: hashPw,
      gender: userInput.gender,
    });
    const createUser = await user.save();
    return {
      ...createUser._doc,
      id: createUser.userid,
      email: createUser.login,
      password: userInput.password,
      gender: createUser.gender,
    };
  },
};
