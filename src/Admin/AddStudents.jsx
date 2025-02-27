import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function AddStudents(){
  const navigate=useNavigate();
    const[studentID,setStudentID]=useState("");
    const [studentName, setStudentName] = useState("");
const [classId, setClassId] = useState("");
const handleSubmit = async (e) => { 
    e.preventDefault();
    const newStudents = {
      id: studentID,
      student_name: studentName,
      class_id: classId
    };
  
    try {
      const response = await fetch("http://localhost:3001/addStudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudents),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add student");
      }
  
      alert("Student added successfully!");
      navigate("/admin"); 
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  

   return (
       <Box
         component="form"
         sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
         noValidate
         autoComplete="off"
         onSubmit={handleSubmit}
       >
         <div>
           <TextField
             required
             id="student_Id"
             label="Student ID"
            type="number"
            value={studentID}
            onChange={(e)=>setStudentID(e.target.value)}
           />
           <TextField
           
             id="student_name"
             label="Student Name"
          
             value={studentName}
             onChange={(e)=>setStudentName(e.target.value)}
           
           />
           <TextField
             id="class_id"
             label="Class ID"
              type="number"
              value={classId}
              onChange={(e)=>setClassId(e.target.value)}
           />
          
          </div>
          <Button type="sumbit" variant="containd" color="primary">Add student</Button>
       </Box>
     );
}
export default AddStudents;