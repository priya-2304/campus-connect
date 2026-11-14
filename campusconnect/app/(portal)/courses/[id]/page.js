"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Badge from "@/components/Badge";
import AttendanceBar from "@/components/AttendanceBar";
import { courses, assignments, students, initials } from "@/lib/data";
import { useRole, teacher } from "@/lib/role";

export default function CourseDetails() {
  const { id } = useParams();
  const role = useRole();
  if (!role) return null;

  const isTeacher = role === "teacher";
  const c = courses.find((x) => x.id === Number(id));

  if (!c || (isTeacher && !teacher.courseIds.includes(c.id))) {
    return (
      <>
        <Link href="/courses" className="muted back">
          <FiArrowLeft /> Back to courses
        </Link>
        <section className="card center" style={{ marginTop: "0.8rem" }}>
          <h2>Course not found</h2>
          <p className="muted">This course is not available.</p>
          <Link href="/courses" className="btn small">Back to courses</Link>
        </section>
      </>
    );
  }

  const list = assignments.filter((a) => a.course === c.name);
  const enrolled = students.filter((s) => s.courseIds.includes(c.id));

  return (
    <>
      <Link href="/courses" className="muted back">
        <FiArrowLeft /> Back to courses
      </Link>

      <section className="card" style={{ marginTop: "0.8rem" }}>
        <h1>{c.name}</h1>
        <p className="muted">
          {c.code} · {isTeacher ? `${enrolled.length} students` : c.faculty} · {c.credits} credits
        </p>
        <p>{c.desc}</p>
        <div className="bar"><i style={{ width: `${c.progress}%` }} /></div>
        <p className="muted small-t">
          {c.progress}% {isTeacher ? "syllabus covered" : "complete"}
        </p>
      </section>

      {isTeacher && (
        <section className="card">
          <h2>Enrolled students</h2>
          <div className="scroll">
            <table className="tbl">
              <thead>
                <tr><th>Student</th><th>Department</th><th>Attendance</th><th>Action</th></tr>
              </thead>
              <tbody>
                {enrolled.map((s) => (
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
      )}

      <section className="card">
        <h2>Assignments</h2>
        {list.length === 0 ? (
          <p className="muted">No assignments for this course yet.</p>
        ) : (
          <div className="scroll">
            <table className="tbl">
              <thead>
                <tr><th>Title</th><th>Due date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.due}</td>
                    <td><Badge value={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}