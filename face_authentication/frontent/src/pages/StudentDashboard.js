import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";


export default function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Get student ID stored in localStorage after login
    const studentId = localStorage.getItem("student_id");
    if (!studentId) return;

    fetch(`http://localhost:5000/api/auth/student/${studentId}`)

      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.log("Error fetching student:", err));
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2>Student</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Profile</li>
          <li>Mark Attendance</li>
          <li>Logout</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Welcome {student.fullName} 👋</h1>

        <div className="dashboard-main-wrapper"> {/* <-- WRAPPER START */}
          <div className="left-content">   {/* <-- LEFT START */}

           <div className="profile-card">
              <img 
                src={`http://localhost:5000/uploads/${student.photo}`} 
                alt="student" 
              />
              <div>
                <p><strong>Name:</strong> {student.fullName}</p>
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
          </div>   {/* <-- LEFT END */}
          <div className="right-content">   {/* <-- RIGHT START */}
          {/* Timetable Container */}
            <div className="timetable-container">
                <h2>📅 Timetable</h2>
                <img 
                src="face_authentication\frontent\src\assets\images\Timetable.jpeg"
                alt="timetable" 
                className="timetable-image"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
