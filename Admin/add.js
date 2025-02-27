const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router=express.Router();
const DATABASE_URL='postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
const sql = neon(DATABASE_URL);
router.post('/', async (request, response) => {
    const { id, class_name, teacher_id } = request.body; 

    if (!id || !class_name || !teacher_id) {
        return response.status(400).json({ message: "All fields are required" });
    }

    try{
        const query = await sql`INSERT INTO classes (id, class_name, teacher_id) VALUES (${id}, ${class_name}, ${teacher_id})`;
        response.json({ message: "Class added successfully" });
        
    
    }catch(error){
        console.error("Error adding class:", error);
        response.status(500).json({ error: true, message: error.message });
        
            
        }
    

});
module.exports=router;