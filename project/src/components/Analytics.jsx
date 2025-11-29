import React from "react";
import { Paper, Box, Typography, LinearProgress } from "@mui/material";

const Analytics = () => (
  <Box display="flex" justifyContent="center">
    <Paper elevation={3} sx={{ padding: 4, width: 340 }}>
      <Typography variant="h5" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body2" gutterBottom>
        Class average: 85%
      </Typography>
      <LinearProgress variant="determinate" value={85} sx={{ mb: 2 }} />
      <Typography variant="body2" gutterBottom>
        Submission Rate: 93%
      </Typography>
      <LinearProgress variant="determinate" value={93} sx={{ mb: 2, bgcolor: "#ffc107" }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        (Add charts for grade distribution with Recharts or Chart.js for next-level visuals)
      </Typography>
    </Paper>
  </Box>
);
export default Analytics;