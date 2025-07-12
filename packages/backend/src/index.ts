import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { initModels } from "./models/index.ts";
import app from "./app.ts";

dotenv.config();

const PORT = process.env.PORT || 5000;

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
    console.log("Database synced");
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
