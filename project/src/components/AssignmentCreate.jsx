import React from "react";
import { Paper, Box, Typography, TextField, Button } from "@mui/material";

const AssignmentCreate = () => (
  <Box display="flex" justifyContent="center">
    <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
      <Typography variant="h5" gutterBottom>
        Create Assignment
      </Typography>
      <form>
        <TextField label="Title" variant="outlined" fullWidth margin="normal" />
        <TextField
          label="Deadline"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
    </Paper>
  </Box>
);
export default AssignmentCreate;