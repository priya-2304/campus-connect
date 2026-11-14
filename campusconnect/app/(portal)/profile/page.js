"use client";
import StudentRecord from "@/components/StudentRecord";
import { students, courses } from "@/lib/data";
import { useRole, teacher } from "@/lib/role";

export default function Profile() {
  const role = useRole();
  if (!role) return null;

  if (role === "teacher") {
    const taught = courses.filter((c) => teacher.courseIds.includes(c.id));
    return (
      <>
        <h1>My profile</h1>
        <section className="card profile">
          <span className="av big">{teacher.initials}</span>
          <div>
            <h2>{teacher.name}</h2>
            <p className="muted">Faculty · {teacher.dept}</p>
            <p>{teacher.email}</p>
          </div>
        </section>
        <div className="two">
          <section className="card">
            <h2>Subjects</h2>
            <div className="chips">
              {teacher.subjects.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </section>
          <section className="card">
            <h2>Students</h2>
            <p><strong>{students.length}</strong> students enrolled in my classes</p>
          </section>
        </div>
        <section className="card">
          <h2>Courses I teach</h2>
          <ul className="acts">
            {taught.map((c) => <li key={c.id}>{c.name} · {c.credits} credits</li>)}
          </ul>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>My record</h1>
          <p>Your attendance, courses and assignments in one place</p>
        </div>
      </div>
      <StudentRecord student={students[0]} isSelf />
    </>
  );
}