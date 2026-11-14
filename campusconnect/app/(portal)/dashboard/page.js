"use client";
import Link from "next/link";
import { FiUsers, FiBook, FiClipboard, FiClock, FiCheckCircle, FiTrendingUp } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import Badge from "@/components/Badge";
import AttendanceBar from "@/components/AttendanceBar";
import { assignments, courses, activities, students, initials } from "@/lib/data";
import { useRole, teacher } from "@/lib/role";

export default function Dashboard() {
  const role = useRole();
  if (!role) return null;
  return role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
}

function TeacherDashboard() {
  const toReview = assignments.filter((a) => a.status === "Submitted");
  const lowStudents = students.filter((s) => s.attendance < 80);
  const avg = Math.round(students.reduce((total, s) => total + s.attendance, 0) / students.length);
  const myCourses = courses.filter((c) => teacher.courseIds.includes(c.id));

  const stats = [
    [FiUsers, students.length, "Students", "/students", "blue"],
    [FiBook, myCourses.length, "My courses", "/courses", "orange"],
    [FiClipboard, toReview.length, "To review", "/assignments", "green"],
    [FiTrendingUp, `${avg}%`, "Avg. attendance", "/students", "purple"],
  ];

  return (
    <>
      <section className="hero">
        <div>
          <h1>Welcome, {teacher.name}</h1>
          <p>Here's how your classes are doing today.</p>
        </div>
        <div className="art" aria-hidden><FaGraduationCap /></div>
      </section>

      <section className="stats">
        {stats.map(([Icon, n, label, href, color]) => (
          <Link href={href} key={label} className={`stat ${color}`}>
            <span className="ico"><Icon /></span>
            <strong>{n}</strong>
            <span>{label}</span>
          </Link>
        ))}
      </section>

      <div className="two">
        <section className="card">
          <h2>Needs attention</h2>

          {lowStudents.map((s) => (
            <div className="alert-row" key={`low-${s.id}`}>
              <div>
                <strong>{s.name}</strong>
                <small>Attendance is {s.attendance}%</small>
              </div>
              <Link href={`/students/${s.id}`} className="btn small">View</Link>
            </div>
          ))}

          {toReview.map((a) => (
            <div className="alert-row" key={`rev-${a.id}`}>
              <div>
                <strong>{a.title}</strong>
                <small>{a.course} · waiting for review</small>
              </div>
              <Link href="/assignments" className="btn small">Review</Link>
            </div>
          ))}

          {lowStudents.length === 0 && toReview.length === 0 && (
            <p className="muted">Everything looks good. Nothing needs attention.</p>
          )}
        </section>

        <section className="card">
          <h2>Courses I teach</h2>
          {myCourses.map((c) => {
            const enrolled = students.filter((s) => s.courseIds.includes(c.id)).length;
            return (
              <div className="course-row" key={c.id}>
                <div className="course-top">
                  <Link href={`/courses/${c.id}`}><strong>{c.name}</strong></Link>
                  <span className="muted">{enrolled} students</span>
                </div>
                <div className="bar"><i style={{ width: `${c.progress}%` }} /></div>
                <small>{c.progress}% syllabus covered</small>
              </div>
            );
          })}
        </section>
      </div>

      <section className="card">
        <div className="row">
          <h2>Class overview</h2>
          <Link href="/students" className="btn small">View all</Link>
        </div>
        <div className="scroll">
          <table className="tbl">
            <thead>
              <tr><th>Student</th><th>Department</th><th>Attendance</th><th>Action</th></tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="person">
                      <span className="av">{initials(s.name)}</span>
                      <strong>{s.name}</strong>
                    </div>
                  </td>
                  <td>{s.dept}</td>
                  <td><AttendanceBar value={s.attendance} /></td>
                  <td><Link href={`/students/${s.id}`} className="btn small">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function StudentDashboard() {
  const pending = assignments.filter((a) => a.status === "Pending").length;
  const done = assignments.filter((a) => a.status !== "Pending").length;

  const stats = [
    [FiBook, courses.length, "Courses", "/courses", "blue"],
    [FiClock, pending, "Pending", "/assignments", "orange"],
    [FiCheckCircle, done, "Completed", "/assignments", "green"],
    [FiTrendingUp, "87%", "Attendance", "/profile", "purple"],
  ];

  return (
    <>
      <section className="hero">
        <div>
          <h1>Welcome, Aarav</h1>
          <p>Let's keep learning and achieve more together!</p>
        </div>
        <div className="art" aria-hidden><FaGraduationCap /></div>
      </section>

      <section className="stats">
        {stats.map(([Icon, n, label, href, color]) => (
          <Link href={href} key={label} className={`stat ${color}`}>
            <span className="ico"><Icon /></span>
            <strong>{n}</strong>
            <span>{label}</span>
          </Link>
        ))}
      </section>

      <section className="card">
        <div className="row">
          <h2>Recent assignments</h2>
          <Link href="/assignments" className="btn small">View all</Link>
        </div>
        <div className="scroll">
          <table className="tbl">
            <thead>
              <tr><th>Assignment</th><th>Course</th><th>Due date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {assignments.slice(0, 4).map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.course}</td>
                  <td>{a.due}</td>
                  <td><Badge value={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="two">
        <section className="card">
          <div className="row">
            <h2>Upcoming deadlines</h2>
            <Link href="/assignments" className="btn small">View all</Link>
          </div>
          <div className="scroll">
            <table className="tbl">
              <thead>
                <tr><th>Assignment</th><th>Date</th><th>Priority</th></tr>
              </thead>
              <tbody>
                {assignments.filter((a) => a.status === "Pending").map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.due}</td>
                    <td><Badge value={a.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card">
          <h2>Recent activities</h2>
          <ul className="acts">
            {activities.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </section>
      </div>
    </>
  );
}