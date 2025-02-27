const express = require("express");
const { neon } = require("@neondatabase/serverless");

const router = express.Router();

const DATABASE_URL = "postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

router.get("/", async (req, res) => { 
    try {
        const students = await sql`SELECT * FROM students`;
        res.json(students);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: true, message: "Failed to fetch students" });
    }
});

module.exports = router;
