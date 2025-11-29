import React from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, Toolbar, AppBar, Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import FeedbackIcon from "@mui/icons-material/Feedback";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate, Outlet } from "react-router-dom";

const bgShapeStyle = {
  position: "absolute",
  zIndex: 0,
  width: 120,
  height: 120,
  background: "radial-gradient(circle, #f1f8e9 70%, transparent 100%)",
  borderRadius: "50%",
  top: "40px",
  left: "70px",
  opacity: 0.55,
};
const bgShapeStyle2 = {
  position: "absolute",
  zIndex: 0,
  width: 140,
  height: 140,
  background: "radial-gradient(circle, #ffe0b2 80%, transparent 100%)",
  borderRadius: "50%",
  bottom: "55px",
  right: "140px",
  opacity: 0.45,
};

const portalOptions = [
  {
    label: "Assignments",
    description: "See all your assignments and track deadlines.",
    icon: <AssignmentIcon sx={{ fontSize: 38, color: "#1976d2" }}/>,
    path: "assignments",
    color: "#e3f2fd"
  },
  {
    label: "Submit",
    description: "Upload your assignment submissions easily.",
    icon: <SendIcon sx={{ fontSize: 38, color: "#43a047" }}/>,
    path: "submit",
    color: "#f1f8e9"
  },
  {
    label: "Feedback",
    description: "Review feedback and grades from your teachers.",
    icon: <FeedbackIcon sx={{ fontSize: 38, color: "#ef6c00" }}/>,
    path: "feedback",
    color: "#ffe0b2"
  },
  {
    label: "Badges",
    description: "Earn badges for excellent performance.",
    icon: <EmojiEventsIcon sx={{ fontSize: 38, color: "#ff9800" }} />,
    path: "badges",
    color: "#fffde7"
  }
];

const StudentPortal = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f8fb", position: "relative" }}>
      <Box sx={bgShapeStyle} />
      <Box sx={bgShapeStyle2} />
      <AppBar position="static" color="secondary" elevation={3}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>Student Portal</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" pb={8} pt={8} sx={{ zIndex: 1, position: "relative" }}>
        <Typography variant="h4" sx={{ mb: 5, fontWeight: 700, color: "#43a047" }}>
          What would you like to do?
        </Typography>
        <Grid container spacing={5} justifyContent="center" alignItems="center" maxWidth={950}>
          {portalOptions.map((option, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  bgcolor: option.color,
                  borderRadius: 4,
                  boxShadow: 7,
                  position: 'relative',
                  transition: "transform 0.25s",
                  ":hover": { transform: "scale(1.07)", boxShadow: 16 }
                }}
              >
                <CardActionArea onClick={() => navigate(`/student/${option.path}`)}>
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    {option.icon}
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>{option.label}</Typography>
                    <Typography variant="body2" sx={{ mt: 2, color: "#455a64" }}>{option.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Nested portal routes render here */}
        <Box sx={{ width: "100%", mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentPortal;