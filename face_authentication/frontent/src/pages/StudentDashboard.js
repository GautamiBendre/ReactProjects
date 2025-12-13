import React, { useState } from "react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const student = {
    name: "Student Name",
    roll: "CS101",
    semester: "5",
    email: "student@mail.com",
    image: "/profile.jpg"
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-section">
          <img src={student.image} alt="Profile" className="profile-img" />
          <h3>{student.name}</h3>
          <p>{student.roll}</p>
        </div>

        <nav className="menu">
          <button className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}>Dashboard</button>
          <button className={activeMenu === "profile" ? "active" : ""}
            onClick={() => setActiveMenu("profile")}>Profile</button>
          <button className={activeMenu === "attendance" ? "active" : ""}
            onClick={() => setActiveMenu("attendance")}>Mark Attendance</button>
          <button onClick={logout}>Logout</button>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="content">
        {activeMenu === "dashboard" && (
          <div className="dashboard-view">
            <div className="notice-board">
              <h2>Notice Board</h2>
              <div className="card">Exam on Friday</div>
              <div className="card">Project submission next week</div>
            </div>

            <div className="timetable">
              <h2>Timetable</h2>
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Monday</td><td>DBMS</td></tr>
                  <tr><td>Tuesday</td><td>AI</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeMenu === "profile" && (
          <div className="profile-card">
            <h2>Student Profile</h2>
            <p><b>Name:</b> {student.name}</p>
            <p><b>Roll No:</b> {student.roll}</p>
            <p><b>Semester:</b> {student.semester}</p>
            <p><b>Email:</b> {student.email}</p>
          </div>
        )}

        {activeMenu === "attendance" && (
          <div className="attendance-card">
            <h2>Mark Attendance</h2>
            <video autoPlay className="camera" />
            <button className="capture-btn">Capture & Mark Attendance</button>
          </div>
        )}
      </main>
    </div>
  );
}
