const { con } = require("../boot/databaseConnection");
const { DataTypes } = require("sequelize");

const genders = {
  male: "male",
  female: "female",
};

// define users model
const users = con.define("byt_users", {
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  login: {
    type: DataTypes.TEXT,
    validate: {
      isEmail: true,
    },
  },
  pass: {
    type: DataTypes.TEXT,
  },
  gender: {
    type: DataTypes.ENUM(Object.values(genders)),
  },
});

users.addHook("beforeCreate", (users, options) => {
  console.log("Inserting User");
});

module.exports.users = users;
