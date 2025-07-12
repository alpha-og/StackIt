import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
    res.send("Hello from backend!");
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
