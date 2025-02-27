const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router = express.Router();
const DATABASE_URL = 'postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);


router.post("/", async (request, response) => {
    try {
      const { class_id } = request.body;
  
      if (!class_id) {
        return response.json({ error: true, message: "Class ID is missing" });
      }
  
      const students = await sql`SELECT * FROM students WHERE class_id = ${class_id}`;
      console.log(`Students for class ${class_id}:`, students);
  
      return response.json(students);
    } catch (error) {
      console.error("Database error:", error);
      response.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });
  
  
module.exports = router;
