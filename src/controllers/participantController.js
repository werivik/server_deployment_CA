import pool from "../config/db.js";
import validateParticipant from "../validators/participantValidator.js";

// POST /participants/add
export const addParticipant = async (req, res) => {
    const validation = validateParticipant(req.body);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    const { email, firstname, lastname, dob, companyname, salary, currency, country, city } = req.body;

    try {
        await pool.query(
            "INSERT INTO participants (email, firstname, lastname, dob) VALUES (?, ?, ?, ?)",
            [email, firstname, lastname, dob]
        );
        await pool.query(
            "INSERT INTO work (email, companyname, salary, currency) VALUES (?, ?, ?, ?)",
            [email, companyname, salary, currency]
        );
        await pool.query(
            "INSERT INTO home (email, country, city) VALUES (?, ?, ?)",
            [email, country, city]
        );

        return res.status(201).json({ message: "Participant added successfully" });
    } 
    catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "A participant with that email already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

// GET /participants
export const getAllParticipants = async (req, res) => {
    try {
        let [rows] = await pool.query(`
            SELECT p.email, p.firstname, p.lastname, DATE_FORMAT(p.dob, '%Y-%m-%d') AS dob,
                w.companyname, w.salary, w.currency,
                h.country, h.city
            FROM participants p
            JOIN work w ON p.email = w.email
            JOIN home h ON p.email = h.email
        `);

        rows = rows.map(row => ({ ...row, salary: parseFloat(row.salary) }));

        return res.status(200).json({ participants: rows });
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// GET /participants/details
export const getAllDetails = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT firstname, lastname, email FROM participants"
        );

        return res.status(200).json({ participants: rows });
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// GET /participants/details/:email
export const getDetailsByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT firstname, lastname, DATE_FORMAT(dob, '%Y-%m-%d') AS dob FROM participants WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Participant not found" });
        }

        return res.status(200).json({ participant: rows[0] });
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// GET /participants/work/:email
export const getWorkByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        let [rows] = await pool.query(
            "SELECT companyname, salary, currency FROM work WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Participant not found" });
        }

        rows = rows.map(row => ({ ...row, salary: parseFloat(row.salary) }));

        return res.status(200).json({ work: rows[0] });
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// GET /participants/home/:email
export const getHomeByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT country, city FROM home WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Participant not found" });
        }

        return res.status(200).json({ home: rows[0] });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /participants/:email
export const updateParticipant = async (req, res) => {
    const { email } = req.params;

    const validation = validateParticipant(req.body);
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    const { firstname, lastname, dob, companyname, salary, currency, country, city } = req.body;

    try {
        const [existing] = await pool.query(
            "SELECT email FROM participants WHERE email = ?",
            [email]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: "Participant not found" });
        }

        await pool.query(
            "UPDATE participants SET firstname = ?, lastname = ?, dob = ? WHERE email = ?",
            [firstname, lastname, dob, email]
        );
        await pool.query(
            "UPDATE work SET companyname = ?, salary = ?, currency = ? WHERE email = ?",
            [companyname, salary, currency, email]
        );
        await pool.query(
            "UPDATE home SET country = ?, city = ? WHERE email = ?",
            [country, city, email]
        );

        return res.status(200).json({ message: "Participant updated successfully" });
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /participants/:email
export const deleteParticipant = async (req, res) => {
    const { email } = req.params;

    try {
        const [existing] = await pool.query(
            "SELECT email FROM participants WHERE email = ?",
            [email]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: "Participant not found" });
        }

        await pool.query(
            "DELETE FROM participants WHERE email = ?",
            [email]
        );

        return res.status(200).json({ message: "Participant deleted successfully" });
    } 
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};