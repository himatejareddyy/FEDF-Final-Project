import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // "teacher" or "student"
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign up and navigation
    if (role === "teacher") {
      navigate("/teacher");
    } else if (role === "student") {
      navigate("/student");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
      <Paper elevation={3} sx={{ padding: 5, width: 350 }}>
        <Typography variant="h5" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={e => setRole(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
            required
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
        <Button onClick={() => navigate("/login")} sx={{ mt: 2 }} fullWidth>
          Already have an account? Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Signup;