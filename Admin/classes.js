const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router=express.Router();
const DATABASE_URL='postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
const sql = neon(DATABASE_URL);
router.get('/',async(request,response)=>{
    try{
        const classes=await sql`SELECT * FROM classes`;
        response.json(classes);

    }catch(error){
       
            console.error("Database error:", error);
            response.status(500).json({ error: true, message: "Failed to fetch classes" });
        }
    

});
module.exports=router;