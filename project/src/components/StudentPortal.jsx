import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentPortal = () => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionContent, setSubmissionContent] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // Success/Error message
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("/api/assignments");
      if (!res.ok) throw new Error("No assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]); // Show empty table
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting:", selectedAssignment.id, submissionContent); // DEBUG
    try {
      const res = await fetch(`/api/assignments/${selectedAssignment.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: 2, // student1@school.com
          content: submissionContent
        })
      });

      console.log("Submit response:", res.status); // DEBUG

      if (res.ok) {
        setOpen(false);
        setSubmissionContent("");
        setSubmitStatus("✅ Submitted successfully! Teacher can now grade it.");
        fetchAssignments(); // Refresh list
        setTimeout(() => setSubmitStatus(""), 5000); // Hide message
      } else {
        setSubmitStatus("❌ Submission failed. Check backend.");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      setSubmitStatus("❌ Network error. Is backend running?");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Available Assignments
      </Typography>

      {/* Success/Error Alert */}
      {submitStatus && (
        <Alert severity={submitStatus.includes("✅") ? "success" : "error"} sx={{ mb: 3 }}>
          {submitStatus}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                  <Typography>No assignments available. Ask teacher to create one.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              assignments.map((assignment) => (
                <TableRow key={assignment.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{assignment.title}</TableCell>
                  <TableCell>{assignment.description}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setOpen(true);
                        setSubmitStatus("");
                      }}
                    >
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Submission Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Submit Assignment: {selectedAssignment?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" mb={2}>
            {selectedAssignment?.description}
          </Typography>
          <TextField
            label="Your Submission"
            multiline
            rows={6}
            fullWidth
            value={submissionContent}
            onChange={(e) => setSubmissionContent(e.target.value)}
            placeholder="Write your answer here..."
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!submissionContent.trim()}
          >
            Submit Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentPortal;
