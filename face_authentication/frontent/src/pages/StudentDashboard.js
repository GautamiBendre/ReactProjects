import React from "react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  // Dummy student data
  const student = {
    name: "Gautami Bendre",
    rollNo: "15",
    semester: "1",
    email: "gautamibendre23@gmail.com",
    photo: "C:\Users\AI\Desktop\ReactProjects\face_authentication\frontent\src\assets\images\homepage2.jpeg" // Add any image in public folder
  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2>Student</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Profile</li>
          <li>Attendance</li>
          <li>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Welcome, {student.name} 👋</h1>

        <div className="profile-card">
          <img src={student.photo} alt="student" />
          <div>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
            <p><strong>Email:</strong> {student.email}</p>
          </div>
        </div>

        <div className="notice-board">
          <h2>📢 Latest Notices</h2>
          <ul>
            <li>College will remain closed on Friday.</li>
            <li>Internal exams start next week.</li>
            <li>Submit assignments by Monday.</li>
          </ul>
        </div>
        </div>

        <div className="right-buttons">
           <button className="right-btn">Attendance</button>
           <button className="right-btn">Timetable</button>
           <button className="right-btn">Subjects</button>
        </div>
      </div>

    
  );
}
