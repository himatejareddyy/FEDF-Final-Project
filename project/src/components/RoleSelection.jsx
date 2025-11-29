import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={5} sx={{ padding: 5, maxWidth: 420, textAlign: 'center' }}>
        <Typography variant="h3" color="primary" gutterBottom>EduSubmit</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Assignment Submission & Grading System
        </Typography>
        <Typography variant="body2" marginY={2}>Welcome! Please select your role to proceed with our assignment system.</Typography>
        <Button onClick={() => navigate("/teacher")} variant="contained" sx={{ mt: 2, mb: 1 }} fullWidth>
          Continue as Teacher
        </Button>
        <Button onClick={() => navigate("/student")} color="secondary" variant="contained" fullWidth>
          Continue as Student
        </Button>
        <Typography variant="caption" display="block" marginTop={4} color="text.secondary">
          Sample users: <br />
          <strong>Teacher:</strong> teacher1@school.com<br />
          <strong>Student:</strong> student1@school.com
        </Typography>
      </Paper>
    </Box>
  );
};
export default RoleSelection;