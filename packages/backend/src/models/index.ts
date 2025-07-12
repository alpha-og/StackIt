import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import user from "./user.ts";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false,
    },
);

// Import models
const db = {
    sequelize,
    Sequelize,
    User: user(sequelize),
};

export default db;
