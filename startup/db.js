const config = require("config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.get("DB.DATABASE"),
  config.get("DB.USER"),
  config.get("DB.PASSWORD"),
  {
    define: {
      createdAt: "created_date",
      updatedAt: "modified_date"
    },
    host: config.get("DB.HOST"),
    dialect: "postgres",
    logging:
      process.env.NODE_ENV === "production"
        ? false
        : function(log) {
            return console.log(log);
          }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
