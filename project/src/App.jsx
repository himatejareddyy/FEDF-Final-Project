import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TeacherPortal from "./components/TeacherPortal";
import StudentPortal from "./components/StudentPortal";
import AssignmentList from "./components/AssignmentList";
import AssignmentCreate from "./components/AssignmentCreate";
import Gradebook from "./components/Gradebook";
import Analytics from "./components/Analytics";
import Communication from "./components/Communication";
import SubmissionForm from "./components/SubmissionForm";
import Feedback from "./components/Feedback";
import "./App.css";


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher" element={<TeacherPortal />}>
          <Route path="assignments" element={<AssignmentList type="teacher" />} />
          <Route path="create" element={<AssignmentCreate />} />
          <Route path="gradebook" element={<Gradebook />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="communication" element={<Communication />} />
        </Route>
        <Route path="/student" element={<StudentPortal />}>
          <Route path="assignments" element={<AssignmentList type="student" />} />
          <Route path="submit" element={<SubmissionForm />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;