import pool from "../config/db.js";

const basicAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Missing or invalid authorization header" });
    }

    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [login, password] = decoded.split(":");
    console.log("Login:", login, "Password:", password);

    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE login = ? AND password = ?",
            [login, password]
        );
        console.log("DB rows:", rows);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        next();
    } catch (error) {
        console.log("DB error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default basicAuth;