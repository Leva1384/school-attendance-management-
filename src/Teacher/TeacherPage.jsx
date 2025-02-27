import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TeacherPage = () => {
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userAuth"));
        const storedStudents = JSON.parse(localStorage.getItem("students"));

        if (!user || user.role !== "teacher") {
            navigate("/login");
        } else {
            setStudents(storedStudents || []);
        }
    }, [navigate]);
    
    const handleChange = async (event, studentId) => {
        const status = event.target.value;
    
        if (!studentId) {
            console.error("Student ID is missing!");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3001/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, status }),
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update attendance");
    
            console.log("Attendance updated successfully", data);
        } catch (error) {
            console.error("Error updating attendance:", error);
        }
    };
    

    return (
        <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Your Students
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="students table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell align="right">Class Name</TableCell>
                        <TableCell align="right">Attendance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No students available
                            </TableCell>
                        </TableRow>
                    ) : (
                        students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.student_name}</TableCell>
                                <TableCell align="right">{student.class_name}</TableCell>
                                <TableCell align="right">
                                    <FormControl fullWidth>
                                        <InputLabel>Attendance</InputLabel>
                                        <Select
    value={student.attendance || ""}
    label="Attendance"
    onChange={(event) => handleChange(event, student.id)} 
>
    <MenuItem value="present">Present</MenuItem>
    <MenuItem value="absent">Absent</MenuItem>
    <MenuItem value="delay">Delay</MenuItem>
</Select>


                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TeacherPage;
