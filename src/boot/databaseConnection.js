const { Sequelize } = require("sequelize");
// import env variables in file
require("dotenv").config();
//set up database using sequelize
const con = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

async function connectDatabase() {
  try {
    await con.authenticate();
    console.log("Database Connected!!");
  } catch (error) {
    console.log("Unable to connect to database:", error);
  }
}

connectDatabase();

module.exports.con = con;
