const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// In-memory data
const users = [
  { id: 1, email: "teacher1@school.com", password: "teacher123", role: "teacher" },
  { id: 2, email: "student1@school.com", password: "student123", role: "student" }
];

let assignments = [
  { id: 1, title: "Math Homework 1", description: "Solve problems 1-10", dueDate: "2025-12-01", teacherId: 1 }
];
let submissions = []; // Student submissions

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

// AUTH ROUTES
app.post("/api/auth/login", (req, res) => {
  console.log("🔐 Login attempt:", req.body);
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log("✅ Login success:", user.email);
  res.json({ id: user.id, email: user.email, role: user.role });
});

app.post("/api/auth/signup", (req, res) => {
  console.log("📝 Signup attempt:", req.body);
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { id: users.length + 1, email, password, role };
    users.push(newUser);
    console.log("✅ New user created:", newUser.email);
    res.status(201).json({ id: newUser.id, email: newUser.email, role: newUser.role });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ASSIGNMENT ROUTES
app.get("/api/assignments", (req, res) => {
  console.log("📋 Fetching assignments:", assignments.length);
  res.json(assignments);
});

app.post("/api/assignments", (req, res) => {
  console.log("➕ Create assignment:", req.body);
  const { title, description, dueDate } = req.body;
  const newAssignment = {
    id: assignments.length + 1,
    title, description, dueDate,
    teacherId: 1,
    createdAt: new Date().toISOString()
  };
  assignments.push(newAssignment);
  console.log("✅ Assignment created:", newAssignment.title);
  res.status(201).json(newAssignment);
});

// STUDENT SUBMISSION ROUTE ✅
app.post("/api/assignments/:id/submit", (req, res) => {
  console.log("📤 STUDENT SUBMIT:", req.params.id, req.body);
  const assignmentId = parseInt(req.params.id);
  const { studentId, content } = req.body;
  
  const submission = {
    id: submissions.length + 1,
    assignmentId, 
    studentId, 
    content,
    submittedAt: new Date().toISOString(),
    grade: null,
    feedback: null
  };
  
  submissions.push(submission);
  console.log("✅ Submission saved! ID:", submission.id);
  res.status(201).json(submission);
});

// TEACHER GRADES ROUTE ✅
app.get("/api/grades", (req, res) => {
  console.log("📊 Fetching grades:", submissions.length, "submissions");
  const grades = submissions.map(s => ({
    id: s.id,
    assignmentTitle: assignments.find(a => a.id === s.assignmentId)?.title || "Unknown",
    studentEmail: users.find(u => u.id === s.studentId)?.email || "Unknown",
    content: s.content.substring(0, 100) + (s.content.length > 100 ? "..." : ""),
    grade: s.grade || "Not Graded",
    feedback: s.feedback || "",
    submittedAt: s.submittedAt
  }));
  res.json(grades);
});

app.patch("/api/grades/:id", (req, res) => {
  console.log("✏️ GRADE UPDATE:", req.params.id, req.body);
  const submissionId = parseInt(req.params.id);
  const { grade, feedback } = req.body;
  
  const submission = submissions.find(s => s.id === submissionId);
  if (!submission) {
    console.log("❌ Submission not found:", submissionId);
    return res.status(404).json({ message: "Submission not found" });
  }
  
  submission.grade = grade;
  submission.feedback = feedback;
  
  console.log("✅ Grade saved! Grade:", grade, "Feedback:", feedback);
  res.json({ message: "Grade updated", grade, feedback });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend: http://localhost:5173`);
});
