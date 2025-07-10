import app from "./src/app.js";
import { currentConfig } from "./src/configurations/common.configuration/config.js";
import syncDatabase from "./src/configurations/db.configuration/sync.sequelize.config.js";

const startServer = async () => {
  try {
    await syncDatabase();
    const port = currentConfig.port;

    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} in ${currentConfig.environment} mode.`
      );
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
