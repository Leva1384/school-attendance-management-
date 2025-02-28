import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function AddTeacher(){
  const navigate=useNavigate();
    const[teacherID,setTeacherID]=useState("");
    const [teacherUsername, setTeacherUsername] = useState("");
const [teacherPassword, setTeacherPassword] = useState("");
const [role,setRole]=useState("teacher");
const handleSubmit = async (e) => { 
    e.preventDefault();
    const newTeacher = {
      id: teacherID,
      username: teacherUsername,
      password: teacherPassword,
      role:role
    };
  
    try {
      const response = await fetch("http://school.geoparchin.com/api/admin/addTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeacher),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add teacher");
      }
  
      alert("Teacher added successfully!");
      navigate("/admin"); 
    } catch (error) {
      console.error("Error adding teacher:", error);
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
             id="teacher_ID"
             label="Teacher ID"
            type="number"
            value={teacherID}
            onChange={(e)=>setTeacherID(e.target.value)}
           />
           <TextField
           
             id="teacher_username"
             label="Teacher username"
          
             value={teacherUsername}
             onChange={(e)=>setTeacherUsername(e.target.value)}
           
           />
           <TextField
             id="teacher_password"
             label="Teacher password"
              type="password"
              value={teacherPassword}
              onChange={(e)=>setTeacherPassword(e.target.value)}
           />
          <TextField
       id="role"
       label="Role"
       value={role}
       InputProps={{ readOnly: true }}
            />
          </div>
          <Button type="sumbit" variant="containd" color="primary">Add teacher</Button>
       </Box>
     );
}
export default AddTeacher;