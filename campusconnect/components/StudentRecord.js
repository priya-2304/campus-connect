import Link from "next/link";
import { FiBook, FiClock, FiCheckCircle, FiTrendingUp, FiEdit2, FiMail } from "react-icons/fi";
import Badge from "@/components/Badge";
import AttendanceBar from "@/components/AttendanceBar";
import { courses, assignments, initials } from "@/lib/data";

const skillLevel = (i) => [90, 82, 74, 66, 58][i] ?? 55;
const levelLabel = (v) => (v >= 85 ? "Advanced" : v >= 70 ? "Intermediate" : "Beginner");

export default function StudentRecord({ student, isSelf = false }) {
  const myCourses = courses.filter((c) => student.courseIds.includes(c.id));
  const myAssignments = assignments.filter((a) => myCourses.some((c) => c.name === a.course));
  const pendingList = myAssignments.filter((a) => a.status === "Pending");
  const pending = pendingList.length;
  const done = myAssignments.length - pending;
  const nextDue = pendingList[0];
  const avgProgress = myCourses.length
    ? Math.round(myCourses.reduce((total, c) => total + c.progress, 0) / myCourses.length)
    : 0;

  const stats = [
    [FiTrendingUp, `${student.attendance}%`, "Attendance", "green"],
    [FiBook, myCourses.length, "Courses", "blue"],
    [FiCheckCircle, done, "Submitted / done", "purple"],
    [FiClock, pending, "Pending", "orange"],
  ];

  return (
    <>
      <section className="card profile">
        <span className="av big">{initials(student.name)}</span>
        <div>
          <h2>{student.name}</h2>
          <p className="muted">{student.dept} · Year {student.year}</p>
          <div className="meta">
            {isSelf ? (
              <Link href="/settings" className="btn small">
                <FiEdit2 className="inline-ico" />Edit profile
              </Link>
            ) : (
              <a href={`mailto:${student.email}`} className="btn small">
                <FiMail className="inline-ico" />Email student
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="stats">
        {stats.map(([Icon, value, label, color]) => (
          <div key={label} className={`stat ${color}`}>
            <span className="ico"><Icon /></span>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <div className="info-grid">
        <section className="card">
          <h2>Personal info</h2>
          <div className="kv"><span>Department</span><strong>{student.dept}</strong></div>
          <div className="kv"><span>Year</span><strong>{student.year}</strong></div>
          <div className="kv"><span>Email</span><strong className="wrap-text">{student.email}</strong></div>
          <div className="kv"><span>Courses</span><strong>{myCourses.length} enrolled</strong></div>
        </section>

        <section className="card">
          <h2>Next deadline</h2>
          {nextDue ? (
            <>
              <p className="big-text">{nextDue.title}</p>
              <p className="muted">{nextDue.course}</p>
              <div className="kv"><span>Due date</span><strong>{nextDue.due}</strong></div>
              <div className="kv"><span>Priority</span><Badge value={nextDue.priority} /></div>
            </>
          ) : (
            <p className="muted">
              <FiCheckCircle className="inline-ico" />No pending work. All caught up!
            </p>
          )}
        </section>

        <section className="card">
          <h2>Overall progress</h2>
          <p className="huge">{avgProgress}%</p>
          <div className="bar"><i style={{ width: `${avgProgress}%` }} /></div>
          <p className="muted small-t">Average across {myCourses.length} courses</p>
        </section>
      </div>
    
     <div className="two">
        <section className="card">
          <div className="row">
            <h2>Skills</h2>
            <span className="chip">{student.skills.length} skills</span>
          </div>
          <div className="skill-grid">
            {student.skills.map((k, i) => {
              const level = skillLevel(i);
              return (
                <div className="skill" key={k}>
                  <span className="skill-icon">{k[0]}</span>
                  <div className="skill-body">
                    <div className="skill-top">
                      <strong>{k}</strong>
                      <span className="level">{levelLabel(level)}</span>
                    </div>
                    <div className="bar"><i style={{ width: `${level}%` }} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card">
          <h2>Attendance by course</h2>
          {myCourses.map((c) => {
            const value = Math.max(50, Math.min(100, student.attendance + ((c.id * 7) % 11) - 5));
            return (
              <div className="att-row" key={c.id}>
                <span>{c.name}</span>
                <AttendanceBar value={value} />
              </div>
            );
          })}
        </section>
      </div>
  
    <section className="card">
        <h2>Enrolled courses</h2>
        <div className="mini-grid">
          {myCourses.map((c) => (
            <div className="mini-course" key={c.id}>
              <Link href={`/courses/${c.id}`}><strong>{c.name}</strong></Link>
              {isSelf && <small>{c.faculty}</small>}
              <div className="bar"><i style={{ width: `${c.progress}%` }} /></div>
              <small>{c.credits} credits · {c.progress}% complete</small>
            </div>
          ))}
        </div>
      </section>

     <section className="card">
        <h2>Assignments and marks</h2>
        {myAssignments.length === 0 ? (
          <p className="muted">No assignments yet.</p>
        ) : (
          <div className="scroll">
            <table className="tbl">
              <thead>
                <tr><th>Assignment</th><th>Course</th><th>Due date</th><th>Status</th><th>Marks</th></tr>
              </thead>
              <tbody>
                {myAssignments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.course}</td>
                    <td>{a.due}</td>
                    <td><Badge value={a.status} /></td>
                    <td>{a.marks || "—"}</td>
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