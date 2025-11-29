import React from "react";
import { Card, CardContent, Typography, Grid, Button, Box } from "@mui/material";

const assignments = [
  { title: "Math Homework 1", deadline: "2025-11-10", description: "Algebra and Geometry problems.", status: "Submitted" },
  { title: "Physics Lab Report", deadline: "2025-11-15", description: "Write-up on electric circuits.", status: "Not Submitted" }
];

const AssignmentList = ({ type }) => (
  <Box display="flex" justifyContent="center">
    <Grid container spacing={3} maxWidth={800} justifyContent="center">
    {assignments.map((a, idx) => (
      <Grid item xs={12} md={6} key={idx}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary">{a.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Deadline: {a.deadline}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{a.description}</Typography>
            <Typography variant="caption" color={a.status === "Submitted" ? "success.main" : "error"} sx={{ mt: 1, display: 'block' }}>
              Status: {a.status}
            </Typography>
            {type === "student" && (
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                {a.status === "Submitted" ? "View Submission" : "Submit Assignment"}
              </Button>
            )}
            {type === "teacher" && (
              <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
                View Submissions
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    ))}
    </Grid>
  </Box>
);
export default AssignmentList;