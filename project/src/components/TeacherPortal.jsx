import React from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography, Toolbar, AppBar, Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, Outlet } from "react-router-dom";

// Decorative background shapes for visual enhancement
const bgShapeStyle = {
  position: "absolute",
  zIndex: 0,
  width: 220,
  height: 220,
  background: "radial-gradient(circle, #e3f2fd 80%, transparent 100%)",
  borderRadius: "50%",
  top: "-50px",
  left: "40px",
  opacity: 0.5,
};
const bgShapeStyle2 = {
  position: "absolute",
  zIndex: 0,
  width: 120,
  height: 120,
  background: "radial-gradient(circle, #ffe0b2 92%, transparent 100%)",
  borderRadius: "50%",
  bottom: "140px",
  right: "70px",
  opacity: 0.5,
};

const portalOptions = [
  {
    label: "Assignments",
    description: "View & manage assignments for your courses.",
    icon: <AssignmentIcon sx={{ fontSize: 38, color: "#1976d2" }} />,
    path: "assignments",
    color: "#e3f2fd"
  },
  {
    label: "Create",
    description: "Add a new assignment for students.",
    icon: <AddIcon sx={{ fontSize: 38, color: "#43a047" }} />,
    path: "create",
    color: "#f1f8e9"
  },
  {
    label: "Gradebook",
    description: "View grades and performance.",
    icon: <PeopleIcon sx={{ fontSize: 38, color: "#ef6c00" }} />,
    path: "gradebook",
    color: "#ffe0b2"
  },
  {
    label: "Analytics",
    description: "Monitor submission stats & insights.",
    icon: <AnalyticsIcon sx={{ fontSize: 38, color: "#00838f" }} />,
    path: "analytics",
    color: "#e0f7fa"
  },
  {
    label: "Communication",
    description: "Contact and announce to your class.",
    icon: <MessageIcon sx={{ fontSize: 38, color: "#6a1b9a" }} />,
    path: "communication",
    color: "#ede7f6"
  }
];

const TeacherPortal = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f8fb", position: "relative" }}>
      <Box sx={bgShapeStyle} />
      <Box sx={bgShapeStyle2} />
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>Teacher Portal</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" pb={8} pt={8} sx={{ zIndex: 1, position: "relative" }}>
        <Typography variant="h4" sx={{ mb: 5, fontWeight: 700, color: "#1976d2" }}>
          Quick Actions
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
                <CardActionArea onClick={() => navigate(`/teacher/${option.path}`)}>
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

export default TeacherPortal;