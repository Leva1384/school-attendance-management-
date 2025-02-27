// const express=require("express");
// const { neon } = require("@neondatabase/serverless");
// const router=express.Router();
// const DATABASE_URL='postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
// const sql = neon(DATABASE_URL);
// router.post('/',async(request,response)=>{
//     const {username, password}=request.body
//     try{
//     const foundUser=await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
//     console.log(foundUser);
//     if(foundUser && foundUser.length>0){
//        return response.send({user: foundUser[0]});
//     }
   
//     response.send({error:true,message:'wrong username and/or password'});
// }catch (error) {
//     console.error("Database error:", error);
//     response.status(500).json({ error: true, message: 'Internal Server Error' });
// }
// });
// module.exports=router;
const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router = express.Router();

const DATABASE_URL = "postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

router.post("/", async (request, response) => {
    const { username, password } = request.body;

    try {
        const foundUser = await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;

        if (foundUser.length > 0) {
            const user = foundUser[0];

            if (user.role === "teacher") {
                const students = await sql`
                    SELECT students.id, students.student_name, students.class_id, classes.class_name
                    FROM students
                    JOIN classes ON students.class_id = classes.id
                    WHERE classes.teacher_id = ${user.id}
                `;

                return response.send({
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                    },
                    students: students,
                });
            }

            return response.send({
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
                students: [],
            });
        } else {
            return response.send({ error: true, message: "Wrong username and/or password" });
        }
    } catch (error) {
        console.error("Database error:", error);
        response.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;

