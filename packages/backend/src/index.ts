import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { initModels } from "./models/index.ts";

dotenv.config();
const sequelize = new Sequelize(
    process.env.DB_DEV_NAME as string,
    process.env.DB_DEV_USER as string,
    process.env.DB_DEV_PASSWORD as string,
    {
        host: process.env.DB_DEV_HOST,
        port: Number(process.env.DB_DEV_PORT),
        dialect: "postgres",
        logging: false,
    },
);
initModels(sequelize);

sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Database synced");
});
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("StackIt Backend API is running");
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
