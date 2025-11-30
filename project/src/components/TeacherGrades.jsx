import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@mui/material";

const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [gradeForm, setGradeForm] = useState({ grade: "", feedback: "" });

  useEffect(() => {
    fetchGrades();
  }, []);

  async function fetchGrades() {
    try {
      const res = await fetch("/api/grades");
      const data = await res.json();
      setGrades(data);
    } catch (e) {
      console.error("Error fetching grades:", e);
    }
  }

  async function handleGradeSubmit() {
    if (!selectedGrade) return;

    try {
      const res = await fetch(`/api/grades/${selectedGrade.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gradeForm),
      });
      if (res.ok) {
        setOpen(false);
        setGradeForm({ grade: "", feedback: "" });
        setSelectedGrade(null);
        await fetchGrades(); // Refresh list
      } else {
        console.error("Failed to save grade");
      }
    } catch (e) {
      console.error("Error submitting grade:", e);
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Grade Submissions
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Assignment</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Submission</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No submissions yet.
                </TableCell>
              </TableRow>
            ) : (
              grades.map((g) => (
                <TableRow key={g.id} hover>
                  <TableCell>{g.assignmentTitle || "N/A"}</TableCell>
                  <TableCell>{g.studentEmail || "Unknown"}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>{g.content}</TableCell>
                  <TableCell>{g.grade || "Not Graded"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedGrade(g);
                        setGradeForm({ grade: g.grade || "", feedback: g.feedback || "" });
                        setOpen(true);
                      }}
                    >
                      {g.grade ? "Edit" : "Grade"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Grade dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Grade Submission</DialogTitle>
        <DialogContent>
          <TextField
            label="Grade (A-F)"
            value={gradeForm.grade}
            onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={gradeForm.feedback}
            onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGradeSubmit}>
            Save Grade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherGrades;
