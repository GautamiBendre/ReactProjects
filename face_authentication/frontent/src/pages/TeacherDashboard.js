import React, { useState } from "react";
import "./TeacherDashboard.css";

export default function Teacher() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [attendanceStarted, setAttendanceStarted] = useState(false);

  // Example timetable data
  const timetable = [
    { day: "Monday", time: "9:00-10:00", subject: "Math", semester: "1" },
    { day: "Monday", time: "10:00-11:00", subject: "Science", semester: "2" },
    { day: "Tuesday", time: "9:00-10:00", subject: "English", semester: "1" },
  ];

  // Example student list per semester
  const students = {
    "1": [
      { id: 1, name: "Shruti", attendance: null },
      { id: 2, name: "Ravi", attendance: null },
    ],
    "2": [
      { id: 3, name: "Anand", attendance: null },
      { id: 4, name: "Pooja", attendance: null },
    ],
  };

  const [currentStudents, setCurrentStudents] = useState([]);

  const startAttendance = () => {
    if (!selectedSemester || !timeSlot) {
      alert("Please select semester and time slot");
      return;
    }
    setCurrentStudents(students[selectedSemester] || []);
    setAttendanceStarted(true);
  };

  const markAttendance = (id, status) => {
    const updatedStudents = currentStudents.map((s) =>
      s.id === id ? { ...s, attendance: status } : s
    );
    setCurrentStudents(updatedStudents);
  };

  return (
    <div className="teacher-container">
      <h1>Teacher Dashboard</h1>

      {/* Section to start attendance */}
      <div className="start-attendance">
        <h2>Start Attendance</h2>
        <label>
          Select Semester:
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>
        </label>
        <label>
          Select Time Slot:
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
            <option value="">--Select--</option>
            {timetable.map(
              (t, index) =>
                t.semester === selectedSemester && (
                  <option key={index} value={t.time}>
                    {t.day} {t.time} - {t.subject}
                  </option>
                )
            )}
          </select>
        </label>
        <button onClick={startAttendance}>Start Attendance</button>
      </div>

      {/* Attendance marking section */}
      {attendanceStarted && (
        <div className="attendance-section">
          <h2>Mark Attendance for Semester {selectedSemester}</h2>
          {currentStudents.length === 0 ? (
            <p>No students found for this semester.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <button
                        className="present-btn"
                        onClick={() => markAttendance(student.id, "Present")}
                      >
                        Present
                      </button>
                      <button
                        className="absent-btn"
                        onClick={() => markAttendance(student.id, "Absent")}
                      >
                        Absent
                      </button>
                      {student.attendance && <span>{student.attendance}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
