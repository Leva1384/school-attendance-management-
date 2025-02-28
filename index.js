require('dotenv').config();


const express = require("express");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");


const app = express();


const DATABASE_URL = "postgresql://neondb_owner:npg_fYakZK5bTRH8@ep-purple-glade-a8tgoeci-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

app.use(express.json());
app.use(cors());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const loginRoutes = require("./login");
app.use("/login", loginRoutes);

const adminClassesRoutes = require("./Admin/classes");
app.use("/admin/classes", adminClassesRoutes);

const studentsRoutes = require("./students");
app.use("/students", studentsRoutes);

const deleteClassesRoutes=require("./Admin/delete");
app.use("/admin/delete",deleteClassesRoutes);

const deleteStudentsRoutes = require("./deleteStudents");
app.use("/deleteStudents", deleteStudentsRoutes);
 const addClassesRoutes=require("./Admin/add");
 app.use("/admin/add",addClassesRoutes);
 const addTeachersRoutes=require("./Admin/addTeacher");
 app.use("/admin/addTeacher",addTeachersRoutes);
 const addStudentsRoutes=require("./addStudents");
 app.use("/addStudents",addStudentsRoutes);
 const teacherClassesRoutes=require("./Teacher/class");
 app.use("/teacher/class",teacherClassesRoutes);
//  const attendanceStudentsRoutes = require("./attendance");
// app.use("/attendance", attendanceStudentsRoutes); 

app.get("/db-test", async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    res.json({ database_version: result[0].version });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
});
const port = process.env.PORT || 3001; // Use the port provided by the hosting service, or default to 3001
app.listen(port, "0.0.0.0", () => console.log(`Server is running at http://school.geoparchin.com`));
