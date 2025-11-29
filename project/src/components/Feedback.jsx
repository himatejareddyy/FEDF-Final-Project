import React from "react";
import { Paper, List, ListItem, ListItemText, Typography, Box } from "@mui/material";

const feedbacks = [
  { assignment: "Assignment 1", text: "Good work, try to improve on next question." },
  { assignment: "Assignment 2", text: "Excellent submission!" }
];

const Feedback = () => (
  <Box display="flex" justifyContent="center">
    <Paper elevation={2} sx={{ padding: 4, width: 350 }}>
      <Typography variant="h6" gutterBottom>
        Feedback
      </Typography>
      <List>
        {feedbacks.map((f, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={f.assignment}
              secondary={f.text}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  </Box>
);
export default Feedback;