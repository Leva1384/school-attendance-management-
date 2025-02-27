const express = require("express");
const router = express.Router(); // Initialize the router

router.post("/", async (req, res) => {
    const { studentId, status } = req.body;

    if (!studentId || !status) {
        return res.status(400).json({ error: true, message: "Missing required fields" });
    }

    try {
        await sql`INSERT INTO attendance (student_id, date, status) 
                  VALUES (${studentId}, CURRENT_DATE, ${status})
                  ON CONFLICT (student_id, date) 
                  DO UPDATE SET status = EXCLUDED.status`;

        res.json({ success: true, message: "Attendance updated successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: true, message: "Failed to update attendance" });
    }
});

module.exports = router; // Export the router
