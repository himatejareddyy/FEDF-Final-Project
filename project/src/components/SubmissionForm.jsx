import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const SubmissionForm = () => (
  <Box display="flex" justifyContent="center" minHeight="60vh">
    <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
      <Typography variant="h5" gutterBottom>Submit Assignment</Typography>
      <form>
        <TextField
          label="Assignment Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          color="primary"
          fullWidth
          sx={{marginBottom:2}}
        >
          Upload File
          <input type="file" hidden />
        </Button>
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Submit
        </Button>
      </form>
    </Paper>
  </Box>
);

export default SubmissionForm;