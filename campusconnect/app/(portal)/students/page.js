"use client";
import Link from "next/link";
import { useState } from "react";
import AttendanceBar from "@/components/AttendanceBar";
import { students, departments, initials } from "@/lib/data";

export default function Students() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [view, setView] = useState("list");

  const list = students.filter(
    (s) => s.name.toLowerCase().includes(q.toLowerCase()) && (dept === "All" || s.dept === dept)
  );

  const avg = Math.round(students.reduce((total, s) => total + s.attendance, 0) / students.length);
  const low = students.filter((s) => s.attendance < 80).length;

  const tiles = [
    [students.length, "Total students"],
    [`${avg}%`, "Average attendance"],
    [low, "Low attendance (below 80%)"],
    [departments.length, "Departments"],
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Students</h1>
          <p>View and manage student records</p>
        </div>
      </div>

      <section className="summary">
        {tiles.map(([value, label]) => (
          <div className="tile" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <div className="toolbar">
        <input
          placeholder="Search students by name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search students"
        />
        <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department">
          <option>All</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <div className="toggle" role="group" aria-label="Change view">
          <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>List</button>
          <button className={view === "cards" ? "on" : ""} onClick={() => setView("cards")}>Cards</button>
        </div>
      </div>

      {list.length === 0 && (
        <p className="muted">No students match. Try a different name or department.</p>
      )}

      {list.length > 0 && view === "list" && (
        <section className="card scroll">
          <table className="tbl">
            <thead>
              <tr>
                <th>Student</th>
                <th>Department</th>
                <th>Year</th>
                <th>Attendance</th>
                <th>Courses</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="person">
                      <span className="av">{initials(s.name)}</span>
                      <div>
                        <strong>{s.name}</strong>
                        <small>{s.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>{s.dept}</td>
                  <td>{s.year}</td>
                  <td><AttendanceBar value={s.attendance} /></td>
                  <td>{s.courseIds.length}</td>
                  <td><Link href={`/students/${s.id}`} className="btn small">View details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {list.length > 0 && view === "cards" && (
        <div className="grid3">
          {list.map((s) => (
            <div className="card center" key={s.id}>
              <span className="av big">{initials(s.name)}</span>
              <h3>{s.name}</h3>
              <p className="muted">{s.dept} · Year {s.year}</p>
              <AttendanceBar value={s.attendance} />
              <p style={{ marginTop: "1rem" }}>
                <Link href={`/students/${s.id}`} className="btn small">View details</Link>
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}