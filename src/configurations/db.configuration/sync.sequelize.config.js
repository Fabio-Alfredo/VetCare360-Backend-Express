import db from "../../models/index.js";


const syncDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await db.sequelize.sync({ force: false }); // Set force to true to drop and recreate tables
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw error;
  }
}


export default syncDatabase;
