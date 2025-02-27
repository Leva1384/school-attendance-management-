const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router=express.Router();
const DATABASE_URL='postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
const sql = neon(DATABASE_URL);
router.post('/', async (request, response) => {
    const { id, username,password,role } = request.body; 

    if (!id || !username|| !password||!role) {
        return response.status(400).json({ message: "All fields are required" });
    }

    try{
        const query = await sql`INSERT INTO users (id, username, password,role) VALUES (${id}, ${username}, ${password}, ${role})`;
        response.json({ message: "Teacher added successfully" });
        
    
    }catch(error){
        console.error("Error adding user:", error);
        response.status(500).json({ error: true, message: error.message });
        
            
        }
    

});
module.exports=router;