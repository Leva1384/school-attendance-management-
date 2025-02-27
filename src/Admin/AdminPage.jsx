
import { useState, useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Tooltip } from "@mui/material";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Row({ row, students, selectedClasses, onCheckboxClick, isAllClassesSelected, onDeleteStudents }) {
  const [open, setOpen] = React.useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const filteredStudents = students.filter(student => student.class_id === row.id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedStudents(filteredStudents.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleCheckboxClick = (event, id) => {
    const selectedIndex = selectedStudents.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedStudents, id);
    } else {
      newSelected = newSelected.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1)
      );
    }

    setSelectedStudents(newSelected);
  };
  const handleDeleteStudents = async () => {
    try {
      await onDeleteStudents(selectedStudents);
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error deleting students:', error);
    }
  };

  const isAllStudentsSelected = filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length;

  const isSomeStudentsSelected = selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isAllClassesSelected || selectedClasses.includes(row.id)}
            indeterminate={!isAllClassesSelected && selectedClasses.includes(row.id)}
            onChange={(event) => onCheckboxClick(event, row.id)}
            inputProps={{
              'aria-label': 'select class',
            }}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.class_name}
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.teacher_id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Students
              </Typography>
              {selectedStudents.length > 0 && (
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteStudents}>
                  Delete
                </Button>
              )}
              <Table size="small" aria-label="students">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={isSomeStudentsSelected}
                        checked={isAllStudentsSelected}
                        onChange={handleSelectAllClick}
                        inputProps={{
                          'aria-label': 'select all students',
                        }}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Class ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => {
                      const isSelected = selectedStudents.includes(student.id);
                      return (
                        <TableRow key={student.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isSelected}
                              onChange={(event) => handleCheckboxClick(event, student.id)}
                              inputProps={{
                                'aria-labelledby': `student-checkbox-${student.id}`,
                              }}
                            />
                          </TableCell>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.class_id}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No students available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CollapsibleTable({ rows, students, onDeleteClasses, onDeleteStudents, setSelectedClasses, selectedClasses}) {

  const handleCheckboxClickClasses = (event, id) => {
    const selectedIndex = selectedClasses.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedClasses, id);
    } else {
      newSelected = newSelected.concat(
        selectedClasses.slice(0, selectedIndex),
        selectedClasses.slice(selectedIndex + 1)
      );
    }

    setSelectedClasses(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedClasses(rows.map(row => row.id));
    } else {
      setSelectedClasses([]);
    }
  };

  const handleDeleteClasses = async () => {
    try {
      await onDeleteClasses(selectedClasses);
      setSelectedClasses([]);
    } catch (error) {
      console.error('Error deleting classes:', error);
    }
  };

  const isAllClassesSelected = rows.length > 0 && selectedClasses.length === rows.length;

  const isSomeClassesSelected = selectedClasses.length > 0 && selectedClasses.length < rows.length;

  return (
    <div>
      {selectedClasses.length > 0 && (
       
          <Button 
            variant="outlined" 
            startIcon={<DeleteIcon />} 
            onClick={handleDeleteClasses}
          >
            Delete
          </Button>
      )}
    <TableContainer component={Paper}>
   
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={isSomeClassesSelected}
                checked={isAllClassesSelected}
                onChange={handleSelectAllClick}
                inputProps={{
                  'aria-label': 'select all classes',
                }}
              />
            </TableCell>
            <TableCell>Class Name</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Teacher ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                students={students}
                selectedClasses={selectedClasses}
                onCheckboxClick={handleCheckboxClickClasses}
                isAllClassesSelected={isAllClassesSelected}
                onDeleteStudents={onDeleteStudents}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
   </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

const AdminPage = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await fetch("http://localhost:3001/admin/classes");
        const classData = await classResponse.json();
        setClasses(classData);
        

        const studentResponse = await fetch("http://localhost:3001/students");
        const studentData = await studentResponse.json();
        console.log("Fetched students:", studentData);
        setStudents(studentData);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  
const onDeleteClasses = async (selectedClasses) => {
    console.log("Selected classes for deletion:", selectedClasses);
    try {
      const response = await fetch("http://localhost:3001/admin/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedClasses }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete classes");
      }
  
      setClasses((prevClasses) =>
        prevClasses.filter((c) => !selectedClasses.includes(c.id))
    );
    setSelectedClasses([]);
} catch (error) {
    console.error("Error deleting classes:", error);
}
};
  const onDeleteStudents = async (selectedStudents) => {
    console.log("Selected students for deletion:", selectedStudents);
    try {
      const response = await fetch("http://localhost:3001/deleteStudents", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedStudents }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete students");
      }
  
      setStudents((prevStudents) =>
        prevStudents.filter((s) => !selectedStudents.includes(s.id))
    );
} catch (error) {
    console.error("Error deleting students:", error);
}
};
  
  return (
    <div style={{ padding: "20px" }}>
   <h1>Add class</h1>
   <button onClick={() => navigate("/Addclasses")}>Add Class</button>
   <h2>Add teacher</h2>
   <button onClick={()=>navigate("/AddTeacher")}>Add Teacher</button>
   <h3>Add student</h3>
   <button onClick={()=>navigate("/AddStudents")}>Add student</button>

      {classes.length > 0 ? (
        <CollapsibleTable rows={classes} students={students} onDeleteClasses={onDeleteClasses} onDeleteStudents={onDeleteStudents} setSelectedClasses={setSelectedClasses} selectedClasses={selectedClasses} />
      ) : (
        <Typography variant="h6">No classes available</Typography>
      )}
    </div>
  );
}

export default AdminPage;