import React, { useState } from "react";
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography, TextField, Button
} from "@mui/material";

const initialGrades = [
  { id: 1, student: "Alice", assignment: "Math HW1", grade: "A" },
  { id: 2, student: "Bob", assignment: "Math HW1", grade: "B+" }
];

const Gradebook = () => {
  const [grades, setGrades] = useState(initialGrades);
  const [editGrade, setEditGrade] = useState({});

  const handleChange = (id, value) => {
    setEditGrade(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = (id) => {
    setGrades(prev =>
      prev.map(g =>
        g.id === id ? { ...g, grade: editGrade[id] || g.grade } : g
      )
    );
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Gradebook
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Assignment</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Update Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map((g) => (
            <TableRow key={g.id}>
              <TableCell>{g.student}</TableCell>
              <TableCell>{g.assignment}</TableCell>
              <TableCell>{g.grade}</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="e.g. A+"
                  value={editGrade[g.id] ?? ""}
                  onChange={(e) => handleChange(g.id, e.target.value)}
                  sx={{ mr: 1, width: 80 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleSave(g.id)}
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Gradebook;