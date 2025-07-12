import { beforeAll, afterAll } from "vitest";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initModels } from "./src/models";

dotenv.config(); // Use a separate .env.test for test database credentials

let sequelize: Sequelize;

beforeAll(async () => {
    sequelize = new Sequelize(
        process.env.DB_TEST_NAME as string,
        process.env.DB_TEST_USER as string,
        process.env.DB_TEST_PASSWORD as string,
        {
            host: process.env.DB_TEST_HOST,
            port: Number(process.env.DB_TEST_PORT),
            dialect: "postgres",
            logging: false,
        },
    );

    initModels(sequelize);

    // Rely on force: true to handle dropping and recreating everything
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

