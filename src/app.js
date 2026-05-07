import express from "express";
import basicAuth from "./middleware/auth.js";
import participantRoutes from "./routes/participants.js";

const app = express();

// parse incoming requests as JSON
app.use(express.json());

// Protect all routes with Basic Authentication
app.use(basicAuth);

// All participant routes are prefixed wth /participants
app.use("/participants", participantRoutes);

export default app;