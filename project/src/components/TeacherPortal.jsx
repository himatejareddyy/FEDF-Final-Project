import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeacherPortal = () => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", dueDate: "" });
  const navigate = useNavigate();

  // Fetch assignments on load
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleCreateAssignment = async () => {
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setOpen(false);
        setFormData({ title: "", description: "", dueDate: "" });
        fetchAssignments(); // Refresh list
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Assignments
        </Typography>
        <Box>
          {/* ✅ FIXED: Line 58 - Correct URL */}
          <Button
            href="/teacher/grades"
            variant="outlined"
            sx={{ mr: 2, px: 4, py: 1.2 }}
          >
            📊 Grades
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ px: 4, py: 1.2 }}
          >
            + New Assignment
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{assignment.title}</TableCell>
                <TableCell>{assignment.description}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Assignment Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateAssignment}
            disabled={!formData.title || !formData.dueDate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherPortal;
