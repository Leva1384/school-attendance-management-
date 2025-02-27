import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Addclasses(){
  const navigate=useNavigate();
    const[calssId,setClassId]=useState("");
    const [className, setClassName] = useState("");
const [teacherId, setTeacherId] = useState("");
const handleSubmit = async (e) => { 
    e.preventDefault();
    const newClass = {
      id: calssId,
      class_name: className,
      teacher_id: teacherId
    };
  
    try {
      const response = await fetch("http://localhost:3001/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add class");
      }
  
      alert("Class added successfully!");
      navigate("/admin"); 
    } catch (error) {
      console.error("Error adding class:", error);
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
             id="class_Id"
             label="Class ID"
            type="number"
            value={calssId}
            onChange={(e)=>setClassId(e.target.value)}
           />
           <TextField
           
             id="class_name"
             label="Class Name"
          
             value={className}
             onChange={(e)=>setClassName(e.target.value)}
           
           />
           <TextField
             id="teacher_id"
             label="Teacher ID"
              type="number"
              value={teacherId}
              onChange={(e)=>setTeacherId(e.target.value)}
           />
          
          </div>
          <Button type="sumbit" variant="containd" color="primary">Add class</Button>
       </Box>
     );
}
export default Addclasses;