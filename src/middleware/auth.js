import pool from "../config/db.js";

// Middleware to protect all routes with Basic Authentication
const basicAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth header:", authHeader);

    // Check if the authorisation header exists and starts with "Basic"
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    // Decode the Base64 encoded credentials and split into login and password :)
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [login, password] = decoded.split(":");
    console.log("Login:", login, "Password:", password);

    try {
        // check if the credentials match the user in the databse
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE login = ? AND password = ?",
            [login, password]
        );
        console.log("DB rows:", rows);

        // if no user found - return 401 Unauthorised status!
        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Credentials are valid? Then move on to the next middleware or route!
        next();
    } 
    catch (error) {
        console.log("DB error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default basicAuth;