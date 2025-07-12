import { Sequelize } from "sequelize";
import app from "../../app.ts"; // Your Express app
import request from "supertest";

export const sequelize = new Sequelize(
    process.env.DB_TEST_NAME!,
    process.env.DB_TEST_USER!,
    process.env.DB_TEST_PASSWORD!,
    {
        host: process.env.DB_TEST_HOST!,
        dialect: "postgres",
        logging: false,
    },
);

// Re-import and re-init models if needed
import { initModels } from "../../models/index.ts";
initModels(sequelize);

// Sync all models (create tables)
export const setupTestDB = async () => {
    await sequelize.sync({ force: true });
};

export const api = request(app);
