const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router = express.Router();

const DATABASE_URL = "postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

router.delete("/", async (request, response) => {

  const { ids } = request.body;

  
    try{

  const deletedRows = await sql`
  DELETE FROM classes WHERE id = ANY(${ids}) RETURNING *;
`;

    console.log("Deleted rows:", deletedRows);

    response.json({ success: true, deleted: deletedRows });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).json({ error: true, message: error.message });
  }
});

module.exports = router;
