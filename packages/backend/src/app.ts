import express from "express";
import cors from "cors";
import routes from "./routes/index.ts";

const app = express();

app.use(cors());
app.use(express.json());

// Mount API
app.use("/api/v1", routes);

app.get("/", (_req, res) => {
    res.send("StackIt Backend API is running");
});

export default app;
