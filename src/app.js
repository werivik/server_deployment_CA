import express from "express";
import basicAuth from "./middleware/auth.js";
import participantRoutes from "./routes/participants.js";

const app = express();

app.use(express.json());
app.use(basicAuth);

app.use("/participants", participantRoutes);

export default app;