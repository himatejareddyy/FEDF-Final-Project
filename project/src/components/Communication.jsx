import React from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";

const Communication = () => (
  <Box display="flex" justifyContent="center">
    <Paper elevation={2} sx={{ padding: 4, width: 350 }}>
      <Typography variant="h6" gutterBottom>
        Communication
      </Typography>
      <TextField label="Message" fullWidth multiline rows={3} margin="normal"/>
      <Button variant="contained" color="primary" fullWidth>
        Send Message
      </Button>
    </Paper>
  </Box>
);
export default Communication;