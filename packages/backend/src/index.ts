import express from "express";
import cors from "cors";
import db from "./models/index.ts";

db.sequelize
    .authenticate()
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));

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
