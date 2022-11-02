const { con } = require("../boot/databaseConnection");
const { DataTypes } = require("sequelize");

const ACTIVE_STATE = "active";
const ARCHIVED_STATE = "archived";
const REJECTED_STATE = "rejected";

// define posts model
const posts = con.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  state: {
    type: DataTypes.STRING,
    validate: {
      isIn: [[ACTIVE_STATE, ARCHIVED_STATE, REJECTED_STATE]],
    },
  },
  created_by_id: {
    type: DataTypes.INTEGER,
    defaultValue: 100050,
    validate: {
      isNumeric: true,
    },
  },
  created_at: {
    type: DataTypes.DATEONLY,
    defaultValue: con.literal("CURRENT_TIMESTAMP"),
  },
  updated_at: {
    type: DataTypes.DATEONLY,
    defaultValue: con.literal("CURRENT_TIMESTAMP"),
  },
});

posts.addHook("beforeCreate", (posts, options) => {
  console.log("Inserting records");
});

module.exports.posts = posts;
