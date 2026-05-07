// Load environment variables from .env file before anything else
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";

// use PORT from .env file or fall back to 3000
const PORT = process.env.PORT || 3000;

// start the server!!
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});