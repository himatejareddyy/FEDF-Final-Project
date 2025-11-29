import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // "teacher" or "student"
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "teacher") {
      navigate("/teacher");
    } else if (role === "student") {
      navigate("/student");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd 0%, #e8f5e9 50%, #fffde7 100%)"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 420,
          borderRadius: 4,
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)"
        }}
      >
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, textAlign: "center" }}>
          Login
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}>
          Sign in to continue to EduSubmit
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            margin="normal"
            required
          >
            <option value="">Select Role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1 }}
          >
            LOGIN
          </Button>
        </form>

        <Button
          onClick={() => navigate("/signup")}
          fullWidth
          sx={{ mt: 2, textTransform: "none" }}
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;