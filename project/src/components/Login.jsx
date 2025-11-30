import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // "teacher" or "student"
  const [error, setError] = useState(""); // show API / validation errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log("Sending to backend:", { email, password, role });


    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Login failed");
        return;
      }

      const data = await res.json();
      // store logged-in user if you want to use later
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "teacher") {
        navigate("/teacher");
      } else if (data.role === "student") {
        navigate("/student");
      }
    } catch (err) {
      setError("Server error. Please try again.");
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
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #e8f5e9 50%, #fffde7 100%)"
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
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 600, textAlign: "center" }}
        >
          Login
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
        >
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
  onChange={(e) => setRole(e.target.value.toLowerCase())}
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

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
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
